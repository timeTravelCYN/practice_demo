<template>
  <div class="app">
     <c-header v-if="headerShow" fixed :icon="iconType"></c-header>
     <transition name="fade" mode="out-in">
       <!-- <keep-alive> -->
         <router-view></router-view>
       <!-- </keep-alive> -->
     </transition>
  </div>
</template>

<script>

  import cHeader from './components/Cheader.vue'
  // import { mapActions } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        iconType: true,
        headerShow: true
      }
    },
    components : {
      cHeader
    },
    created() {
      if(this.$route.name === 'login') {this.headerShow = false}
      if(this.$route.name === 'detail') {this.iconType = false}
      if(this.$route.name === 'user') {this.iconType = false}
    },
    watch: {
      // '$route': 'hideMenuSlide'
    },
    methods: {
      // ...mapActions({setNavState: 'setNavState'}),
      // hideMenuSlide() {
      //   console.log('--------------' + this.iconType)
      //   this.setNavState(false)
      // }
    }
  }

</script>

<style lang="scss">
.app {
  overflow: hidden;
  height: 100%;
  min-height: calc(100vh);
  background:#fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all .2s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
