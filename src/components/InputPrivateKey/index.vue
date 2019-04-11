<template>
  <div class="shuru">
    <input
      :type="inputType"
      class="pube"
      id="siyao"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
    >
    <img
      v-if="false"
      src="@/assets/img/copy@2x.png"
      class="keyImg1"
      @click="copy('.keyImg1')"
      v-bind:data-clipboard-text="secret1"
      title="复制"
    >
    <img :src="eye" alt class="keyImg" @click="show">
  </div>
</template>
<script>
import showIcon from "./img/showIcon.png";
import hiddenIcon from "./img/hiddenIcon.png";
export default {
  props: { placeholder: String, value: String },
  data() {
    return {
      eye: hiddenIcon,
      inputType: "password"
    };
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    show() {
      if (this.eye == showIcon) {
        this.eye = hiddenIcon;
        this.inputType = "password";
      } else {
        this.eye = showIcon;
        this.inputType = "text";
      }
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
    width: 623px;
    height: 36px;
    /* background: #2c3e50;
                */
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
  .keyImg {
    width: 22px;
    height: 22px;
    padding-top: 9px;
    padding-right: 5px;
    float: right;
    overflow: hidden;
  }
  .keyImg:hover {
    cursor: pointer;
  }
}
</style>