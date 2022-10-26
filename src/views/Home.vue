<template>
  <div class="home-view">
    <div class="home">
      <div class="home-top">
        <i class="iconfont icon-caidan"></i>
        <span>云音悦</span>
        <i class="iconfont icon-41"></i>
      </div>
      <div class="home-main">
        <router-link to="/recommend">
          <span>推荐</span>
        </router-link>
        <router-link to="/singers">
          <span>歌手</span>
        </router-link>
        <router-link to="/rank">
          <span>排行榜</span>
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Player v-show="showPlayer"/>
  </div>
</template>

<script>
import Player from "./Player";
import { mapState } from "vuex";

export default {
  components: {
    Player
  },
  computed: {
    ...mapState({
      showPlayer: state => state.player.showPlayer //作为player开关判断
    })
  },
};
</script>

<style lang="scss">
@import "../assets/global-style.scss";
html {
  touch-action: none;
}
.home-top {
  background-color: $theme-color;
  color: $font-color-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  height: 40px;
  padding: 5px 10px;
  i {
    font-size: 25px;
  }
}
.home-main {
  background-color: $theme-color;
}
.home-main {
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $theme-color;
  span {
    height: 40px;
    color: $font-color-light;
    font-size: $font-size-m;
    line-height: 40px;
    padding: 3px 0;
  }
  .router-link-active {
    font-weight: 700;
    span {
      border-bottom: 2px solid $font-color-light;
    }
  }
}
.page {
  width: 100%;
  position: absolute;
  top: 90px;
  left: 0;
  bottom: 0;
}
.subpage {
  position: absolute;
  width: 100%;
  top: -90px;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
</style>
