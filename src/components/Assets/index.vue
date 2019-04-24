<template>
  <div class="asset">
    <div class="mask" v-show="open">
      <div class="transactionMask">
        <div class="closeMask" @click="closeClick">X</div>
        <p class="addCoinTitle">添加资产</p>
        <div class="addTime" v-show="!hourNum">
          <div class="coinImg">
            <img src="../../../static/img/u259.png" width="44" height="44">
          </div>
          <div class="coinInner">
            <h2 class="title">Hour</h2>
          </div>
          <button class="btn" type="primary" @click="changeTrust(isHour)">信任HOUR</button>
        </div>
        <div class="addTime" v-show="!timeNum">
          <div class="coinImg">
            <img src="../../../static/img/u269.png" width="44" height="44">
          </div>
          <div class="coinInner">
            <h2 class="title">TIME</h2>
          </div>
          <button class="btn" type="primary" @click="changeTrust(isTime)">信任TIME</button>
        </div>
      </div>
    </div>
    <div class="coinList">
      <div
        v-bind:class="{coin:true,back: isActiveAsset == item}"
        v-for="item in balances.arr"
        @click="switchAsset(item)"
      >
        <div class="coinImg">
          <img :src="balances[item].ico" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="addCoin" @click="openMask" v-show="allCoin">
        <img src="../../../static/img/asd.png" width="18" height="18" class="add">
        <span>添加资产</span>
      </div>
    </div>
    <div class="main-right">
      <div class="mainHeader">
        <div class="headerImg">
          <span class="info">账户信息</span>
          <span class="balance">余额:</span>
        </div>
        <p class="mainFont">{{number | numFilter}}</p>
        <span class="word">{{unit}}</span>
        <div class="exchange">
          <span class="rmb">CNY</span>
          <span class="cash">≈ ￥ 0.01</span>
          <button v-show="showBtn" @click="cancelTrust" class="close">取消信任</button>
        </div>
        <span class="transaction1">交易记录</span>
      </div>
      <div class="history">
        <TransTable :wArrPage="filterOperation"/>
      </div>
    </div>
  </div>
</template>

<script>
import timeCoin from "../../../static/img/u269.png";
import hourCoin from "../../../static/img/u259.png";
import TransTable from "../TransTable";
import OschSdk from "osch-sdk";

export default {
  props: ["coinPrice", "walletBaseMsg", "balances", "operations", "account"],
  components: {
    TransTable
  },
  data() {
    return {
      isActiveAsset: "OSCH", //当前选中的资产
      activeAssetsArr: [], //选中资产列表
      filterOperation: [], //分为osch，time，hour等操作
      number: 0,            //当前选中token数量       
      allCoin: true,
      timeNum: "",
      hourNum: "",
      open: false,
      isTime: {},
      isHour: {},
      unit: "OSCH",
      showBtn: false, //取消信任按钮
      loading: true
    };
  },
  filters: {
    numFilter(value) {
      let transformVal = Number(value).toFixed(3);
      let realVal = transformVal.substring(0, transformVal.length - 1);
      return Number(realVal);
    }
  },
  methods: {
    switchAsset(type) {
      this.isActiveAsset = type;
      this.activeAssetsArr = this[type];
      this.number = this.balances[type].balance;
      this.filterOperation = this.operations.filter(item => {
        return type == item.asset;
      });
      this.showBtn = this.isActiveAsset != "OSCH";
    },
    transactionInfo() {
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
    },
    //点击信任
    changeTrust(coin) {
      const { TransactionBuilder, Operation, Keypair } = OschSdk;
      const { publicKey, secret, oschServer } = this.walletBaseMsg;
      this.open = false;
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let _this = this;
      var transaction = new TransactionBuilder(_this.account, {
        fee: "100000000"
      })
        .addOperation(
          Operation.changeTrust({
            asset: coin
          })
        )
        .build();
      transaction.sign(Keypair.fromSecret(secret));
      oschServer
        .submitTransaction(transaction)
        .then(function(res) {
          // _this.fullscreenLoading = false;
          loading.close();
          this.$message.success("添加成功");
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(function(err) {
          loading.close();
          this.$message.success("添加失败");
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
    },
    cancelTrust() {
      if (this.unit == "Time") {
        if (this.timeNum > 0) {
          this.$message.error("操作失败，当前代币尚有余额，请稍后重试");
        } else {
          this.closeTrust(this.isTime);
        }
      }
      if (this.unit == "Hour") {
        if (this.hourNum > 0) {
          this.$message.error("操作失败，当前代币尚有余额，请稍后重试");
        } else {
          this.closeTrust(this.isHour);
        }
      }
    },
    closeTrust(asCoin) {
      const _this = this;
      const { TransactionBuilder, Operation, Keypair } = OschSdk;
      const { oschServer, sercet } = this.walletBaseMsg;
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var transaction = new TransactionBuilder(_this.account, {
        fee: "100000000"
      })
        .addOperation(
          Operation.changeTrust({
            // asset: this.isHour,
            asset: asCoin,
            source: this.publicKey,
            limit: "0"
          })
        )
        .build();
      transaction.sign(Keypair.fromSecret(sercet));
      oschServer
        .submitTransaction(transaction)
        .then(function(res) {
          loading.close();
          _this.$message.success("新人成功");
        })
        .catch(function(err) {
          loading.close();
          this.$message.error("操作失败，当前代币尚有余额，请稍后重试");
        });
    },
    //打开遮罩层
    openMask() {
      if (this.timeNum != "" && this.hourNum != "") {
        alert("暂无可添加的代币");
      } else {
        this.open = true;
      }
    },
    closeClick() {
      this.open = false;
    }
  },
  created() {
    const { oschServer } = this.walletBaseMsg;
  },
  mounted() {
    const { Asset } = OschSdk;
    this.filterOperation = this.operations.filter(item => {
      return "OSCH" == item.asset;
    });
    this.number = this.balances["OSCH"].balance;
    this.isTime = new Asset(
      "time",
      "GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW"
    );
    this.isHour = new Asset(
      "hour",
      "GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74"
    );
  }
};
</script>
<style  lang="scss" scoped>
@import "./style.scss";
</style>  