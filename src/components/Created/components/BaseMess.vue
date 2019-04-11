<template>
  <div class="main-inner" >
    <div class="main-header">创建新的钱包</div>
    <div class="innerList">
      <p>创建帐户密钥对</p>
      <p>要开始使用open wallet 钱包，您必须首先创建一个密钥对。 密钥对由两部分组成：</p>
      <strong class="wei">公钥</strong>
      <p>公钥用于标识帐户。 它也被称为帐户。 该公钥用于接收资金。</p>
      <strong class="wei">私钥</strong>
      <p>密钥用于访问您的帐户并进行交易。 保持此代码的安全。 拥有该代码的任何人都可以完全访问该帐户和资金。 如果您丢失了密钥，您将无法再访问资金，也没有恢复机制。</p>
      <CheckoutServer v-model="agree"/>
    </div>
    <div class="butn">
      <button :class="{btn: true, btnActive: agree}" :disabled="!agree" @click="changePage(router.REGISTER)">创建钱包</button>
      <span class="wellat" @click="changePage(router.LOGIN)">已有钱包</span>
    </div>
  </div>
</template>
<script>
import CheckoutServer from "./CheckoutServer";
export default {
  props: ['router'],
  data() {
    return {
      agree: false
    };
  },
  components: {
    CheckoutServer
  },
  methods: {
    changePage: function(page) {
      this.$emit('switchPage', page);
    },
    show: function() {}
  }
};
</script>