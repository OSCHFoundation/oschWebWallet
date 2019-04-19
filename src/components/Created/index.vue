<template>
  <div class="created">
    <v-header></v-header>
    <div class="main">
      <BaseMess v-if="page==router.BASEMESS" @switchPage="switchPage" :router="router"/>
      <Register v-if="page==router.REGISTER" @switchPage="switchPage" :router="router" />  
      <Login v-if="page==router.LOGIN" @switchPage="switchPage" :router="router"/>
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
<style  lang="scss"  >
  @import "./style.scss";
</style>