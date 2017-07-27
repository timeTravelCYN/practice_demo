<template lang="html">
  <div class="header">
    <div class="header-box" :class="{'is-fixed' : fixed}">
      <header class="header-logo clearfix">
        <i class="header-logo-menu iconfont icon-fenlei1" v-if="icon" @click="showMenuSlide"></i>
        <i class="header-logo-back iconfont icon-fanhui" v-if="!icon" @click="goHistory"></i>
        <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" class="logo-img">
      </header>
    </div>
    <menu-slide :show="leftNavStatus" @hideMenuSlide="hideMenuSlide"></menu-slide>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MenuSlide from './Menu.vue'
export default {
  props: {
    fixed: Boolean,
    icon: Boolean
  },
  computed: mapState({
    leftNavStatus: state => state.com.leftNavStatus
  }),
  methods: {
    ...mapActions ({setNavState: 'setNavState'}),
    showMenuSlide () {
      this.setNavState(true)
    },
    hideMenuSlide () {
      this.setNavState(false)
    },
    goHistory() {
      this.$router.go(-1)
    }
  },
  components: {
    MenuSlide
  }
}
</script>

<style lang="css">
  .is-fixed {
    position: fixed;
  }
  .header-box {
    width: 100%;
    top: 0;
    z-index: 1;
  }
  .header-logo {
    height: 43px;
    line-height: 43px;
    background: #444;
    text-align: center;
    position: relative;
  }
  .header-logo .header-logo-icon{
    font-size: 28px;
    color: #80bd01;
  }
  .header-logo .header-logo-menu,
  .header-logo-back {
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 20px;
    color: #fff;
  }
  .logo-img{
    width: 120px;
    vertical-align: middle;
  }
</style>
