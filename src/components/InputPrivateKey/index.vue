<template>
  <div class="shuru">
    <input
      :type="inputType"
      class="pube"
      :style="{ width: inputWidth+'px' }"
      :value="value"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    >
    <img
      v-if="copy"
      src="./img/copy@2x.png"
      class="copy"
      title="复制"
      v-clipboard:copy="data"
      v-clipboard:success="onCopy"
    >
    <img v-if="eye" :src="eyeState" alt class="keyImg" @click="show">
  </div>
</template>
<script>
import showIcon from "./img/showIcon.png";
import hiddenIcon from "./img/hiddenIcon.png";
export default {
  props: { placeholder: String, value: String, copy: Boolean, eye: Boolean, disabled: Boolean},
  data() {
    return {
      eyeState: hiddenIcon,
      inputType: "password",
      data: "",
      inputWidth: 300
    };
  },
  mounted: function() {
    //根据传入参数调整宽度
    const { copy, eye } = this;
    this.inputType = eye ? "password" : "text";

    if (copy && eye) {
      this.inputWidth = 600;
    } else if (copy || eye) {
      this.inputWidth = 620;
    } else {
      this.inputWidth = 668;
    }
  },
  methods: {
    updateValue(value) {
      this.data = value; 
      this.$emit("input", value);
    },
    show() {
      if (this.eyeState == showIcon) {
        this.eyeState = hiddenIcon;
        this.inputType = "password";
      } else {
        this.eyeState = showIcon;
        this.inputType = "text";
      }
    },
    onCopy: function(e){
      alert("复制成功");
    }
  }
};
</script>
<style lang="scss">
.shuru {
  display: inline-block;
  width: 668px;
  height: 36px;
  background: #212121;
  .pube {
    margin: 0;
    padding-left: 10px;
    width: 593px;
    height: 36px;
    background: #1e2430;
    border: none;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #01e3b5;
  }
  .pube:focus {
    border: 1px solid #10c796;
  }
  .keyImg,
  .copy {
    width: 22px;
    height: 22px;
    padding-top: 9px;
    padding-right: 5px;
    float: right;
  }
  .keyImg:hover {
    cursor: pointer;
  }
}
</style>