<template>
  <div class="miniPlayer-view" @click="showPlayerPanelAction">
    <!-- mini播放器左侧内容 -->
    <div class="miniPlay-l">
      <img :src="songSrcListData.picUrl" alt="加载失败">
      <div class="miniPlay-mess">
        <div class="title">{{songSrcListData.name}}</div>
        <div class="author">{{songSrcListData.author}}</div>
      </div>
    </div>
    <div class="miniPlay-r">
      <i class="iconfont icon-bofang1" @click.stop="playSongs"></i>
      <i class="iconfont icon-liebiao" @click.stop="showMiniPanelAction"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // title: '我在昨天的梦里又看见了你',
      // author: '枯木逢春'
    };
  },
  props: {
    songSrcListData: {
      type: [Object],
      default: () => {
        return {
          name: '歌名',
          author: '作者',
          picUrl: "/music.png",
        };
      }
    }
  },
  methods: {
    // 展示normal歌曲播放界面
    showPlayerPanelAction() {
      // console.log(1);
      //展开normal歌单面板
      this.$emit("showNormalBgImg", true);
    },
    // 播放歌曲
    playSongs() {
      console.log(2);
    },
    // 展示mini歌单界面
    showMiniPanelAction() {
      console.log(3);
    }
  }
};
</script>

<style lang="scss">
.miniPlayer-view {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid #fff;
  .miniPlay-l {
    display: flex;
    align-items: center;
    height: 100%;
    width: 70%;
    box-sizing: border-box;
    padding-left: 18px;
    > img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .miniPlay-mess {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 6px 0 6px 6px;

      color: #2e3030;
      font-size: 14px;
      .author {
        color: #bba8a8;
        font-size: 13px;
      }
    }
  }
  .miniPlay-r {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      font-size: 28px;
      color: #d44439;
    }
  }
}
</style>
