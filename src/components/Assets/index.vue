<template>
  <div class="asset">
    <div class="mask" v-show="open">
      <div class="transactionMask">
        <div class="closeMask" @click="closeClick">X</div>
        <p class="addCoinTitle">添加资产</p>
        <div class="addTime" v-for="item in showTokenlist">
          <div class="coinImg">
            <img :src="balancesList[item].ico" width="44" height="44">
          </div>
          <div class="coinInner">
            <h2 class="title">{{item}}</h2>
          </div>
          <button class="btn" type="primary" @click="addTrust(balancesList[item].obj)">信任HOUR</button>
        </div>
      </div>
    </div>
    <div class="coinList">
      <div
        v-bind:class="{coin:true,back: activeAsset == item}"
        v-for="item in balances.activeArr"
        @click="switchAsset(item)"
      >
        <div class="coinImg">
          <img :src="balances[item].ico" width="32" height="32">
        </div>
        <div class="coinInner">
          <span>{{item}}</span>
        </div>
      </div>
      <div class="addCoin" @click="openMask" >
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
        <span class="word">{{activeAsset}}</span>
        <div class="exchange">
          <span class="rmb">CNY</span>
          <span class="cash">≈ ￥ 0.01</span>
          <button v-show="showBtn" @click="cancelTrust(activeAsset)" class="close">取消信任</button>
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
import config from "../../config";
import { merge } from "lodash";
export default {
  props: [
    "coinPrice",
    "walletBaseMsg",
    "balances",
    "operations",
    "account",
    "transaction"
  ],
  components: {
    TransTable
  },
  data() {
    return {
      balancesList: {},
      activeAsset: "OSCH", //当前选中的资产
      activeAssetsArr: [], //选中资产列表
      filterOperation: [], //分为osch，time，hour等操作
      number: 0, //当前选中token数量
      showBtn: false, //取消信任按钮
      open: false,
      unit: "OSCH",
      loading: true
    };
  },
  computed: {
    showTokenlist: function() {
      return this.balancesList.arr.filter(item => {
        return this.balances.activeArr.every(item1 => {
          return item != item1;
        });
      });
    }
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
      this.activeAsset = type;
      this.activeAssetsArr = this[type];
      this.number = this.balances[type].balance;
      this.filterOperation = this.operations.filter(item => {
        return type == item.asset;
      });
      this.showBtn = this.activeAsset != "OSCH";
    },
    transactionInfo() {
      //点击跳转coast详情页面
      window.location.href =
        "http://coast.oschain.io/transactions/" +
        event.target.innerHTML +
        "/operations";
    },
    cancelTrust(type) {
      const _this = this;
      const { Operation } = OschSdk;
      if (this.balances[type].balance > 0) {
        this.$message.error("操作失败，当前代币尚有余额，取消信任需先转出余额");
      } else {
        const loading = this.$loading({
          lock: false,
          text: "玩命加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        const asset = this.balancesList[type].obj;
        const operation = Operation.changeTrust({
          asset: asset,
          limit: "0"
        });
        this.transaction(operation)
          .then(res => {
            loading.close();
            _this.$message.success("取消成功");
            _this.balances.activeArr = _this.balances.activeArr.filter(item => {
              return item != type;
            });
            _this.switchAsset("OSCH");
          })
          .catch(function(err) {
            loading.close();
            this.$message.error("操作失败，当前代币尚有余额，请稍后重试");
          });
      }
    },
    addTrust(coin) {
      const { Operation } = OschSdk;
      const operation = Operation.changeTrust({
        asset: coin
      });
      this.open = false;
      const loading = this.$loading({
        lock: false,
        text: "玩命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.transaction(operation)
        .then(res => {
          loading.close();
          this.$message.success("添加成功");
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch(err => {
          loading.close();
          this.$message.success("添加失败");
        });
    },
    //打开遮罩层
    openMask() {
      this.open = true;
    },
    closeClick() {
      this.open = false;
    }
  },
  created(){
    this.balancesList =  merge(this.balancesList, config.assetList);
  },
  mounted() {
    const { Asset } = OschSdk;
    //按照类型筛选交易
    this.filterOperation = this.operations.filter(item => {
      return "OSCH" == item.asset;
    });
    this.number = this.balances["OSCH"].balance;
  }
};
</script>
<style  lang="scss" scoped>
@import "./style.scss";
</style>  