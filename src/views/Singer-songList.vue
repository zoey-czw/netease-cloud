<template>
  <div class="singerSongList-view subpage">
    <!-- 歌单顶部 -->
    <div class="songTop-view" @click="routerToAction">
      <i class="iconfont icon-fanhui"></i>
      <span>{{songData.authorName}}</span>
    </div>
    <!-- 歌手头部背景部分 -->
    <div class="singerSongList-main">
      <div class="mask"></div>
      <img :src="songData.authorrImg" alt="加载失败" ref="bgmImg">
    </div>

    <app-scroll
      class="content1"
      :isScrollX="false"
      :isScrollY="true"
      :isGetScrollY="true"
      @getScroll="getScroll"
    >
      <div class="song-listWrap">
        <div class="box">
          <!-- 收藏 -->
          <div class="collection" ref="collections">
            <i class="iconfont icon-tianjia"></i>
            <span>收 藏</span>
          </div>
        </div>
        <div class="payAllBtm">
          <div>
            <i class="iconfont icon-bofang"></i>
            <div>
              <span>播放全部</span>
              <span>(共{{songData.length}}首)</span>
            </div>
          </div>
        </div>
        <!-- 歌曲列表 -->
        <Song-list :songListData="songData.newData" class="songList"/>
      </div>
    </app-scroll>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SongTop from "../components/song-list/song-top";
import SongList from "../components/song-list/song-list";
export default {
  data() {
    return {};
  },
  components: {
    SongTop,
    SongList
  },
  computed: {
    ...mapState({
      songData: state => state.singer.songData
    })
  },
  mounted() {
    this.$store.dispatch("singer/getSongData", {
      id: this.$route.params.id
    });
  },
  methods: {
    //路由跳转
    routerToAction() {
      let routePath = this.$route.matched[1].path;
      this.$router.push({ path: routePath });
    },
    //获取滚动条
    getScroll(scrollY) {
      const scaleImg = parseInt(scrollY * 100) / 20000 + 1;
        // console.log(scaleImg);
      //   this.$refs.bgmImg.style.transform = scale(1);
      if (scrollY > 2) {
        this.$refs.bgmImg.style.transform = `scale(${scaleImg})`;
      } else if (scrollY < 0 && scaleImg>0) {
        this.$refs.collections.style.opacity = scaleImg;
      }
    }
  }
};
</script>
<style lang="scss" scopde>
.singerSongList-view {
  overflow: hidden;
}
.singerSongList-main {
  position: relative;
  width: 100%;
  height: 290px; //最小40
  background-color: #000;
  img {
    width: 100%;
    height: auto;
    transform: scale(1);
  }
  .mask {
    position: absolute;
    width: 100%;
    height: 290px;
    background-color: #000;
    opacity: 0.2;
  }
}
.content1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 40px;
  left: 0;
  .box {
    width: 100%;
    height: 245px;
    position: relative;
    .collection {
      width: 120px;
      line-height: 40px;
      text-align: center;
      background-color: #d44439;
      border-radius: 20px;
      color: #f1f1f1;
      font-size: 14px;
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 15px;
      left: 50%;
      margin-left: -60px;
      i {
        font-size: 14px;
      }
    }
  }
  .song-listWrap {
    width: 100%;
    height: 100%;
    // position: absolute;
    // top: 220px;
    .payAllBtm {
      background-color: #fff;
      width: 100%;
      height: 44px;
      padding: 0 14px;
      box-sizing: border-box;
      border-radius: 8px 8px 0 0;
      > div {
        height: 44px;
        border-bottom: 1px solid rgb(228, 228, 228);
        display: flex;
        align-items: center;
        i {
          font-size: 24px;
        }
        span:nth-of-type(1) {
          font-size: 16px;
          margin: 0 4px;
          color: #2e3030;
        }
        span:nth-of-type(2) {
          font-size: 12px;
          color: #bba8a8;
        }
      }
    }
    .songList {
      background-color: #fff;
    }
  }
}

// .songTop-view {
//   position: fixed;
//   padding: 0px 10px 5px;
//   height: 40px;
//   width: 100%;
//   z-index: 100;
//   display: flex;
//   align-items: center;
//   font-size: 16px;
//   color: rgb(241, 241, 241);
//   background-color: rgba(212, 68, 57, 0);
//   i {
//     width: 20px;
//     line-height: 40px;
//     z-index: 10;
//   }
//   span {
//     margin-left: 4px;
//     width: 100%;
//   }
// }
</style>
