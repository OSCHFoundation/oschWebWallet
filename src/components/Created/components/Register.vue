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
      <InputPrivateKey v-model="publicKey" placeholder="输入钱包公钥匙" copy disabled/>
    </div>
    <div class="key">
      <span class="address">私钥:</span>
      <InputPrivateKey v-model="secret" placeholder="输入钱包私钥" eye copy disabled/>
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
          <div class="mask" v-show="number != 0"></div>
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
import QRCode from "qrcodejs2";
import OschSdk from "osch-sdk";
export default {
  props: ["router"],
  components: {
    InputPrivateKey
  },
  data() {
    return {
      inputType: "text",
      publicKey: "",
      secret: "",
      number: 0
    };
  },
  mounted: function() {
    //生成keypair
    this.createdKeypair();
    //生成公钥私钥二维码
    this.qrcode("qrcode1");
    this.qrcode("qrcode2");
  },
  methods: {
    createdKeypair() {
      var keypair = OschSdk.Keypair.random();
      var strkey = OschSdk.StrKey;
      this.publicKey = strkey.encodeEd25519PublicKey(keypair._publicKey);
      this.secret = strkey.encodeEd25519SecretSeed(keypair._secretSeed);
    },
    show1: function() {},
    //生成二维码
    qrcode(id) {
      new QRCode(id, {
        width: 100,
        height: 100,
        text: this.publicKey,
        colorDark: "#000",
        colorLiht: "#fff"
      });
    }
  }
};
</script>
