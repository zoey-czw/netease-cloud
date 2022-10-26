<template>
  <div class="normalPlayer-view">
    <!-- 底部背景图 -->
    <div class="bgmImgMask"></div>
    <img :src="songSrcListData.picUrl" class="backgroundImg">
    <!-- 头部 标题 -->
    <div class="normalPlayer-top" ref="top">
      <i class="iconfont icon-jiantou topIcon" @click="closePlayerPanelAction"></i>
      <div class="title">{{songSrcListData.name}}</div>
    </div>
    <!-- 中间 唱片 -->
    <div class="normalPlayer-main">
      <div class="scaleBox" ref="scaleBox">
        <img src="/sing.png" alt="加载失败">
        <div class="poster">
          <img :src="songSrcListData.picUrl" alt>
        </div>
        <div class="songWord">我唱的不够动人，你别皱眉</div>
      </div>
    </div>

    <div class="normalPlayer-bottom">
      <!-- 倍速听歌 -->
      <div class="speed">
        <span>倍速听歌</span>
        <span v-for="item in playNum" :key="item">x {{item}}</span>
      </div>
      <!-- 控制栏 -->
      <div class="control-Wrap">
        <!-- 控制条 -->
        <div class="control-top">
          <span>0:00</span>
          <!-- 总进度条 -->
          <div class="control-bar">
            <!-- 后面得小尾巴进程 -->
            <div class="progress"></div>
            <!-- 进度圆点 -->
            <!-- <div class="progress-dotWrap"> -->
            <div class="progress-dot"></div>
            <!-- </div> -->
          </div>
          <span>4:00</span>
        </div>
        <!-- 控制控件 -->
        <div class="control-btm">
          <span class="iconfont icon-shunxubofang"></span>
          <span class="iconfont icon-shangyiqu101"></span>
          <span class="iconfont icon-bofang1"></span>
          <span class="iconfont icon-xiayiqu101"></span>
          <span class="iconfont icon-liebiao"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import aniMixin from "./animation";
export default {
  props: {},
  mixins: [aniMixin],
  data() {
    return {
      title: "爱情转移",
      playNum: [0.75, 1, 1.25, 1.5, 2]
    };
  },
  props: {
    songSrcListData: {
      type: [Object],
      default: () => {
        return {
          name: "歌名",
          author: "作者",
          picUrl: "/music.png"
        };
      }
    }
  },
  methods: {
    closePlayerPanelAction() {
      this.$emit("closeNormalPanel"); //关闭normalPanel
    }
  },
  mounted() {
    //   console.log(this.getPositionAndScale());
    //偏移坐标
    // this.$refs.scaleBox.style.transform = `translate(${-originX}px, ${originY}px)  scale(0.1)`;
    // this.$refs.scaleBox.style.transition = '1s'
  }
};
</script>


<style lang="scss">
.normalPlayer-view {
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  color: #bbb;
  overflow: hidden;
  // 背景图
  .bgmImgMask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.2;
    top: 8%;
  }
  .backgroundImg {
    position: absolute;
    filter: blur(20px);
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  //头部标题
  .normalPlayer-top {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    color: #333;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    > i {
      font-size: 16px;
      margin: 0 8px;
      transform: rotateZ(90deg);
    }
    > div {
      font-size: 14px;
    }
  }
  //中间唱片
  .normalPlayer-main {
    position: absolute;
    top: 8%;
    left: 0;
    bottom: 120px;
    width: 100%;
    .scaleBox {
      margin: auto;
      position: absolute;
      width: 100%;
      top: 0px;
      bottom: 0px;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      overflow: hidden;
      //   transition: 1s;
      //   transform: scale(0.1);
      > img {
        position: absolute;
        top: -5.8vw;
        left: 48vw;
        width: 25vw;
        height: 40vw;
        z-index: 100;
        transform-origin: 4.5vw 4.5vw;
        transition: all 0.3s ease 0s;
        transform: rotate(-30deg);
      }
      // 唱片
      .poster {
        top: 16%;
        position: absolute;
        width: 70%;
        height: 70vw;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #000;
        z-index: 10;
        > img {
          width: 68%;
          height: 68%;
          border-radius: 50%;
        }
      }
      // 歌词
      .songWord {
        position: absolute;
        margin: auto;
        width: 80%;
        top: 88%;
        font-size: 14px;
        line-height: 20px;
        white-space: normal;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  //底部
  .normalPlayer-bottom {
    width: 100%;
    height: 120px;
    position: absolute;
    bottom: 2%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //倍速听歌
    .speed {
      width: 100%;
      height: 25%;
      padding: 0 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #bba8a8;
      font-size: 12px;
      span {
        border: 1px solid transparent;
        padding: 6px;
        border-radius: 40%;
      }
    }
    //控制栏
    .control-Wrap {
      //顶部歌曲控制条
      .control-top {
        width: 80%;
        height: 41%;
        padding: 10px 0;
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #2e3030;
        // 总进度条
        .control-bar {
          position: relative;
          width: 80%;
          height: 4px;
          background: rgba(0, 0, 0, 0.3);
          //进程
          .progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 0; //进程控制
            height: 4px;
            background: #d44439;
          }
          //进度圆点
          .progress-dot {
            position: absolute;
            top: -6px;
            left: 0; //圆点控制
            height: 16px;
            width: 16px;
            box-sizing: border-box;
            background-color: #d44439;
            border-radius: 50%;
            border: 3px solid rgb(228, 228, 228);
          }
        }
      }
      //控制控件
      .control-btm {
        width: 100%;
        height: 42%px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        padding: 8px 20px;
        span {
          font-size: 30px;
          color: #2e3030;
        }
      }
    }
  }
}
</style>
