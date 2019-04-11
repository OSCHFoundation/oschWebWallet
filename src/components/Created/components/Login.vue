<template>
  <div class="main-inner">
    <div class="main-header">登录钱包</div>
    <div class="innerList">
      <p>请务必小心确保您的计算机是安全的，不要在不信任的计算机上输入私钥，以防丢失钱包资产。</p>
      <InputPrivateKey placeholder="输入钱包私钥" v-model="secret"/>
      <CheckoutServer v-model="agree"/>
      <button :class="{btn: true, btnActive: agree}" :disabled="agree" @click="login">登录钱包</button>
      <span class="wellat" @click="refresh">创建钱包</span>
    </div>
  </div>
</template>
<script>
import InputPrivateKey from "@/components/inputPrivateKey";
import CheckoutServer from "./CheckoutServer";
export default {
  components: {
    InputPrivateKey,
    CheckoutServer
  },
  data() {
    return {
      secret: "",
      agree: false
    };
  },
  watch: {},
  methods: {
    refresh() {},
    login() {}
  }
};
</script>
