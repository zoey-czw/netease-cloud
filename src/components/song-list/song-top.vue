<template>
  <div class="songTop-view" @click="routerToAction" ref="songTop">
    <i class="iconfont icon-fanhui"></i>
    <span v-if="isShow">{{title}}</span>
    <div>
      <span v-if="!isShow">{{songTitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    };
  },
  props: {
    title: String,
    scrollY: Number,
    songTitle: String
  },
  watch: {
    scrollY(val) {
      // 开始动画
      const scaleImg = (parseInt(val * 100) / 20000).toFixed(1);


      // console.log(scaleImg);
        let scale = parseInt((Math.abs(val) / 200) * 100) / 100;
        if (scale.toFixed(1) <= 1) {
          this.isShow = false;
          this.TopElem.style.backgroundColor = "rgba(212, 68, 57," + scale + ")";
          if (scale.toFixed(1) <= 0.3) {
            this.TopElem.style.backgroundColor = "rgba(212, 68, 57,0)";
            this.isShow = true;
          }
        }
    }
  },
  methods: {
    routerToAction() {
      let routePath = this.$route.matched[1].path;
      this.$router.push({ path: routePath });
    }
  },
  mounted() {
    //   console.log(this.$refs.songTop.clientHeight);
    this.topHeight = this.$refs.songTop.clientHeight; //获取顶部高度
    this.TopElem = this.$refs.songTop; //获取顶部DOM元素
  }
};
</script>
<style lang="scss">
.songTop-view {
  position: fixed;
  padding: 0px 10px 5px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: rgb(241, 241, 241);
  background-color: rgba(212, 68, 57, 0);
  i {
    width: 20px;
    line-height: 40px;
    z-index: 10;
  }
  span {
    margin-left: 4px;
    width: 100%;
  }
  > div {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    overflow: hidden;
    span {
      @keyframes moved {
        30% {
          left: 50%;
        }
        60% {
          left: 0%;
        }
        100% {
          left: -50%;
        }
      }
      position: absolute;
      width: max-content;
      left: 100%;
      animation: moved 6s linear infinite;
    }
  }
}
</style>
