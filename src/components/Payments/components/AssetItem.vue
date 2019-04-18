<template>
  <div class="coin" @click="payOsch">
    <div class="coin-left">
      <img :src="selectType =='OSCH' ? yc :xianshi" width="22" height="22">
    </div>
    <div class="coin-right">
      <div class="coinImg">
        <img src="../../../static/img/u15.png" width="40" height="40">
      </div>
      <div class="coinInner">
        <strong class="stron">OSCH</strong>
      </div>
      <span class="balance1">{{oschNum | numFilter}}</span>
    </div>
  </div>
</template>
