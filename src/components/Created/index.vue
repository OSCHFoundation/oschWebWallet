<template>
  <div class="created">
    <v-header></v-header>
    <div class="main">
      <BaseMess v-if="page==router.BASEMESS" @switchPage="switchPage" :router="router"/>
      <Register v-show="page==router.REGISTER"/>  
      <Login v-show="page==router.LOGIN" :router="router"/>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import Clipboard from "clipboard";
import VHeader from "../innerList/header";
import VFooter from "../innerList/footer";
import Login from "./components/Login";
import Register from "./components/Register";
import BaseMess from "./components/BaseMess"
import xianshi from "@/assets/img/showIcon.png";
import yc from "@/assets/img/hiddenIcon.png";

export default {
  components: {
    VHeader,
    VFooter,
    Login,
    Register,
    BaseMess
  },
  props: {},
  data() {
    return {
      page: 'bassmess',
      router:{
        REGISTER: 'register',
        LOGIN: 'login',
        BASEMESS: 'bassmess'
      },
      arrt: "password",
      showPre: "password",
      number: 0,
      number1: 0,
      secret: "",
      tips: false, //提示
      com: 1,
      server: "",
      number2: 0,
      dianji: xianshi
    };
  },
  mounted() {

  },
  methods: {
    switchPage(page){
      this.page = page; 
    },
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
          pub: _this.publicKey
        });
        sessionStorage.userPr = userPr;
        _this.server
          .loadAccount(_this.publicKey)
          .then(function(account) {
            _this.$router.push("/inner/" + _this.publicKey);
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
  }
};
</script>
<style  lang="scss" src="./style.css"></style>