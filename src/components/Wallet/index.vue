<template>
  <div class="walletInfo">
    <div class="mask" v-show="maskCode">
      <div class="maskBackground">
        <div class="close0" @click="hideCode">X</div>
        <p class="code-title">公钥地址</p>
        <div class="code1" id="qrcode6"></div>
      </div>
    </div>
    <h2 class="title">账户信息</h2>
    <div class="address">
      <div class="my">
        <span class="small">我的地址：</span>
        <span class="big" id="big">{{walletBaseMsg.publicKey}}</span>
        <img
          class="copy"
          src="../../../static/img/biger.png"
          width="20"
          height="20"
          title="查看二维码"
          @click="showCode"
        >
      </div>
      <div class="state">
        <span class="small">当前状态：</span>
        <span class="big bigColor">{{account.isActive? "已激活" : "未激活"}}</span>
      </div>
      <div class="promise">
        <span class="small">保证金：</span>
        <span class="big bigColor">{{promiseFee}} OSCH</span>
        <img class="question" src="@/assets/img/u897.png" alt>
      </div>
      <div class="coinList">
        <div class="coin" v-for="item in balances.arr">
          <div class="coinImg">
            <div class="bao">
              <img :src="balances[item].ico" width="40" height="40">
            </div>
            <strong>{{item}}</strong>
          </div>
          <div class="coinInner">
            <p class="banlance">{{balances[item].balance}}</p>
            <p class="ren">≈￥{{balances[item].sumprice | numFilter}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="transac">交易记录</div>
      <div class="element" >
        <TransTable :wArrPage="operations"/>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import QRCode from "qrcodejs2";
import OschSdk from "osch-sdk";
import TransTable from "../TransTable";
export default {
  components: {
    TransTable
  },
  props: ["walletBaseMsg", "account", "balances", "operations"],
  data() {
    return {
      initComplete: false,
      tableData: [],
      currpage: 1,
      pagesize: 10,
      tabList: [], //添加代币数据列表
      limit: 200,
      promiseFee: 0,
      mask1Inner: "目标地址不正确，请确认后重试",
      maskCode: false
    };
  },
  filters: {
    numFilter(value) {
      let transformVal = value ?  Number(value).toFixed(3) : "--";
      return transformVal;
    }
  },
  methods: {
    qrcode6(publicKey) {
      let qrcode6 = new QRCode("qrcode6", {
        width: 200,
        height: 200,
        text: publicKey
      });
    },
    showCode() {
      this.maskCode = true;
    },
    hideCode() {
      this.maskCode = false;
    },
    copy(weilei) {
      let clipboard = new Clipboard(weilei);
      clipboard.on("success", e => {
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        clipboard.destroy();
      });
      this.$message.success("复制成功");
    },
    init: function() {
      const { StrKey, Keypair } = OschSdk;
      const { oschServer, publicKey } = this.walletBaseMsg;
      var _this = this;
      _this.promiseFee = _this.balances.arr.length * 10 + 10; //最低保证金
    }
  },
  mounted() {
    if (this.account.isActive) {
      this.init();
      this.qrcode6(this.walletBaseMsg.publicKey);
    }
  }
};
</script>
<style  lang="scss" scoped>
@import "./style.scss";
</style>