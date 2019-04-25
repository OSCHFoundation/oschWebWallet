<template>
  <div class="payments">
    <div class="progressMask" v-if="showProgress">
      <div class="progressInner">
        <span>正在提交</span>
        <el-progress :percentage="progress"></el-progress>
        <div class="second">正在进行交易，大约需要几秒时间</div>
      </div>
    </div>
    <div>
      <strong class="payHeader">选择转账资产</strong>
      <div class="choseCoin">
        <div class="coinList">
          <div
            class="coin"
            v-for="item in balances.activeArr"
            @click="selectAsset(item, balances[item].balance)"
          >
            <div class="coin-left">
              <img :src="selectType == item ? hiddenIcon : showIcon">
            </div>
            <div class="coin-right">
              <div class="coinImg">
                <img :src="balances[item].ico">
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
        v-model="toTokenNum"
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
        :class="{sure: true,sure1: toTokenNum && toAccount.isValid}"
        v-bind:disabled="(!toTokenNum || !toAccount.isValid)"
        @click="openMask"
      >确认</button>
    </div>
    <div class="confrimTransaction" v-if="close">
      <div class="transactionMask">
        <h2 class="maskTitle">转账信息</h2>
        <div class="maskInner mBorder">
          <p class="maskInnerList">
            <span class="maskListLeft">转账地址:</span>
            <span class="maskListRight">{{walletBaseMsg.publicKey}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">收款地址:</span>
            <span class="maskListRight">{{toAccount.public}}</span>
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
            <span class="maskListRight coinColor">{{toTokenNum | numFilter}}&nbsp {{selectType}}</span>
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
import select from "@/assets/img/set.png";
import noSelect from "@/assets/img/set1.png";
export default {
  props: ["walletBaseMsg", "account", "balances"],
  components: {},
  data() {
    return {
      toAccount: {
        public: "",
        isActive: false,
        isValid: false,
        trustArr: []
      },
      selectType: "OSCH", // 资产类型
      toTokenNum: "", // 交易数量
      value1: true,
      value2: false,
      // 开关插件
      // choseSelect: 1,
      showIcon: select,
      hiddenIcon: noSelect,
      trueToPublic: true,
      oschServer: "", 
      valid: 1, //判断目的地地址
      transactionType: "", //交易类型
      memo: "", //备忘录
      close: false, //遮罩层
      baseFee: "", //愿意在此交易中按操作支付的最高费用
      promiseFee: 10,
      allCoin: "",
      progress: 0,
      showProgress: false,
      progressTimer: ""
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
    async verifToPublic() {
      //在公钥输入框失去焦点验证
      const _this = this;
      const { oschServer, publicKey } = this.walletBaseMsg;
      const { StrKey } = OschSdk;
      if (this.toAccount.public == publicKey) {
        this.$message.error("目标地址不能为当前账户地址,请重试");
        return;
      }
      if (!StrKey.isValidEd25519PublicKey(this.toAccount.public)) {
        this.$message.error("目标账户格式不对");
        return;
      }
      //查看目标账户
      await oschServer
        .loadAccount(_this.toAccount.public)
        .then(function(account) {
          console.log(account);
          _this.toAccount.isActive = true;
          for (var item of account.balances) {
            if (item.asset_code) {
              _this.toAccount.trustArr.push(item.asset_code);
            }
          }
        })
        .catch(err => {
          console.log(err);
          _this.toAccount.isActive = false;
        });
      //判断是否账户是否满足条件
      if (_this.selectType === "OSCH") {
        _this.toAccount.isValid = true;
      } else {
          console.log(_this.toAccount.trustArr);

        let isTrust = _this.toAccount.trustArr.find(item => {
          if (item.toUpperCase() === _this.selectType) {
            return true;
          }
        });
        if (_this.toAccount.isActive && isTrust) {
          _this.toAccount.isValid = true;
        } else {
          _this.$message.error(
            "目标账户不存在" + _this.selectType + "不能转账"
          );
          _this.toAccount.isValid = false;
        }
      }
    }, //打开遮罩层
    openMask() {
      var _this = this;
      const { StrKey } = OschSdk;
      const { publicKey } = this.walletBaseMsg;
      _this.trueToPublic = true;

      let payMoney = parseInt(_this.toTokenNum);
      let quick = parseInt(_this.baseFee);
      
      if (typeof payMoney != "number") {
        this.$message.error("请输入正确的数字格式");
        return;
      }
      if(!this.toAccount.isActive && _this.toTokenNum < 100){
        this.$message.error("目标地址未激活，转大于100 OSCH 激活该账户");
        return;
      }
      if (_this.allCoin - _this.toTokenNum < 0) {
        this.$message.error("余额不足，请稍后再试");
        return;
      }
      if (_this.baseFee == "") {
        _this.baseFee = 10;
      }
      let fees = this.allCoin - this.promiseFee;
      if (_this.baseFee < 10) {
        this.$message.error("基本费用不可小于10");
      } else if (typeof quick != "number") {
        this.$message.error("请输入正确的数字格式");
      } else if (fees < 0) {
        this.$message.error("此操作小于基本费用");
      } else {
        _this.close = true;
      }
      //交易数量不能为空
    },
    addProgress() {
      this.progress = 0;
      this.showProgress = true;
      this.progressTimer = setInterval(() => {
        this.progress++;
        if (this.progress === 99) {
          clearInterval(this.progressTimer);
        }
      }, 50);
    },
    clearProgress() {
      this.showProgress = false;
      clearInterval(this.progressTimer);
    },
    selectAsset(type, num) {
      this.selectType = type;
      this.allCoin = num;
      this.toAccount.public = "";
      this.toAccount.isActive = false;
      this.toAccount.isValid = false;
      this.toTokenNum = "";
    },
    closeMask() {
      this.close = false;
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

      this.close = false;
      //判断选择类型
      //当valid的值为1是,则进行转账交易
      const transaction = new TransactionBuilder(_this.account, trueFee);
      let operationObj;
      if (_this.toAccount.isActive) {
        const assetObj = this.balances[this.selectType].obj;
        operationObj = Operation.payment({
          destination: _this.toAccount.public,
          asset: assetObj,
          amount: _this.toTokenNum
        });
      } else {
        operationObj = Operation.createAccount({
          destination: _this.toAccount.public, //需要激活的账户
          startingBalance: _this.toTokenNum //激活账户最低余额 in XLM
        });
      }
      const transactionBuild = transaction
        .addOperation(operationObj)
        .addMemo(Memo.text(_this.memo))
        .setTimeout(30)
        .build();
      //进行签名
      transactionBuild.sign(Keypair.fromSecret(secret));
      // 提交交易信息
      oschServer
        .submitTransaction(transactionBuild)
        .then(function(res) {
          _this.$message.success("发送成功");
          _this.clearProgress();
          setTimeout(() => {
            _this.$emit("goPage", 2);
          }, 1300);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    const _this = this;
    this.allCoin = this.balances["OSCH"].balance;
  }
};
</script>
<style  lang="scss" scoped>
     @import "./style.scss";
</style>  