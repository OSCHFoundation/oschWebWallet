<template>
  <div class="asset">
    <div class="mask1" v-if="actionShow">
      <div class="mask1Box">
        <div class="mask1Title">
          <img src="../../../static/img/true.png" width="28px" height="28px">
        </div>
        <div class="mask1Inner">{{actionState}}</div>
      </div>
    </div>
    <div class="mask1" v-if="actionShow1">
      <div class="mask1Box1">
        <div class="mask1Title">
          <!-- <img src="../../../static/img/true.png" width="28px" height="28px"> -->
        </div>
        <div class="mask1Inner">操作失败，当前代币尚有余额，请稍后重试</div>
      </div>
    </div>
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
        <!-- <hr> -->
        <!-- <button class="maskBtn send" @click="closeClick">确认无误(关闭遮罩层)</button> -->
      </div>
    </div>
    <div class="coinList">
      <div v-bind:class="{coin:true,back: isActiveAsset == item}" v-for="item in balances.arr" @click="switchAsset(item)"> 
        <div class="coinImg">
          <img :src="balances[item].ico" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="addCoin" @click="openMask" v-show="allCoin">
        <!-- <div class="add">+</div> -->
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
        <TransTable :wArrPage="operations"/>
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
  props: ["coinPrice", "walletBaseMsg", "balances", "operations"],
  components: {
    TransTable
  },
  data() {
    return {
      actionState: "操作成功",
      actionShow: false,
      actionShow1: false,
      allCoin: true,
      coin: [],
      oschNum: "",
      timeNum: "",
      hourNum: "",
      open: false,
      isTime: {},
      isActiveAsset: "OSCH",
      activeAssetsArr: [],

      activeName: "second",
      isHour: {},
      sercet: "",
      publick: "",
      account: "",
      server: "",
      tab: 10,
      osch: [], //osch代币
      time: [], //time代币
      hour: [], // hour 代币
      currpage: 1,
      pagesize: 10,
      input: [],
      output: [],
      number: 0,
      unit: "",
      showBtn: false, //取消信任按钮
      loading: true,
      moneyColor: 1
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
    //loading 插件
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    switchAsset(type){
      this.isActiveAsset = type;
      this.activeAssetsArr = this[type];
    },
    getOsch(event) {
      this.coin = this.osch;
      this.getPage(this.osch);
      this.number = this.oschNum;
      this.unit = "OSCH";
      this.showBtn = false;
    },
    getTime(event) {
      this.coin = this.time;
      this.getPage(this.time);
      this.number = this.timeNum;
      this.unit = "TIME";
      this.showBtn = true;
    },
    getHour(event) {
      this.coin = this.hour;
      this.getPage(this.hour);
      this.number = this.hourNum;
      this.unit = "HOUR";
      this.showBtn = true;
    },
    //分页
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleClick(res, event) {
      if (event.target.innerHTML == "全部交易记录") {
        this.currpage = 1;
        this.tab = this.osch.length;
      } else if (event.target.innerHTML == "收入交易") {
        this.currpage = 1;
        this.tab = this.input.length;
      } else if (event.target.innerHTML == "支出交易") {
        this.currpage = 1;
        this.tab = this.output.length;
      }
    },
    getPage(osch) {
      this.input = [];
      this.output = [];
      for (var i = 0; i < osch.length; i++) {
        var num = osch[i].num;
        if (num.substr(0, 1) == "+") {
          this.input.push(osch[i]);
        }
        if (num.substr(0, 1) == "-") {
          this.output.push(osch[i]);
        }
      }
    },
    transactionInfo() {
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
    },
    init() {
    },
    //点击信任
    changeTrust(coin) {
      const { TransactionBuilder, Operation, Keypair } = OschSdk;
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
      transaction.sign(Keypair.fromSecret(_this.sercet));
      _this.server
        .submitTransaction(transaction)
        .then(function(res) {
          // _this.fullscreenLoading = false;
          loading.close();
          _this.actionShow = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(function(err) {
          loading.close();
          _this.actionShow1 = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
        });
    },
    cancelTrust() {
      if (this.unit == "Time") {
        if (this.timeNum > 0) {
          this.actionShow1 = true;
          setTimeout(() => {
            this.actionShow1 = false;
          }, 3000);
        } else {
          this.closeTrust(this.isTime);
        }
      }
      if (this.unit == "Hour") {
        if (this.hourNum > 0) {
          this.actionShow1 = true;
          setTimeout(() => {
            this.actionShow1 = false;
          }, 3000);
        } else {
          this.closeTrust(this.isHour);
        }
      }
    },
    closeTrust(asCoin) {
      const { TransactionBuilder, Operation, Keypair } = OschSdk;
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let _this = this;
      var transaction = new TransactionBuilder(this.account, {
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
      transaction.sign(Keypair.fromSecret(this.sercet));
      this.server
        .submitTransaction(transaction)
        .then(function(res) {
          loading.close();
          _this.actionShow = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(function(err) {
          loading.close();
          _this.actionShow1 = true;
          setTimeout(() => {
            location.reload();
          }, 2000);
          // alert("授权失败");
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
     this.init();
  },
  mounted() {
    const { Asset } = OschSdk;
    
    this.isTime = new Asset(
      "time",
      "GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW"
    );
    this.isHour = new Asset(
      "hour",
      "GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74"
    );
    for (var i of this.coin) {
      let semb = i.num.slice(0, 1);
      if (semb == "+") {
        this.moneyColor = 2;
      } else {
        this.moneyColor = 3;
      }
    }
  }
};
</script>
<style  lang="scss" scoped>
     @import "./style.scss";
</style>  