<template>
  <div class="created">
    <!-- <img src="../../static/img/denglu_tuxin@2x.png" width="40%" height="55%" alt="" class="login-img"> -->
    <v-header></v-header>
    <div class="main" v-show="page == 0">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">创建新的钱包</div>
          <div class="innerList">
            <p>创建帐户密钥对</p>
            <p>要开始使用open wallet 钱包，您必须首先创建一个密钥对。 密钥对由两部分组成：</p>
            <strong class="wei">公钥</strong>

            <p>公钥用于标识帐户。 它也被称为帐户。 该公钥用于接收资金。</p>
            <strong class="wei">私钥</strong>
            <p>密钥用于访问您的帐户并进行交易。 保持此代码的安全。 拥有该代码的任何人都可以完全访问该帐户和资金。 如果您丢失了密钥，您将无法再访问资金，也没有恢复机制。</p>
            <div class="service">
              <img
                src="../../static/img/set.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==0"
              >
              <img
                src="../../static/img/set1.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==1"
              >
              <span class="agree">我已仔细阅读并同意
                <router-link to="/service" tag="a" class="set">服务及隐私条款</router-link>
              </span>
            </div>
          </div>

          <div class="butn">
            <button
              :class="{btn:number2==0,btn2:number2 ==1}"
              @click="changePage"
              v-bind:disabled="number2==0"
            >创建钱包</button>
            <span class="wellat" @click="show1">已有钱包</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-show="page==1">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">备份钱包</div>
          <div class="innerList">
            <p>1、钱包私钥用于恢复钱包资产，拥有私钥即可完全控制钱包资产，Open wallet不保存它，如果丢失则无法帮助您恢复它。</p>
            <p>2、请务必小心确保您的计算机是安全的，不要在不信任的计算机上运行</p>
            <span class="impor">保持私钥安全,这个私钥只会向您显示一次。 </span>
          </div>

          <div class="key">
            <span class="address">公钥:</span>
            <div class="shuru">
              <input type="text" class="pube" v-model="publicKey" id="gongyao" title="显示/隐藏">
              <img
                src="../../static/img/copy@2x.png"
                width="22"
                height="22"
                class="keyImg"
                @click="copy('.keyImg')"
                data-clipboard-target="#gongyao"
                title="复制"
              >
            </div>
          </div>

          <div class="key">
            <span class="address">私钥:</span>
            <div class="shuru">
              <input :type="arrt" class="pube" id="siyao" v-model="secret1">
              <img
                src="../../static/img/copy@2x.png"
                width="22"
                height="22"
                class="keyImg1"
                @click="copy('.keyImg1')"
                data-clipboard-target="#siyao"
                title="复制"
              >
              <img :src="dianji" width="22" height="22" alt class="eye" @click="show">
            </div>
          </div>
          <div class="code">
            <div class="pub">
              <div class="code-pading">
                <div class="code2" id="qrcode1"></div>
              </div>
              <span class="er">公钥二维码</span>
            </div>
            <div class="prev">
              <div>
                <div class="mask" v-show="number == 0"></div>

                <div class="code-pading">
                  <div class="code2" id="qrcode2"></div>
                </div>

                <span class="er">私钥二维码</span>
              </div>
            </div>
          </div>
          <div class="jump">
            <button @click="show1" class="backups">我已备份</button>
            <!-- <button @click="show">显示/隐藏</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-show="page==2">
      <div class="main-inner">
        <div class="mian-left">
          <div class="main-header">登录钱包</div>
          <div class="innerList">
            <p>请务必小心确保您的计算机是安全的，不要在不信任的计算机上输入私钥，以防丢失钱包资产。</p>
            <div class="shuru">
              <input :type="arrt" class="pube" id="siyao" v-model="secret" placeholder="输入钱包私钥">
              <img :src="dianji" alt width="22" height="22" class="keyImg1" @click="show">
            </div>

            <div class="service">
              <img
                src="../../static/img/set.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==0"
              >
              <img
                src="../../static/img/set1.png"
                alt
                width="22"
                height="22"
                class="img"
                @click="setType"
                v-show="number2 ==1"
              >
              <span>我已仔细阅读并同意
                <router-link to="/service" class="set">服务及隐私条款</router-link>
              </span>
            </div>
            <button
              :class="{btn:number2==0,btn2:number2 ==1}"
              v-bind:disabled="number2==0"
              @click="login"
            >登录钱包</button>
            <span class="wellat" @click="refresh">创建钱包</span>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Clipboard from "clipboard";
