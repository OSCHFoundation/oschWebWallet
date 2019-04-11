<template>
  <div class="main-inner">
    <div class="main-header">备份钱包</div>
    <div class="innerList">
      <p>1、钱包私钥用于恢复钱包资产，拥有私钥即可完全控制钱包资产，Open wallet不保存它，如果丢失则无法帮助您恢复它。</p>
      <p>2、请务必小心确保您的计算机是安全的，不要在不信任的计算机上运行</p>
      <span class="impor">保持私钥安全,这个私钥只会向您显示一次。</span>
    </div>
    <div class="key">
      <span class="address">公钥:</span>
      <InputPrivateKey placeholder="输入钱包公钥匙" eye copy />
      <!-- <div class="shuru">
        <input type="text" class="pube" v-model="publicKey" id="gongyao" title="显示/隐藏">
        <img
          src="@/assets/img/copy@2x.png"
          width="22"
          height="22"
          class="keyImg"
          @click="copy('.keyImg')"
          data-clipboard-target="#gongyao"
          title="复制"
        >
      </div> -->
    </div>
    <div class="key">
      <span class="address">私钥:</span>
      <InputPrivateKey  placeholder="输入钱包私钥" />
      <!-- <div class="shuru">
        <input :type="inputType" class="pube" id="siyao" v-model="secret1">
        <img
          src="@/assets/img/copy@2x.png"
          width="22"
          height="22"
          class="keyImg1"
          @click="copy('.keyImg1')"
          v-bind:data-clipboard-text="secret1"
          title="复制"
        >
        <img :src="dianji" width="22" height="22" alt class="eye" @click="show">
      </div> -->
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
</template>
<script>
import InputPrivateKey from "@/components/inputPrivateKey";
export default {
  components: {
    InputPrivateKey  
  },
  data() {
    return {
      inputType: "text",
      publicKey: "",
      secret1: "",
      number: 0
    };
  },
  methods: {
    show1: function(){
      
    }
  }
};
</script>
