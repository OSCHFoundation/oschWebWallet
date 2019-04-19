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
          <p class="cash">≈ ￥ {{price | numFilter}}</p>
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
      <div class="main-right">
        <VWallet v-if="page==1" v-on:listenPrice="showPrice"></VWallet>
        <VAsset v-if="page==2" :coinPrice="price"></VAsset>
        <VPayments v-if="page==3" :walletBaseMsg="walletBaseMsg" :account="account" @goPage="goPage"></VPayments>
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
import VWallet from "./innerList/wallet";
import VAsset from "./innerList/asset";
import VPayments from "./Payments";
import VReceivables from "./innerList/receivables";

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
      walletBaseMsg: {
        oschServer: "",
        keypair: "",
        secret: "",
        publicKey: ""
      },
      account: "",
      sonRouter: [
        {
          page: 1,
          mess: "钱包信息",
          icon: "../../static/img/index_message@2x.png",
          iconActive: "../../static/img/index_message_default@2x.png"
        },
        {
          page: 2,
          mess: "资产",
          icon: "../../static/img/index_pressed@2x.png",
          iconActive: "../../static/img/index_zc_default@2x.png"
        },
        {
          page: 3,
          mess: "转账",
          icon: "../../static/img/money.png",
          iconActive: "../../static/img/money1.png"
        },
        {
          page: 4,
          mess: "收款",
          icon: "../../static/img/index_code_pressed@2x.png",
          iconActive: "../../static/img/index_code_default@2x.png"
        }
      ],
      price: 0,
      page: 1
    };
  },
  
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(3);
      let realVal = transformVal.substring(0, transformVal.length - 1);
      return Number(realVal);
    }
  },
  created() {
    const _this = this;
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
    this.walletBaseMsg.publicKey = StrKey.encodeEd25519PublicKey(this.walletBaseMsg.keypair.rawPublicKey());
    const { oschServer, keypair, publicKey } = this.walletBaseMsg;
    oschServer
      .loadAccount(publicKey)
      .then(function(account){
        _this.account = account;
      }).catch(err => {
        this.$Message.error('请求失败');
        this.$router.push("/created/");
      })
  },
  mounted() {

  },
  methods: {
    goPage(val) {
      this.page = val;
    },
    showPrice(data) {
      this.price = data;
      this.price.toFixed(2);
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
  height: 26px;
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