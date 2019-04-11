<template>
  <div class="checkoutServer">
    <img src="@/assets/img/set.png" alt class="img" @click="setType" v-show="!agree">
    <img src="@/assets/img/set1.png" alt class="img" @click="setType" v-show="agree">
    <span class="word">
      我已仔细阅读并同意
      <router-link to="/service" class="set">服务及隐私条款</router-link>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      agree: false
    };
  },
  mounted: () => {},
  methods: {
    setType: function() {
      this.agree = !this.agree;
      this.$emit("input", this.agree);
    }
  }
};
</script>
<style  lang="scss">
.checkoutServer {
  margin-top: 40px;
  img {
    width: 22px;
    height: 22px;
  }
  .word {
    padding-left: 8px;
    color: #808080;
    font-size: 16px;
  }
  .set {
    color: #01e3b5;
  }
}
</style>