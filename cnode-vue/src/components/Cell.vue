<template lang="html">
  <!-- <a :href="href" class="mint-cell"> -->
  <router-link class="mint-cell" :to="to">
    <span class="mint-cell-mask" v-if="isLink"></span>
    <div class="mint-cell-left">
      <slot name='left'></slot>
    </div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <slot name="icon">
          <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="mint-cell-text" v-text="title"></span>
          <span class="mint-cell-label" v-text="label" v-if="label"></span>
        </slot>
      </div>
      <div class="mint-cell-value" :class="{'is-link' : isLink}">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
    </div>
    <div class="mint-cell-right">
      <slot name="right"></slot>
    </div>
    <i v-if="isLink" class="mint-cell-allow-right"></i>
  <!-- </a> -->
  </router-link>
</template>

<script>
export default {
  name: 'mt-cell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  }
}
</script>

<style lang="css">
.mint-cell {
    background-color:#fff;
    box-sizing:border-box;
    color:inherit;
    min-height:45px;
    display:block;
    overflow:hidden;
    position:relative;
    text-decoration:none;
}
.mint-cell img {
    vertical-align:middle;
}
.mint-cell:first-child .mint-cell-wrapper {
    background-origin:border-box;
}
.mint-cell:last-child {
    background-image:-webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image:linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size:100% 1px;
    background-repeat:no-repeat;
    background-position:bottom;
}
.mint-cell-wrapper {
    background-image:-webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: content-box;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
}
.mint-cell-mask {}
.mint-cell-mask::after {
    background-color:#000;
    content:" ";
    opacity:0;
    top:0;
    right:0;
    bottom:0;
    left:0;
    position:absolute;
}
.mint-cell-mask:active::after {
    opacity:.1;
}
.mint-cell-text {
    vertical-align: middle;
}
.mint-cell-label {
    color: #888;
    display: block;
    font-size: 12px;
    margin-top: 6px;
}
.mint-cell-title {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
}
.mint-cell-value {
    color: #888;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.mint-cell-value.is-link {
    margin-right:24px;
}
.mint-cell-left {
    position: absolute;
    height: 100%;
    left: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
}
.mint-cell-right {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
}
.mint-cell-allow-right::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top:50%;
    right:20px;
    position: absolute;
    width:5px;
    height:5px;
    -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
}
</style>
