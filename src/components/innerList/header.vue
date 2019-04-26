<template>
  <div v-bind:class="{header:backgound1==1,header1:backgound1 ==2}">
    <div class="mask" v-show="number == 0">
      <div class="maskBackground">
        <div class="close" @click="close">
          <img src="@/assets/img/cancel@2x.png" width="16" height="16" alt>
        </div>
        <p class="code-title">下载App</p>
        <div class="code" id="qrcode3"></div>
      </div>
    </div>
    <img class="logo" src="@/assets/img/logo.png" width="180" height="40" @click="back">
    <div class="headerList">
      <ul>
        <li @click="numb(3)">
          <span @click="download">下载App</span>
        </li>
        <li v-bind:class="{butn:li1==1}" @click="numb(1)">
          <router-link to="/help" :class="{font:true,co:clas ==1}">帮助</router-link>
        </li>
        <li v-bind:class="{butn:clas==2}" @click="numb(2)" v-if="this.login == 3">
          <router-link to="/created" :class="{font:true,co:clas == 2}">创建/登录</router-link>
        </li>
        <li v-bind:class="{butn:li1==2,imghover:true}" v-if="login == 2" >
          <img src="@/assets/img/index_tx@2x.png" width="32" height="32" class="Personal">
           <ol class="PersonalCenter">
          <li @click="come">我的钱包</li>
          <li  @click="out" >
          <span class="outin">退出</span>
          </li>
        </ol>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from "../../config"
import QRCode from "qrcodejs2";
export default {
  components: {},
  props: {},
  data() {
    return {
      backgound1: 1,
      number: 2,
      li1: 0,
      login: 1,
      clas: 0,
      path: this.$route.fullPath
      // user:JSON.parse(sessionStorage.user)
    };
  },
  methods: {
    qrcode3() {
      let qrcode3 = new QRCode("qrcode3", {
        width: 200,
        height: 200,
        text:
          "https://oschpublicchain.oss-cn-shanghai.aliyuncs.com/OpenWalletAndriod",
        colorDark: "#000",
        colorLiht: "#fff"
      });
    },
    back() {
      try {
        let userPr = JSON.parse(sessionStorage.userPr);
        this.$router.push("/inner/" + userPr.pub);
      } catch (err) {
        this.$router.push("/created/");
      }
    },
    getHelp() {
      this.li = 1;
    },
    come() {
      try {
        let userPr = JSON.parse(sessionStorage.userPr);
        this.$router.push("/inner/" + userPr.pub);
      } catch (err) {
        this.$router.push("/created/");
      }
      // this.clas = 4;
    },
    out() {
      sessionStorage.clear();
      this.li1 = 2;
      this.$router.push("/");
    },
    numb(num) {
      this.li = num;
    },
    download() {
      this.number = 0;
      // this.clas = 3;
    },
    close() {
      this.number = 1;
      // location.reload();
    }
  },
  watch: {
    uesr: function(newString, oldString) {}
  },
  mounted() {
    this.qrcode3();
    // console.log(user);
    if (this.path == "/help") {
      this.li1 = 1;
      this.clas = 1;
      const f = () => JSON.parse(sessionStorage.userPr);
      Promise.resolve()
        .then(f)
        .catch(err => {
          this.li1 = 1;
          this.login = 3;
          this.clas = 1;
        });
      let user = JSON.parse(sessionStorage.userPr);
      if (user == "") {
        this.clas = 2;
        this.li1 = 2;
      } else {
        this.login = 2;
        // this.clas = 4;
      }
    } else if (this.path == "/created") {
      this.clas = 2;
      this.login = 3;
      this.backgound1 = 1;
    } else {
      this.login = 2;
      this.clas = 4;
      this.backgound1 = 2;
    }
    if (this.path == "/service") {
      this.clas = 5;
    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 22px;
  z-index: 999;
}
.header1 {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #141921;
  text-align: center;
  font-size: 22px;
}
.logo {
  position: absolute;
  left: 18px;
  top: 9px;
}
.headerList {
  margin-right: 32px;
  text-align: center;
  float: right;
  overflow: hidden;
}
.headerList ul li {
  height: 55px;
  line-height: 55px;
  margin: 0 22px;
  padding: 0 4px 0 4px;
  display: inline-block;
}
.headerList ul li:hover {
  cursor: pointer;
}
.headerList ul li span {
  font-size: 16px;
  text-align: center;
  color: #b3b3b3;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0.5, 0.5, 0.5, 0.5);
}
.code {
  /* top: 30%; */
  z-index: 9999;
  background-repeat: no-repeat;
}
.butn {
  border-bottom: 2px solid #01e3b5;
}
.font {
  font-size: 16px;
  text-align: center;
  color: #b3b3b3;
}
.co {
  color: #01e3b5;
}
.close {
  position: absolute;
  padding: 4px;
  top: -20px;
  left: 60px;
  height: 20px;
  width: 20px;
  margin-left: 179px;
  border-radius: 50%;
  background: #585858;
}
.close:hover {
  cursor: pointer;
}
.close img {
  margin-top: 1px;
}
.maskBackground {
  padding: 14px;
  /* position: relative; */
  position: absolute;
  left: 45%;
  top: 40%;
  margin: -50px 0 0 -50px;
  width: 200px;
  height: 200px;
  background: #ffffff;
}
.code-title {
  padding-left: 70px;
  float: left;
  margin-top: -70px;
  font-size: 20px;
  font-family: MicrosoftYaHei;
  font-weight: 600;
  color: #e5e5e5;
}
.logo:hover {
  cursor: pointer;
}
.Personal {
  padding-top: 15px;
}
.Personal:hover ol {
  display: block;
}
.imghover:hover ol{
  display: block
}
.PersonalCenter {
  display: none;
  position: absolute;
  right: 5px;
  box-shadow:0px 0px 4px 0px rgba(22,22,23,1);
  
}
.headerList .PersonalCenter li {
  margin: 0;
  display: block;
  width: 118px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(230, 230, 230, 1);
  background: #141921
}
.headerList .PersonalCenter li:hover {
  background: #283242
}
.outin {
  font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color:rgba(230,230,230,1);
}
</style>