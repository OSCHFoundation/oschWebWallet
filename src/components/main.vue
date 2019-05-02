<template>
  <div class="inner">
    <VHeader class="header"></VHeader>
    <main class="main">
      <div class="main-left">
        <div class="img">
          <img src="../../static/img/index_tx@2x.png" width="48" height="48" alt="头像">
        </div>
        <div class="coinName">
          <span>钱包</span>
          <p class="cash">≈ ￥ {{balances['OSCH'].sumprice | numFilter}}</p>
        </div>
        <div class="operationList">
          <ul class="opList">
            <li
              v-bind:class="{back:page == item.page}"
              @click="goPage(item.page)"
              v-for="item in sonRouter"
            >
              <div class="li1">
                <img :src="page ==item.page ? item.icon : item.iconActive" alt>
                <span
                  v-bind:class="{spanColor:page != item.page,span1Color:page ==item.page}"
                >{{item.mess}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-right" v-if="initState">
        <VWallet
          v-if="page==1"
          :account="account"
          :walletBaseMsg="walletBaseMsg"
          :balances="balances"
          :operations="operations"
        ></VWallet>
        <VAsset
          v-if="page==2"
          :account="account"
          :balances="balances"
          :walletBaseMsg="walletBaseMsg"
          :operations="operations"
          :transaction="transaction"
        ></VAsset>
        <VPayments
          v-if="page==3"
          :walletBaseMsg="walletBaseMsg"
          :balances="balances"
          :account="account"
          @goPage="goPage"
        ></VPayments>
        <VReceivables v-if="page==4"></VReceivables>
      </div>
    </main>
    <VFooter></VFooter>
  </div>
</template>
<script>
import OschSdk from "osch-sdk";
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import VWallet from "./Wallet";
import VAsset from "./Assets";
import VPayments from "./Payments";
import VReceivables from "./Receivables";
import { merge } from "lodash";
import config from "../config";
export default {
  components: {
    VHeader,
    VFooter,
    VWallet,
    VAsset,
    VPayments,
    VReceivables
  },
  data() {
    return {
      operations: [],
      balances: {},
      walletBaseMsg: {
        oschServer: "",
        keypair: "",
        secret: "",
        publicKey: ""
      },
      initState: false,
      account: {
        isActive: false
      },
      sonRouter: [
        {
          page: 1,
          mess: "钱包信息",
          icon: require("@/assets/img/index_message@2x.png"),
          iconActive: require("@/assets/img/index_message_default@2x.png")
        },
        {
          page: 2,
          mess: "资产",
          icon: require("@/assets/img/index_pressed@2x.png"),
          iconActive: require("@/assets/img/index_zc_default@2x.png")
        },
        {
          page: 3,
          mess: "转账",
          icon: require("@/assets/img/money.png"),
          iconActive: require("@/assets/img/money1.png")
        },
        {
          page: 4,
          mess: "收款",
          icon: require("@/assets/img/index_code_pressed@2x.png"),
          iconActive: require("@/assets/img/index_code_default@2x.png")
        }
      ],
      page: 1,
      limit: 200,
      transaction: {}
    };
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(3);
      //let realVal = transformVal.substring(0, transformVal.length - 1);
      return Number(transformVal);
    }
  },
  created: function() {
    const _this = this;
    this.balances = merge(this.balances, config.assetList);
    /**
     * 存储基本信息
     */
    let userPr = JSON.parse(sessionStorage.userPr);
    this.walletBaseMsg.secret = userPr.priv;
    const { Config, Network, Server, StrKey, Keypair } = OschSdk;
    Config.setAllowHttp(true);
    Network.use(new Network(_this.horizonSecret));
    this.walletBaseMsg.oschServer = new Server(_this.horizonUrl);
    this.walletBaseMsg.keypair = Keypair.fromSecret(_this.walletBaseMsg.secret);
    this.walletBaseMsg.publicKey = StrKey.encodeEd25519PublicKey(
      this.walletBaseMsg.keypair.rawPublicKey()
    );
    this.loadData();
    this.transactionMetBuild();
  },
  methods: {
    transactionMetBuild: function() {
      //对transaction的交易封装
      this.transaction = operation => {
        const _this = this;
        const { TransactionBuilder, Operation, Keypair, Asset } = OschSdk;
        const { secret, oschServer } = this.walletBaseMsg;
        return new Promise(function(resolve, reject) {
          var transaction = new TransactionBuilder(_this.account, {
            fee: "100000000"
          })
            .addOperation(operation)
            .setTimeout(30)
            .build();
          transaction.sign(Keypair.fromSecret(secret));
          oschServer
            .submitTransaction(transaction)
            .then(function(res) {
              resolve(res);
            })
            .catch(function(err) {
              reject(err);
            });
        });
      };
    },
    loadData: async function() {
      const _this = this;
      const { oschServer, keypair, publicKey } = this.walletBaseMsg;
      await oschServer
        .loadAccount(publicKey)
        .then(function(account) {
          _this.account = account;
          _this.account.isActive = true;
          //找到账户信息
          for (var item of account.balances) {
            item.balance = parseInt(item.balance);
            if (item.asset_type == "native") {
              _this.balances["OSCH"] = Object.assign(
                _this.balances["OSCH"],
                item
              );
            } else {
              const type = item.asset_code.toUpperCase();
              if (_this.balances[type]) {
                _this.balances[type] = Object.assign(
                  _this.balances[type],
                  item
                );
                _this.balances[type].isActive = true;
                _this.balances.activeArr.push(type);
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          _this.account.isActive = false;
        });
      // 获取历史交易
      if (_this.account.isActive) {
        const listOpeartionData = oschServer
          .operations()
          .forAccount(publicKey)
          .order("desc")
          .limit(this.limit)
          .call()
          .then(function(page) {
            _this.dealData(page.records);
            _this.initState = true;
          });
        this.$axios
          .get("http://wallet.myoschain.com/oschPrice/v1/listOschPrice")
          .then(res => {
            _this.balances["OSCH"].price = res.data.result.price;
            _this.balances["OSCH"].sumprice =
              res.data.result.price * this.balances["OSCH"].balance;
          });
      } else {
        _this.sonRouter.splice(2, 1);
        _this.initState = true;
      }
    },
    dealData(page) {
      const { publicKey } = this.walletBaseMsg;
      const nPage = page.map(item => {
        item.num = parseFloat(item.num).toFixed(3);
        if (item.type == "payment") {
          if (item.asset_type == "native") {
            item.asset = "OSCH";
          } else {
            item.asset = item.asset_code.toUpperCase();
          }
          if (item.from == publicKey) {
            item.num = "-" + parseFloat(item.amount).toFixed(2);
          } else {
            item.num = "+" + parseFloat(item.amount).toFixed(2);
          }
        } else if (item.type == "create_account") {
          item.num = parseFloat(item.starting_balance).toFixed(2); //交易数量
          item.to = item.funder; //目标地址
          item.asset = "OSCH"; //交易币种
          item.from = item.account;
          if (item.funder == publicKey) {
            item.num = "-" + parseFloat(item.starting_balance).toFixed(2);
          } else {
            item.num = "+" + parseFloat(item.starting_balance).toFixed(2);
          }
        } else if (item.type == "change_trust") {
          (item.num = "-" + "10.00"), //交易数量
            (item.to = item.asset_issuer), //目标地址
            (item.asset = item.asset_code), //交易币种
            (item.activeType = item.type), //交易类型 （交易、创建账户等）
            (item.from = item.asset_issuer);
        }
        return item;
      });
      this.operations = nPage;
    },
    goPage(val) {
      this.page = val;
    }
  }
};
</script>
<style scoped>
.inner {
  margin: 0 auto;
}
.main {
  padding-bottom: 4px;
  min-height: 880px;
  padding-top: 72px;
  width: 100%;
  /* background: linear-gradient(#11151c, #222a38); */
  background: #1e2430;
}
.main-left {
  float: left;
  padding-top: 25px;
  width: 160px;
  height: 870px;
  background-color: #171d26;
  overflow: hidden;
}
.main-right {
  margin-left: 176px;
  margin-bottom: 10px;
}
.img {
  padding-left: 60px;
}
.coinName {
  margin-top: 19px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: center;

  color: rgba(179, 179, 179, 1);
}
.coinImg {
  margin-left: 30px;
  width: 23px;
  height: 23px;
  vertical-align: middle;
}
.cash {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.operationList {
  margin-top: 30px;
  padding-top: 10px;
  width: 100%;
  height: 70%;
  font-size: 30px;
}
.opList li {
  /* margin: 10px auto 20px; */
  height: 50px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.opList li:hover {
  background-color: #283242;
  cursor: pointer;
}
.li1 {
  padding-top: 15px;
  margin-left: 16px;
}
.li1 img {
  float: left;
  width: 22px;
  height: 22px;
  overflow: hidden;
  margin-top: -1px;
}
.li1 span {
  margin-left: 20px;
  /* color: #999999 */
}

.spanColor {
  margin-left: 20px;
  color: #999999;
}
.span1Color {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.back {
  background: rgba(28, 35, 46, 1);
  color: rgba(229, 229, 229, 1);
}
</style>