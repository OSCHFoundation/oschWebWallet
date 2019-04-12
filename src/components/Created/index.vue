<template>
  <div class="created">
    <v-header></v-header>
    <div class="main">
      <BaseMess v-if="page==router.BASEMESS" @switchPage="switchPage" :router="router"/>
      <Register v-show="page==router.REGISTER" @switchPage="switchPage" :router="router" />  
      <Login v-show="page==router.LOGIN" @switchPage="switchPage" :router="router"/>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
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
    };
  },
  mounted() {

  },
  methods: {
    switchPage(page){
      this.page = page; 
    },
    showPrev() {
      if (this.number1 == 0) {
        this.showPre = "text";
        this.number1 = 1;
      }
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
  }
};
</script>
<style  lang="scss" src="./style.css"></style>