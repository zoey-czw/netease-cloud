<template>
  <div class="songHeader-view">
    <div class="headerWrap">
      <!-- 背景图 -->
      <img :src="topDetailData.coverImgUrl" alt="加载失败">
      <!-- 头部中间内容 -->
      <div class="songHeader-main">
        <!-- 歌单封面 -->
        <div class="coverImg">
          <img :src="topDetailData.coverImgUrl" alt="加载失败">
          <div>
            <span class="iconfont icon-headset"></span>
            <span>{{topDetailData.playCount|formatter}}</span>
          </div>
        </div>
        <!-- 歌单右侧内容 -->
        <div class="coverImg-left">
          <h3>{{topDetailData.name}}</h3>
          <!-- 作者信息 -->
          <div class="author">
            <img :src="topDetailData.avatarUrl" alt="加载失败">
            <span>{{topDetailData.nickname}}</span>
          </div>
        </div>
      </div>
      <!-- 头部点赞/评论栏 -->
      <div class="moreList">
        <ul>
          <li v-for="(item,index) in moreListData" :key="index">
            <i :class="'iconfont'+' '+item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 播放全部/收藏 -->
      <div class="songHeader-bottom">
        <div class="play-all">
          <!-- 左侧 -->
          <div class="playAll-l">
            <i class="iconfont icon-bofang"></i>
            <span>播放全部</span>
            <span>(共{{topDetailData.trackCount}}首)</span>
          </div>
          <!-- 右侧 -->
          <div class="playAll-r">
            <i class="iconfont icon-tianjia"></i>
            <span>收藏({{topDetailData.subscribedCount|formatter}})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moreListData: [
        { icon: "icon-pinglun", name: "评论" },
        { icon: "icon-xihuan1", name: "点赞" },
        { icon: "icon-tianjia", name: "收藏" },
        { icon: "icon-youcecaidan", name: "更多" }
      ]
    };
  },
  props: {
    topDetailData: {
        type:  [Object,Array],
        default: {},
    }
  },
  mounted() {
    // this.$store.dispatch('songList/getSongListData',this.$router);
  },
  filters: {
    formatter(count) {
      if (count < 10000) {
        //低于一万
        return count;
      } else if (count < 10000 * 10000) {
        //低于一亿
        return Math.floor(count / 10000) + "万";
      } else {
        //大于一亿
        return Math.floor(count / 10000 / 10000) + "亿";
      }
    }
  }
};
</script>


<style lang="scss">
.headerWrap {
  position: relative;
  height: 300px;
  width: 100%;
  background-color: #ccc;
  > img {
    position: relative;
    height: 260px;
    width: 100%;
    filter: blur(20px);
  }
  //   头部中间内容
  .songHeader-main {
    position: absolute;
    width: 100%;
    top: 40px;
    left: 12px;
    display: flex;
    align-items: center;
    margin: 10px 0;
    // 歌单封面
    .coverImg {
      position: relative;
      width: 120px;
      height: 120px;
      > div {
        position: absolute;
        top: 0;
        right: 6px;
        color: #f1f1f1;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.3) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      > img {
        width: 120px;
        height: 120px;
      }
    }
    // 歌单封面右侧内容
    .coverImg-left {
      box-sizing: border-box;
      height: 120px;
      width: 100%;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 18px;
        color: #f1f1f1;
      }
      .author {
        img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }
        span {
          margin-left: 6px;
          color: #f1f1f1;
        }
      }
    }
  }
  // 头部点赞/评论栏
  .moreList {
    position: absolute;
    width: 100%;
    bottom: 50px;
    ul {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        color: #f1f1f1;
        font-size: 14px;
        i {
          font-size: 20px;
          margin-bottom: 4px;
        }
      }
    }
  }
  //播放全部/收藏
  .songHeader-bottom {
    position: absolute;
    height: 46px;
    width: 100%;
    bottom: 0px;
    background-color: #fff;
    color: #2e3030;
    border-radius: 8px 8px 0 0;
    .play-all {
      display: flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      // 左侧
      .playAll-l {
        margin-left: 8px;
        display: flex;
        align-items: center;
        i {
          font-size: 20px;
          margin-right: 8px;
        }
        span:nth-of-type(1) {
          font-size: 16px;
        }
        span:nth-of-type(2) {
          font-size: 12px;
          margin-left: 4px;
          color: #bba8a8;
        }
      }
      // 右侧
      .playAll-r {
        background-color: #d44439;
        color: #f1f1f1;
        font-size: 14px;
        height: 100%;
        width: 130px;
        border-radius: 8px 8px 0 0;
        box-sizing: border-box;
        padding: 0 8px;
        display: flex;
        align-items: center;
        span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
