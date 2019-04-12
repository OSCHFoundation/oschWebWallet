<template>
  <div class="main-inner">
    <div class="main-header">登录钱包</div>
    <div class="innerList">
      <p>请务必小心确保您的计算机是安全的，不要在不信任的计算机上输入私钥，以防丢失钱包资产。</p>
      <InputPrivateKey placeholder="输入钱包私钥" v-model="secret" eye/>
      <CheckoutServer v-model="agree"/>
      <button :class="{btn: true, btnActive: agree}" :disabled="!agree" @click="login">登录钱包</button>
      <span class="wellat" @click="changePage(router.BASEMESS)">创建钱包</span>
    </div>
  </div>
</template>
<script>
import InputPrivateKey from "@/components/inputPrivateKey";
import CheckoutServer from "./CheckoutServer";
import OschSdk from "osch-sdk";
export default {
  props: ["router"],
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
  methods: {
    changePage: function(page) {
      this.$emit("switchPage", page);
    },
    clearInput: function() {
      this.secret = "";
    },
    login() {
      const _this = this;
      const { StrKey, Network, Server, Keypair } = OschSdk;
      if (!StrKey.isValidEd25519SecretSeed(this.secret)) {
        this.$message.error("提示:您输入的私钥格式不正确或不符合格式，请确认后输入");
        this.clearInput();
        return;
      }
      if (this.secret === "") {
        this.$message.error("请输入私钥");
        this.clearInput();
        return;
      }
      OschSdk.Config.setAllowHttp(true);
      Network.use(new Network(_this.horizonSecret));
      _this.server = new Server(_this.horizonUrl);
      var keypair = Keypair.fromSecret(_this.secret);
      _this.publicKey = StrKey.encodeEd25519PublicKey(keypair.rawPublicKey());
      _this.server
        .loadAccount(_this.publicKey)
        .then(function(account) {
          _this.$message({
            message: "登入成功",
            type: "success"
          });
          const userPr = JSON.stringify({
            priv: _this.secret,
            pub: _this.publicKey
          });
          sessionStorage.userPr = userPr;
          _this.$router.push("/inner/" + _this.publicKey);
        })
        .catch(err => {
          console.log(err);
          _this.$message({
            message: "账户错误请重新输入",
            type: "success"
          });
        });
    }
  }
};
</script>
