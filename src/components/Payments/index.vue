<template>
  <div class="payments">
    <div class="progressMask" v-if="showProgress">
      <div class="progressInner">
        <span>正在提交</span>
        <el-progress :percentage="progress"></el-progress>
        <div class="second">正在进行交易，大约需要几秒时间</div>
      </div>
    </div>
    <div class="mask" v-if="maskTips">
      <div class="alertMask">
        <div class="title">目标地址未激活</div>
        <div class="alertInner">目标地址未激活，转大于100 OSCH 激活该账户</div>
        <button class="alertBtn" @click="closeMaskTips">确认</button>
      </div>
    </div>
    <div class="mask1" v-if="mask1Tips">
      <div class="mask1Box">
        <div class="mask1Title">
          <img src="../../../static/img/Tips.png" width="28px" height="28px">
        </div>
        <div class="mask1Inner">{{mask1Inner}}</div>
      </div>
    </div>
    <div v-show="page">
      <strong class="payHeader">选择转账资产</strong>
      <div class="choseCoin">
        <div class="coinList">
          <div
            class="coin"
            v-for="item in balances.arr"
            @click="selectAsset(item, balances[item].balance)"
          >
            <div class="coin-left">
              <img :src="selectType == item ? yc :xianshi" width="22" height="22">
            </div>
            <div class="coin-right">
              <div class="coinImg">
                <img :src="balances[item].ico" width="40" height="40">
              </div>
              <div class="coinInner">
                <strong class="stron">{{item}}</strong>
              </div>
              <span class="balance1">{{ balances[item].balance}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title1">转账信息</div>
    </div>

    <!-- 填写信息 -->
    <div class="writeInfo">
      <div class="write-title">
        <span class="title-left">转账地址</span>
        <span class="star">*</span>
      </div>
      <input
        placeholder="输入对方公钥地址"
        class="writeInput"
        v-model="toAccount.public"
        onkeyup="this.value=this.value.replace(/(^\s*)|(\s*$)/g,'')"
        maxlength="57"
        @blur="verifToPublic"
      >
      <div class="write-title">
        <span class="title-left">转账数量</span>
        <span class="star">*</span>
      </div>
      <input
        placeholder="输入转账数量"
        class="writeInput"
        v-model="toOschNum"
        onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"
        maxlength="15"
      >
      <div class="write-title">
        <span class="title-left">矿工费（选填）</span>
        <img src="../../../static/img/u897.png" width="16" height="16" class="ques">
      </div>
      <input
        placeholder="输入交易矿工费"
        v-model="baseFee"
        class="writeInput"
        maxlength="10"
        onkeyup="value=value.replace(/[^\d\.]/g,'')"
      >
      <div class="write-title">
        <span class="title-left">备注（选填）</span>
        <el-switch v-model="value2" active-color="#10C796" inactive-color="#666566"></el-switch>
      </div>
      <input
        placeholder="最多可输入10个字符"
        class="writeInput"
        v-model="memo"
        v-show="value2"
        maxlength="10"
      >
      <button
        class="sure"
        :class="{sure:(toOschNum==''&&toPublic==''),sure1:(toOschNum!=''&&toPublic!='')}"
        v-bind:disabled="(toOschNum==''||toPublic=='')"
        @click="openMask"
      >确认</button>
    </div>
    <div class="confrimTransaction" v-show="close">
      <div class="transactionMask">
        <h2 class="maskTitle">转账信息</h2>
        <div class="maskInner mBorder">
          <p class="maskInnerList">
            <span class="maskListLeft">转账地址:</span>
            <span class="maskListRight">{{walletBaseMsg.publicKey}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">收款地址:</span>
            <span class="maskListRight">{{toPublic}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">账户余额:</span>
            <br>
            <span class="maskListRight">{{allCoin | numFilter}}</span>
            <span class="unit">{{selectType}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">交易额:</span>
            <br>
            <span class="maskListRight coinColor">{{toOschNum | numFilter}}&nbsp {{selectType}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">备注:</span>
            <br>
            <span class="maskListRight">{{memo}}</span>
          </p>
          <div class="btnBox">
            <button class="maskBtn cancel" @click="closeMask">取消交易</button>
            <button class="maskBtn send" @click="sendClick">确认无误,发送交易</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OschSdk from "osch-sdk";
import select from "../../../static/img/set.png";
import noSelect from "../../../static/img/set1.png";
export default {
  props: ["walletBaseMsg", "account"],
  components: {},
  data() {
    return {
      balances: {
        OSCH: {
          ico: "../../../static/img/u15.png"
        },
        HOUR: {
          ico: "../../../static/img/u259.png"
        },
        TIME: {
          ico: "../../../static/img/u269.png"
        },
        arr: ["OSCH"]
      },
      toPublic: "", // 目标账户
      toAccount: {
        public: "",
        isActive: false,
        isValid: false,
        trustArr: []
      },
      selectType: "OSCH", // 资产类型
      value1: true,
      value2: false,
      // 开关插件
      isHour: false,
      isTime: false,
      page: true, //进入页面
      page1: false, //转账页面
      // choseSelect: 1,
      xianshi: select,
      yc: noSelect,
      oschNum: "0", //剩余Osch数量
      hourNum: "0",
      timeNum: "0",
      hourCode: "",
      timeCode: "",
      hourIssuer: "",
      timeIssuer: "",
      trueToPublic: true,
      toOschNum: "", // 交易数量
      oschServer: "", //Stellar
      valid: 1, //判断目的地地址
      transactionType: "", //交易类型
      memo: "", //备忘录
      close: false, //遮罩层
      baseFee: "", //愿意在此交易中按操作支付的最高费用
      trustHour: false,
      trustTime: false,
      promiseFee: 10,
      maskTips: false,
      maskTitle: "",
      maskInner: "",
      mask1Tips: false,
      mask1Inner: "目标地址不正确，请确认后重试",
      allCoin: "",
      progress: 0,
      showProgress: false
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
    verifToPublic() {
      const _this = this;
      const { oschServer } = this.walletBaseMsg;
      const { StrKey } = OschSdk;
      if (!StrKey.isValidEd25519PublicKey(this.toAccount.public)) {
        this.$message.error("目标账户格式不对");
        return;
      }
      this.toAccount.isValid = true;
      this.oschServer
        .loadAccount(this.toPublic)
        .then(function(account) {
          this.toAccount.isActive = true;
          for (var num of account.balances) {
            if (num.asset_code) {
              this.toAccount.trustArr.push(num.asset_code);
            }
            
          }
        })
        .catch(err => {
          if(_this.selectType === "OSCH"){
            _this.toAccount.isValid = true;
          }
          this.toAccount.isActive = false;
        });
    },
    addProgress() {
      // this.progress = 0;
      setInterval(() => {
        this.progress++;
        if (this.mask1Tips == true) {
          this.progress = 99;
        }
      }, 50);
      this.progress = 0;
    },
    setMask() {
      this.mask1Tips = true;
      setTimeout(() => {
        this.mask1Tips = false;
      }, 3000);
    },
    closeMaskTips() {
      this.maskTips = false;
      if (this.selectType == "TIME") {
        this.close = false;
      } else if (this.selectType == "HOUR") {
        this.close = false;
      } else {
        this.close = true;
      }
    },
    cleanSpace(str) {
      // str.replace
    },
    back() {
      this.page1 = false;
      this.page = true;
    },
    selectAsset(type, num) {
      this.selectType = type;
      this.allCoin = num;
    },
    closeMask() {
      this.close = false;
    },
    //打开遮罩层
    openMask() {
      var _this = this;
      const { StrKey } = OschSdk;
      const { publicKey } = this.walletBaseMsg;
      _this.trueToPublic = true;
      let payMoney = parseInt(_this.toOschNum);
      let quick = parseInt(_this.baseFee);
      if (!StrKey.isValidEd25519PublicKey(_this.toPublic)) {
        this.$message.error("目标地址不符合规则，请确认后重试");
        return;
      }
      if (_this.toPublic == publicKey) {
        this.$message.error = "目标地址不能为当前账户地址,请重试";
        return;
      }
      if (_this.allCoin - _this.toOschNum < 0) {
        this.$message.error = "余额不足，请稍后再试";
        return;
      }
      if (typeof payMoney != "number") {
        this.$message.error = "请输入正确的数字格式";
        return;
      }
      if (_this.baseFee == "") {
        _this.baseFee = 10;
      }
      let fees = this.allCoin - this.promiseFee;
      if (_this.baseFee < 10) {
        this.$message.error = "基本费用不可小于10";
      } else if (typeof quick != "number") {
        this.$message.error = "请输入正确的数字格式";
      } else if (fees < 0) {
        this.$message.error = "此操作小于基本费用";
      } else {
        console.log("login 1");
        _this.close = true;
      }
      //交易数量不能为空
    },
    sendClick() {
      const _this = this;
      const trueFee = {
        fee: _this.baseFee * 10000000
      };
      const { TransactionBuilder, Operation, Asset, Memo, Keypair } = OschSdk;
      const { publicKey, secret, oschServer } = this.walletBaseMsg;
      //开机计时
      this.addProgress();
      this.showProgress = true;
      this.close = false;
      // _this.selectType = "Osch"
      //判断选择类型
      //当valid的值为1是,则进行转账交易
      const transaction = new TransactionBuilder(_this.account, trueFee);
      if (_this.valid == 1) {
        if (_this.selectType == "OSCH") {
          transaction
            .addOperation(
              Operation.payment({
                destination: _this.toPublic,
                asset: Asset.native(),
                amount: _this.toOschNum
              })
            )
            .addMemo(Memo.text(_this.memo))
            .setTimeout(30)
            .build();
          transaction.sign(Keypair.fromSecret(secret)); // sign the transaction
        }
        // 提交交易信息
        this.oschServer
          .submitTransaction(transaction)
          .then(function(res) {
            _this.close = false;
            _this.progress = 99;
            _this.showProgress = false;
            // alert("发送成功");
            _this.mask1Inner = "发送成功";
            _this.setMask(); //弹出遮罩
            // location.reload();
            setTimeout(() => {
              location.reload();
            }, 2000);
          })
          .catch(err => {});
        if (_this.selectType == "TIME") {
          if (_this.trustTime == false) {
            _this.close = false;
            _this.showProgress = false;
            _this.mask1Inner =
              "你所转到的账户未信任“TIME币”，可通知其开启“TIME币”信任，再次进行尝试";
            _this.setMask(); //弹出遮罩
          } else {
            transaction
              .addOperation(
                StellarSdk.Operation.payment({
                  destination: _this.toPublic,
                  asset: new StellarSdk.Asset(_this.timeCode, _this.timeIssuer),
                  amount: _this.toOschNum
                })
              )
              .addMemo(StellarSdk.Memo.text(_this.memo))
              .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(secret)); // sign the transaction
          }
        }
        if (_this.selectType == "HOUR") {
          if (_this.trustHour == false) {
            _this.close = false;
            _this.showProgress = false;
            _this.mask1Inner =
              "你所转到的账户未信任“HOUR币”，可通知其开启“HOUR币”信任，再次进行尝试";
            _this.setMask(); //弹出遮罩
          } else {
            transaction
              .addOperation(
                StellarSdk.Operation.payment({
                  destination: _this.toPublic,
                  asset: new StellarSdk.Asset(_this.hourCode, _this.hourIssuer),
                  amount: _this.toOschNum
                })
              )
              .addMemo(StellarSdk.Memo.text(_this.memo))
              .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(secret)); // sign the transaction
          }
        }
        //如果valid 的值为2 则进行激活事件
      } else if (_this.valid == 2) {
        if (_this.selectType == "Osch") {
          this.oschServer.loadAccount(publicKey).then(function(account) {
            transaction
              .addOperation(
                StellarSdk.Operation.createAccount({
                  destination: _this.toPublic, //需要激活的账户
                  startingBalance: _this.toOschNum //激活账户最低余额 in XLM
                })
              )
              .addMemo(StellarSdk.Memo.text(_this.memo)) // 添加备忘录
              .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(secret));
          });
        }
      }
    }
  },
  created() {
    this.select = 1;
    this.value1 = 1;
  },
  mounted() {
    const _this = this;
    const { Config, Network, Server, StrKey, Keypair } = OschSdk;
    const { publicKey, secret, oschServer } = this.walletBaseMsg;
    //找到账户信息
    for (var item of this.account.balances) {
      item.balance = parseInt(item.balance);
      if (item.asset_type == "native") {
        this.balances["OSCH"] = {
          ...this.balances["OSCH"],
          ...item
        };
      } else {
        const type = item.asset_code.toUpperCase();
        this.balances[type] = {
          ...this.balances[type],
          ...item
        };
        this.balances.arr.push(type);
      }
    }
    for (var num of this.account.balances) {
      if (num.asset_code == "hour") {
        this.balances.TIME = {
          ...this.balances.TIME,
          ...num
        };
        _this.hourIssuer = num.asset_issuer;
        _this.hourCode = num.asset_code;
        _this.isHour = true;
      } else if (num.asset_code == "time") {
        _this.timeNum = num.balance;
        _this.timeIssuer = num.asset_issuer;
        _this.timeCode = num.asset_code;
        _this.isTime = true;
      } else if (num.asset_type == "native") {
        _this.oschNum = num.balance;
        _this.allCoin = num.balance;
      }
    }
    this.allCoin = this.oschNum;
  }
};
</script>
<style scoped>
.payments {
  padding: 0 0 0 32px;
  min-height: 895px;
  background: rgba(23, 29, 38, 1);
  background-image: url("../../../static/img/sk_bg@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: 0% 100%;
}
.payHeader {
  padding-top: 24px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
  display: block;
}
.coin {
  margin-right: 20px;
  display: inline-block;
}
.coin:hover {
  cursor: pointer;
}
.coinImg {
  float: left;
  margin: 14px 0 0 14px;
  width: 46px;
  height: 46px;
  border: 3px solid rgba(104, 104, 104, 0.2);
  border-radius: 50%;
}
.coinImg img {
  padding-top: 3px;
  padding-left: 3px;
  /* vertical-align: middle; */
}
.coinInner {
  display: inline-block;
  padding-left: 15px;
  line-height: 80px;
  font-size: 17px;
}
.choseCoin {
  width: 100%;
}
.coinList {
  margin-top: 40px;
}
.payInner {
  margin: 0 auto;
  width: 80%;
  height: 1200px;
  background: aliceblue;
}
.payHea {
  padding-top: 50px;
  font-size: 40px;
  text-align: center;
}
.innerList {
  padding: 10px;
  margin: 30px auto;
  width: 90%;
}
.inner-left {
  display: inline-block;
  font-size: 20px;
  width: 250px;
  height: 34px;
  line-height: 34px;
  text-align: right;
}
.inner-right {
  display: inline-block;
  margin-left: 20px;
}
.inner-right input {
  width: 700px;
  height: 40px;
}
.btn {
  margin-top: 150px;
}
.next {
  margin-left: 30px;
  height: 30px;
  width: 200px;
  background: aliceblue;
}
.prev {
  margin-left: 100px;
  height: 30px;
  width: 200px;
  background: antiquewhite;
}
.confrimTransaction {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99999;
}
.transactionMask {
  position: relative;
  padding: 15px;
  margin: 0 auto;
  margin-top: 7%;
  width: 444px;
  min-height: 515px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.maskTitle {
  margin: 0 0 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
.maskHeader {
  width: 100%;
  height: 115px;
}
.maskInner {
  height: 305px;
}
.maskFooter {
  padding: 20px;
  text-align: center;
  height: 150px;
}
.maskBtn {
  width: 188px;
  height: 44px;
  border-radius: 4px;
  border: 1px;
  border: none;
}
.coin-left {
  float: left;
  margin-top: 31px;
}
.coin-right {
  margin-bottom: 20px;
  height: 80px;
  width: 286px;
  margin-left: 38px;
  background: rgba(42, 53, 69, 1);
  border-radius: 6px;
  background-image: url("../../../static/img/coin.png");
  background-size: 100% 100%;
}
.stron {
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
}
.balance1 {
  float: right;
  margin: 30px 16px 0 0;
  text-align: right;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(1, 227, 181, 1);
}
.title1 {
  margin-top: 34px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.title-left {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.star {
  font-size: 16px;
  color: #e84949;
}
.writeInput {
  letter-spacing: 1px;
  color: #fff;
  padding-left: 8px;
  width: 690px;
  height: 40px;
  border: 1px solid #2f3d4d;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.writeInput:focus {
  color: #fff;
  border: 1px solid rgba(16, 199, 150, 1);
}
.write-title {
  height: 52px;
  line-height: 52px;
}
.ques {
  padding-top: 20px;
}
.sure {
  font-size: 16px;
  color: aliceblue;
  border: none;
  margin-top: 48px;
  display: block;
  width: 212px;
  height: 44px;
  /* border: 1px solid #fff; */
  background: rgba(99, 98, 102, 1);
  border-radius: 4px;
}
.sure1 {
  font-size: 16px;
  color: aliceblue;
  margin-top: 48px;
  display: block;
  width: 212px;
  height: 44px;
  /* border: 1px solid #fff; */

  background: #10c796;
  border-radius: 4px;
}
.sure1:hover {
  cursor: pointer;
}
.maskListLeft {
  display: inline-block;
  margin-bottom: 16px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.maskListRight {
  margin-bottom: 16px;
  display: inline-block;
  max-width: 382px;
  word-wrap: break-word;
  word-break: normal;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(26, 26, 26, 1);
}
.cancel {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(179, 179, 179, 1);
}
.cancel:hover {
  cursor: pointer;
}
.send {
  margin-left: 15px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
}
.send:hover {
  cursor: pointer;
}
.alertMask {
  position: absolute;
  left: 40%;
  top: 30%;
  padding: 24px;
  width: 360px;
  height: 207px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.alertMask .title {
  margin-bottom: 39px;
  text-align: center;
  font-size: 20px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.alertInner {
  text-align: center;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(26, 26, 26, 1);
}
.alertBtn {
  margin-top: 32px;
  margin-left: 25px;
  width: 312px;
  height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.mask1 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.mask1Box {
  position: relative;
  margin: 20% auto;
  padding: 16px 24px;
  width: 224px;
  min-height: 96px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.6;
  border-radius: 4px;
}
.mask1Title {
  margin: 0 auto;
  width: 29px;
  height: 29px;
}
.mask1Inner {
  display: inline-block;
  text-align: center;
  margin-top: 23px;
  width: 100%;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
}
.progressMask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
}
.progressInner {
  margin: 15% auto;
  padding: 24px 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  width: 514px;
  height: 150px;
}
.progressInner span {
  display: inline-block;
  margin-bottom: 32px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.second {
  margin-top: 24px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.coinColor {
  color: #fe8740;
}
.unit {
  margin-left: 7px;
  font-size: 15px;
}
.btnBox {
  margin: 0 auto;
  width: 400px;
}
</style>  