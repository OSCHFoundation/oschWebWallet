<template>
  <div class="inner">
    <v-header class="header"></v-header>
    <main class="main">
      <div class="main-left">
        <div class="img">
          <img src="../../static/img/index_tx@2x.png" width="48" height="48" alt>
        </div>
        <div class="coinName">
          <span>钱包名字</span>
          <!-- <img class="coinImg" src="./img/u232.png" alt> -->
          <p class="cash">≈ ￥ {{price | numFilter}}</p>
        </div>
        <div class="operationList">
          <ul class="opList" @click="handleClick">
            <li  v-bind:class="{back:back1 == 1}" @click="num(1)">
              <div class="li1" >
                <img src="../../static/img/index_message@2x.png" width="26" height="26" alt>
                <span>钱包信息</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 2}" @click="num(2)">
              <div class="li1">
                <img src="../../static/img/index_zc@2x.png" width="26" height="26" alt>
                <span>资产</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 3}" @click="num(3)">
              <div class="li1">
                <img src="../../static/img/index_zz@2x.png" width="26" height="26" alt>
                <span>转账</span>
              </div>
            </li>
            <li v-bind:class="{back:back1 == 4}" @click="num(4)">
              <div class="li1">
                <img src="../../static/img/index_code@2x.png" width="26" height="26" alt>
                <span>收款</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-right">
        <v-wallet v-if="come==1" v-on:listenPrice="showPrice"></v-wallet>
        <v-asset v-if="come==2"></v-asset>
        <v-payments v-if="come==3"></v-payments>
        <v-receivables  v-if="come==4"></v-receivables>
      </div>
    </main>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import VWallet from "./innerList/wallet";
import VAsset from "./innerList/asset";
import VPayments from "./innerList/payments";
import VReceivables from "./innerList/receivables"
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
      come: 1, //v-show
      price: 0,
      back1:1
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
    num(val) {
      this.back1 = val
    },
    handleClick(event) {
      if (event.target.innerHTML == "钱包信息") {
        this.come = 1;
        // location.reload()

        console.log(this.show);
      } else if (event.target.innerHTML == "资产") {
        this.come = 2;
        console.log(this.show);
      } else if (event.target.innerHTML == "转账") {
        this.come = 3;
        console.log(this.show);
      } else if (event.target.innerHTML == "收款") {
        this.come = 4;
      }   
    },
    showPrice(data) {
      console.log("1231231321");
      console.log(data);
      this.price = data;
      this.price.toFixed(2);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.inner {
  margin: 0 auto;
}
.main {
  padding-bottom: 32px;
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
  margin-bottom: 250px;
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
}
.li1 {
  padding-top: 15px;
  margin-left: 16px;
}
.li1 img {
  float: left;
  overflow: hidden;
}
.li1 span {
  margin-left: 20px;
  color: #999999
}
.back {
  background:rgba(28,35,46,1);
  color:rgba(229,229,229,1);
}
</style>