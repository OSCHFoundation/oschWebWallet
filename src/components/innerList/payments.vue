<template>
  <div class="payments">
    <div v-show="page">
      <strong class="payHeader">选择转账资产</strong>
      <div class="choseCoin">
        <div class="coinList">
          <div class="coin" @click="payOsch">
            <div class="coin-left">
              <img :src="selectType =='Osch' ? yc :xianshi" width="22" height="22">
            </div>
            <div class="coin-right">
              <div class="coinImg">
                <img src="../../../static/img/u15.png" width="40" height="40">
              </div>
              <div class="coinInner">
                <strong class="stron">Osch</strong>
              </div>
              <span class="balance1">{{oschNum | numFilter}}</span>
            </div>
          </div>
          <div class="coin" v-show="isTime" @click="payTime">
            <div class="coin-left">
              <img :src="selectType =='Time' ? yc :xianshi" width="22" height="22">
            </div>
            <div class="coin-right">
              <div class="coinImg">
                <img src="../../../static/img/u269.png" width="40" height="40">
              </div>
              <div class="coinInner">
                <strong class="stron">Time</strong>
              </div>
              <span class="balance1">{{timeNum | numFilter}}</span>
            </div>
          </div>
          <div class="coin" v-show="isHour" @click="payHour">
            <div class="coin-left">
              <img :src="selectType =='Hour' ? yc :xianshi" width="22" height="22">
            </div>
            <div class="coin-right">
              <div class="coinImg">
                <img src="../../../static/img/u259.png" width="40" height="40">
              </div>
              <div class="coinInner">
                <strong class="stron">Hour</strong>
              </div>
              <span class="balance1">{{hourNum | numFilter}}</span>
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
      <input type="text" placeholder="输入对方公钥地址" class="writeInput" v-model="toPublic">
      <div class="write-title">
        <span class="title-left">转账数量</span>
        <span class="star">*</span>
      </div>
      <input type="text" placeholder="输入转账数量" class="writeInput"  v-model="toOschNum" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)">
      <div class="write-title">
        <span class="title-left">矿工费（选填）</span>
        <img src="../../../static/img/u897.png" width="16" height="16" class="ques">
      </div>
      <input type="text" placeholder="输入交易矿工费" class="writeInput">
      <div class="write-title">
        <span class="title-left">备注（选填）</span>
        <el-switch v-model="value2" active-color="#10C796" inactive-color="#ccc"></el-switch>
      </div>
      <input type="text" placeholder="最多可输入10个字符" class="writeInput" v-model="memo">
        <button class="sure"  :class="{sure:(toOschNum==''&&toPublic==''),sure1:(toOschNum!=''&&toPublic!='')}"  v-bind:disabled="(toOschNum==''&&toPublic=='')" @click="openMask">确认</button>
    </div>
    <div class="confrimTransaction" v-show="close">
      <div class="transactionMask">
        <h2 class="maskTitle">转账信息</h2>
        <!-- <div class="maskHeader mBorder">
          <div class="maskAccount">当前地址: {{publicKey}}</div>
          <div class="maskAccount">目标地址: {{toPublic}}</div>
          <div class="masknum">交易额: {{toOschNum}} {{selectType}}</div>
        </div> -->
        <div class="maskInner mBorder">
          <p class="maskInnerList">
            <span class="maskListLeft">当前地址:</span>
            <span class="maskListRight">{{publicKey}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">目标地址:</span>
            <span class="maskListRight">{{toPublic}}</span>
          </p>
          <p class="maskInnerList" v-show="memo">
            <span class="maskListLeft">备忘录:</span>
            <span class="maskListRight">{{memo}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">账户余额:</span>
            <span class="maskListRight">{{oschNum}} {{selectType}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">交易额:</span>
            <span class="maskListRight">{{toOschNum}}&nbsp {{selectType}}</span>
          </p>
          <p class="maskInnerList">
            <span class="maskListLeft">币种:</span>
            <span class="maskListRight">{{selectType}}</span>
          </p>
            <button class="maskBtn cancel" @click="closeMask">取消交易</button>
        <button class="maskBtn send" @click="sendClick">确认无误,发送交易</button>
        </div>
        <!-- <div class="maskFooter mBorder">
          <h1 class="mskFooterTitle">你已经确定发送&nbsp{{toOschNum}}&nbsp {{selectType}} 到：</h1>
          <h2>{{toPublic}}</h2>
        </div> -->
      
      </div>
    </div>
    <!-- <div class="back-mask"></div> -->

  </div>
</template>

<script>
import select from "../../../static/img/set.png";
import noSelect from "../../../static/img/set1.png";  
export default {
  components: {},
  props: {},
  data() {
    return {
        value1: true,
        value2: true,
        // 开关插件
      isHour: false,
      isTime: false,
      page: true, //进入页面
      page1: false, //转账页面
      selectType: "Osch", // 资产类型
      // choseSelect: 1,
      xianshi:select,
      yc:noSelect,
      oschNum: "0", //剩余Osch数量
      hourNum: "0",
      timeNum: "0",
      hourCode: "",
      timeCode: "",
      hourIssuer: "",
      timeIssuer: "",
      toPublic: "", // 目标账户
      trueToPublic: true,
      toOschNum: "", // 交易数量
      server: "", //Stellar
      stellarServer: "", //Stellar
      account: "", //每次请求stellar返回的账户详情
      secret: this.$route.params.id, //私钥
      publicKey: "",
      valid: 1, //判断目的地地址
      transactionType: "", //交易类型
      memo: "", //备忘录
      close: false, //遮罩层
      baseFee: "", //愿意在此交易中按操作支付的最高费用
      trustHour: false,
      trustTime: false,
      promiseFee: 0
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
    back() {
      this.page1 = false;
      this.page = true;
    },
    payOsch() {
      // this.page = false;
      // this.page1 = true;
      this.selectType = "Osch";
      console.log('gagagagaga')
    },
    payTime() {
      // this.page = false;
      // this.page1 = true;
      this.selectType = "Time";
    },
    payHour() {
      // this.page = false;
      // this.page1 = true;
      this.selectType = "Hour";
    },
    closeMask() {
      this.close = false;
    },
    //打开遮罩层
    openMask() {
      var _this = this;
      try {
        //判断目标地址是否合法
        let strkey = StellarSdk.StrKey;
        let arrPrivate = strkey.decodeEd25519PublicKey(_this.toPublic);
      } catch (err) {
        console.log(err.response);
        _this.trueToPublic = false;
      }
      if (_this.trueToPublic == false) {
        alert("当前输入的公钥无效");
        location.reload();
      } else if (_this.toPublic == _this.publicKey) {
        alert("目标地址不能为当前账户地址");
        location.reload();
      } else {
        // 目标地址合法执行
        _this.stellarServer
          .loadAccount(_this.toPublic)
          .then(function(account) {
            console.log(99999999999999999);
            for (var num of account.balances) {
              if (num.asset_code == "hour") {
                _this.trustHour = true; //确认账户中信任过Huor资产
              } else if (num.asset_code == "time") {
                _this.trustTime = true; //确认账户中信任过Time资产
              }
            }
            if (_this.toOschNum == "") {
              alert("交易数量不能为空");
              location.reload();
            } else {
              _this.close = true;
            }
          })
          .catch(err => {
            alert("你所转到的账户未激活，转大于100OSCH即可以激活该账户");

            console.log(err.response);
            //报错则认为输入的目标在账户为激活,或输入错误
            _this.valid = 2; //转账操作
            if (_this.toOschNum == "") {
              alert("交易数量不能为空");
              location.reload();
            } else {
              _this.close = true;
            }
          });
        //交易数量不能为空
        //做判断基础交易费用
        console.log(_this.baseFee);
        console.log(_this.account);
        let fees = this.toOschNum - this.promiseFee;
        if (_this.baseFee == "") {
          _this.baseFee = 10;
        } else if (_this.baseFee < 10) {
          alert("基本费用不可小于10");
          _this.close = false;
          location.reload();
        } else if (this.fees < 0) {
          alert("此操作小于一本费用");
          _this.close = false;
          location.reload();
        }
      }
    },
    sendClick() {
      console.log('haahahaa')
      // this.close = true
      var _this = this;
      let bulid = {
        fee: _this.baseFee * 10000000
      };
      // _this.selectType = "Osch"
      console.log(_this.selectType)
      //判断选择类型
      //当valid的值为1是,则进行转账交易
      if (_this.valid == 1) {
        if (_this.selectType == "Osch") {

          var transaction = new StellarSdk.TransactionBuilder(
            _this.account,
            // bulid
          )
            .addOperation(
              StellarSdk.Operation.payment({
                destination: _this.toPublic,
                asset: StellarSdk.Asset.native(),
                amount: _this.toOschNum
              })
            )
            .addMemo(StellarSdk.Memo.text(_this.memo))
            .build();
          transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
          // 提交交易信息
          _this.stellarServer
            .submitTransaction(transaction)
            .then(function(res) {
              console.log("发送交易成功");
              alert("发送成功");
              location.reload();
            })
            .catch((err)=>{
            console.log('zheehijiaoyi')

              console.log('fafa')
            })
        }
        if (_this.selectType == "Time") {
          if (_this.trustTime == false) {
            alert(
              "你所转到的账户未信任“Time币”，可通知其开启“Time币”信任，再次进行尝试"
            );
            location.reload();
          } else {
            var transaction = new StellarSdk.TransactionBuilder(
              _this.account,
              bulid
            )
              .addOperation(
                StellarSdk.Operation.payment({
                  destination: _this.toPublic,
                  asset: new StellarSdk.Asset(_this.timeCode, _this.timeIssuer),
                  amount: _this.toOschNum
                })
              )
              .addMemo(StellarSdk.Memo.text(_this.memo))
              .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
            // 提交交易信息
            _this.stellarServer
              .submitTransaction(transaction)
              .then(function(res) {
                console.log("发送交易成功");
                alert("发送成功");
                location.reload();
              })
              .catch((err)=> {
                console.log('faf')
              });
          }
        }
        console.log('kkk')
        if (_this.selectType == "Hour") {
          if (_this.trustHour == false) {
            alert(
              "你所转到的账户未信任“Time币”，可通知其开启“Time币”信任，再次进行尝试"
            );
            location.reload();
          } else {
            var transaction = new StellarSdk.TransactionBuilder(
              _this.account,
              bulid
            )
              .addOperation(
                StellarSdk.Operation.payment({
                  destination: _this.toPublic,
                  asset: new StellarSdk.Asset(_this.hourCode, _this.hourIssuer),
                  amount: _this.toOschNum
                })
              )
              .addMemo(StellarSdk.Memo.text(_this.memo))
              .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(this.secret)); // sign the transaction
            // 提交交易信息
            _this.stellarServer
              .submitTransaction(transaction)
              .then(function(res) {
                console.log("发送交易成功");
                alert("发送成功");
                location.reload();
              });
          }
        }
        //如果valid 的值为2 则进行激活事件
      } else if (_this.valid == 2) {
        if (_this.selectType == "Osch") {
          this.stellarServer
            .loadAccount(_this.publicKey)
            .then(function(account) {
              console.log(account);
              var transaction = new StellarSdk.TransactionBuilder(account, {
                fee: _this.baseFee
              })
                .addOperation(
                  StellarSdk.Operation.createAccount({
                    destination: _this.toPublic, //需要激活的账户
                    startingBalance: _this.toOschNum //激活账户最低余额 in XLM
                  })
                )
                .addMemo(StellarSdk.Memo.text(_this.memo)) // 添加备忘录
                .build();
              transaction.sign(StellarSdk.Keypair.fromSecret(_this.secret));
              _this.stellarServer
                .submitTransaction(transaction)
                .then(function(res) {
                  console.log("目标地址初始化成功");
                  alert("目地址初始化成功");
                  location.reload();
                });
            });
        } else {
          alert("目标账户尚未为激活，无法进行其他操作，激活请用本币Osch激活");
          location.reload();
        }
      }
    }
  },
  created() {
    this.select = 1;
    this.value1 = 1
  },
  mounted() {
    var _this = this;
    StellarSdk.Config.setAllowHttp(true);
    StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
    _this.stellarServer = new StellarSdk.Server(_this.horizonUrl);
    _this.server = new StellarSdk.Server(_this.horizonUrl);
    console.log(_this.server);

    //init secret tool
    var strkey = StellarSdk.StrKey;
    var arrPrivate = strkey.decodeEd25519SecretSeed(_this.secret);
    var keypair = new StellarSdk.Keypair({
      type: "ed25519",
      secretKey: arrPrivate
    });
    _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
    //找到账户信息
    _this.server
      .loadAccount(this.publicKey)
      .then(function(account) {
        _this.account = account;
        for (var num of account.balances) {
          if (num.asset_code == "hour") {
            _this.hourNum = num.balance;
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
          }
        }
      })
      .catch(err => {
        console.log("hhahahahahahahahhaha");
      });
    let user = JSON.parse(sessionStorage.user);
    this.promiseFee = user.fee;
    console.log(this.promiseFee);
  }
};
</script>
<style scoped>
.payments {
  padding: 0 0 0 32px;
  min-height: 895px;
  background: rgba(23, 29, 38, 1);

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
.coinImg {
  float: left;
  margin: 17px 0 0 14px;
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
  line-height: 89px;
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
  padding: 0.75rem;
  margin: 180px auto;
  width:444px;
height:567px;
background:rgba(255,255,255,1);
border-radius:4px;
}
.maskTitle {
  margin: 0 0 1rem;
  text-align: center;
  font-size: 1.9rem;
  font-weight: 300;
}
.mBorder {
  border-top: 1px solid #ccc;
}
.maskHeader {
  width: 100%;
  height: 115px;
}
.maskInner {
  padding: 20px;
  height: 305px;
}
.maskFooter {
  padding: 20px;
  text-align: center;
  height: 150px;
}
.maskBtn {
  width:188px;
height:44px;
border-radius:4px;
  border: 1px;
}
.coin-left {
  float: left;
  margin-top: 31px;
}
.coin-right {
  height: 80px;
  width: 300px;
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
  margin-top: 64px;
  font-size: 22px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(240, 240, 240, 1);
}
.title-left {
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(153,153,153,1);
}
.star {
  font-size:16px;
  color: #E84949
}
.writeInput {
  letter-spacing:1px;
  color: #fff;
  padding-left: 8px;
  width:690px;
height:40px;
border:1px solid rgba(63,79,102,1);
background: rgba(0, 0, 0, 0.1);
border-radius:2px;
}
.writeInput:focus {
  color: #fff;
 border:1px solid rgba(16,199,150,1);
}
.write-title {
  height: 56px;
  line-height: 56px;
}
.ques {
  padding-top: 20px;
}
.sure {
  color: aliceblue;

  margin-top: 48px;
  display:block;
  width:212px;
height:44px;
/* border: 1px solid #fff; */
  background:rgba(99,98,102,1);
border-radius:4px;
}
.sure1 {
  color: aliceblue;
  margin-top: 48px;
  display:block;
  width:212px;
height:44px;
/* border: 1px solid #fff; */
  background:#10C796;
border-radius:4px;
}
.maskListLeft {
  display: inline-block;
  margin-bottom: 16px;
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(102,102,102,1);
}
.maskListRight {
  margin-bottom: 16px;
  display: inline-block;
  max-width: 394px;
   word-wrap: break-word; word-break: normal;
  font-size:14px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(26,26,26,1);
}
.cancel {
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(255,255,255,1);
  background:rgba(179,179,179,1);
}
.send {
  margin-left: 15px;
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(255,255,255,1);
  background:rgba(16,199,150,1);
border-radius:4px;
}

</style>  