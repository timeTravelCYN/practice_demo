<template lang="html">
  <div class="me">
    <div class="authorInfo">
      <img v-if="userInfo.avatar_url"  :src="userInfo.avatar_url" class="authorInfo-avatar">
      <img src="~assets/timg.jpg" v-else class="authorInfo">
      <p class="authorInfo-nickname">{{userInfo.loginname}}</p>
    </div>
    <div class="me-item">
      <mt-cell title="我的消息" isLink :to="{name: 'message'}">
        <i slot="icon" class="iconfont icon-xiaoxi"></i>
      </mt-cell>
      <mt-cell title="发布主题" is-link :to="{name: 'post'}">
        <i slot="icon" class="iconfont icon-fabu"></i>
      </mt-cell>
      <mt-cell title="关于" is-link :to="{name: 'about'}">
        <i slot="icon" class="iconfont icon-about2"></i>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import MtCell from '../components/cell.vue'
import { mapState } from 'vuex'
export default {
  name: 'me',
  components: {
    MtCell
  },
  computed: mapState({
      userInfo:state => state.user.userInfo
   })
}
</script>

<style lang="css">
  .me{
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
    top: 0;
    left: 0;
  }
  .authorInfo{
    margin-top: 43px;
    position: relative;
    width: 100%;
    height: 150px;
    background: #444;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .authorInfo-avatar{
    display: block;
    width: 80px;
    height: 80px;
    margin: 10px;
    margin-top: 25px;
    border-radius: 50%;
  }
  .authorInfo-nickname{
    color:　#ffffff;
    font-size: 14px;
  }
  .me-item .iconfont{
    font-size: 22px;
    color: #80bd01;
    vertical-align: middle;
  }
</style>