import VHeader from "./innerList/header";
import VFooter from "./innerList/footer";
import xianshi from "../../static/img/xianshi.png";
import yc from "../../static/img/yingchang.png";
export default {
  components: {
    VHeader,
    VFooter
  },
  props: {},
  data() {
    return {
      arrt: "password",
      showPre: "password",
      number: 0,
      number1: 0,
      page: 0,
      secret1: "",
      secret: "",
      tips: false, //提示
      com: 1,
      publicKey: "",
      server: "",
      number2: 0,
      dianji: xianshi
    };
  },
  methods: {
    copy(weilei) {
      let clipboard = new Clipboard(weilei);
      clipboard.on("success", e => {
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        clipboard.destroy();
      });
    },
    setType() {
      if (this.number2 == 0) {
        this.number2 = 1;
      } else if (this.number2 == 1) {
        this.number2 = 0;
      }
    },
    login() {
      try {
        let strkey = StellarSdk.StrKey;
        let arrPrivate = strkey.decodeEd25519SecretSeed(this.secret);
      } catch (err) {
        this.tips = true;
      }

      if (this.secret === "") {
        alert("请输入私钥");
        location.reload();
      } else if (this.tips == true) {
        alert("提示:您输入的私钥格式不正确或不符合格式，请确认后输入）");
        location.reload();
      } else if (this.tips == false) {
       
        var _this = this;
        StellarSdk.Config.setAllowHttp(true);
        StellarSdk.Network.use(new StellarSdk.Network(_this.horizonSecret));
        _this.server = new StellarSdk.Server(_this.horizonUrl);
        var strkey = StellarSdk.StrKey;
        var arrPrivate = strkey.decodeEd25519SecretSeed(_this.secret);
        var keypair = new StellarSdk.Keypair({
          type: "ed25519",
          secretKey: arrPrivate
        });
        _this.publicKey = strkey.encodeEd25519PublicKey(keypair.rawPublicKey());
         let userPr = JSON.stringify({
          priv: _this.secret,
          pub:_this.publicKey
        });
        sessionStorage.userPr = userPr;
        _this.server
          .loadAccount(_this.publicKey)
          .then(function(account) {
            _this.$router.push("/inner/" +_this.publicKey);
          })
          .catch(err => {
            _this.$router.push("/inner/" + _this.publicKey);

            // alert('当前账户未激活，请激活后执行操作')
            // location.reload()
          });
      }
    },
    show1() {
      this.page = 2;
    },
    showPrev() {
      if (this.number1 == 0) {
        this.showPre = "text";
        this.number1 = 1;
      }
    },
    show() {
      if (this.number == 0) {
        this.dianji = yc;
        this.arrt = "text";
        this.number = 1;
      } else if (this.number == 1) {
        this.dianji = xianshi;
        this.arrt = "password";
        this.number = 0;
      }
    },
    refresh() {
      location.reload();
    },
    //生成二维码
    qrcode1() {
      let qrcode1 = new QRCode("qrcode1", {
        width: 100,
        height: 100,
        text: this.publicKey,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    qrcode2() {
      let qrcode2 = new QRCode("qrcode2", {
        width: 100,
        height: 100,
        text: this.secret1,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    changePage(event) {
      //  this.qrcode();
      if (event.target.innerHTML == "创建钱包") {
        this.page = 1;

      } else if (event.target.innerHTML == "登录钱包") {
        this.page = 2;
      }
      this.qrcode1();
      this.qrcode2();
    }
  },
  created() {
    var keypair = StellarSdk.Keypair.random();
    var strkey = StellarSdk.StrKey;
    this.publicKey = strkey.encodeEd25519PublicKey(keypair._publicKey);
    this.secret1 = strkey.encodeEd25519SecretSeed(keypair._secretSeed);
  },
  mounted() {
    this.page = 0;
  }
};
</script>
<style scoped>
.created {
  width: 100%;
  height: 100%;
  background: linear-gradient(#11151c, #222a38);
}
.main {
  margin: 0 auto;
  /* padding-top: 10%; */
  height: 798px;
  width: 1200px;
  background-image: url("../../static/img/login.png");
  background-size: 100% 100%;
}
.main-header {
  height: 32px;
  line-height: 32px;
  font-weight: bold;
  font-size: 32px;
  color: #f5f5f5;
}
.main-inner {
  padding-top: 10%;
  max-width: 603px;
  z-index: 100;
}
.mian-left {
  padding-top: 20px;
  z-index: 99;
}
.main-inner p {
  font-size: 16px;
  margin-bottom: 10px;
}
.innerList {
  margin-top: 56px;
  color: #dbdbdb;
}
.btn {
  color: #f5f5f5;
  font-size: 16px;
  margin-top: 48px;
  height: 43px;
  width: 212px;
  background: rgba(99, 98, 102, 1);
  border-radius: 4px;
  border: none;
}
.btn2 {
  color: #f5f5f5;
  font-size: 16px;

  margin-top: 53px;
  height: 43px;
  width: 212px;
  background: #10c796;
  border-radius: 4px;
  border: none;
}
.btn2:hover {
  cursor: pointer;
}
.impor {
  display: inline-block;
  margin: 12px 0;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(232, 73, 73, 1);
}
.wei {
  font-size: 16px;
  display: inline-block;
  margin-bottom: 10px;
}
.service {
  margin-top: 40px;
}
.wellat {
  margin-left: 86px;
  color: #ccc;
  font-size: 16px;
}
.wellat:hover {
  cursor: pointer;
}
.inpu {
  padding-left: 5px;
  letter-spacing: 1px;
  width: 715px;
  height: 36px;
  background: #4e4e4e;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 1);
  border: none;
  border-radius: 4px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(16, 199, 150, 1);
}

.prev {
  margin-top: 32px;
  display: inline-block;
}
.pub {
  margin-top: 20px;
  margin-right: 50px;
  display: inline-block;
}
.mask {
  position: absolute;
  z-index: 100;
  width: 116px;
  height: 116px;
  background: rgba(0, 0, 0, 0.94);
}
.set {
  color: #01e3b5;
}
.img:hover {
  cursor: pointer;
}
.address {
  margin-right: 10px;
  padding-left: 4px;
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #ccc;
}
.er {
  display: inline-block;
  margin-top: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(179, 179, 179, 1);
}
.backups {
  font-weight: 400;
  color: rgba(245, 245, 245, 1);
  margin-top: 26px;
  width: 212px;
  height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  border: none;
}
.backups:hover {
  cursor: pointer;
}
.inpu1 {
  margin-top: 24px;
  padding-left: 5px;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(16, 199, 150, 1);
  width: 690px;
  height: 48px;
  line-height: 48px;
  border: 1px solid rgba(16, 199, 150, 1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
.Sign {
  margin-top: 55px;
  width: 212px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  background: rgba(16, 199, 150, 1);
  border-radius: 4px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(245, 245, 245, 1);
}
.key {
  margin-top: 5px;
}

.shuru {
  display: inline-block;
  width: 668px;
  height: 36px;
  background: #212121;
}
.pube {
  margin: 0;
  padding-left: 3px;
  width: 630px;
  height: 36px;
  /* background: #2c3e50;
      */
  background: #1e2430;
  border: none;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #01e3b5;
}
.pube:focus{
  border: 1px solid #10c796
}
.keyImg {
  padding-top: 9px;
  padding-right: 5px;
  float: right;
  overflow: hidden;
}
.keyImg:hover {
  cursor: pointer;
}
.keyImg1 {
  padding-top: 9px;
  padding-right: 5px;
  float: right;
  overflow: hidden;
}
.keyImg1:hover {
  cursor: pointer;
}
.eye {
  position: absolute;
  margin-left: -35px;
  margin-top: 8px;
}
.eye:hover {
  cursor: pointer;
}
.code-pading {
  padding: 8px;
  background: #f5f5f5;
}
.login-img {
  position: absolute;
  top: 20%;
  right: 5%;
  overflow: hidden;
  /* z-index: 50 */
}
.agree {
  padding-left: 8px;
  color: #808080;
  font-size: 16px;
}
</style>