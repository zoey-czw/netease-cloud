<template>
  <div class="infinite-view" ref="scroll">
    <div class="infiniteWrap">
      <div ref="loading">
        <!-- 下拉刷新 -->
        <Loading :loadText="loadText"/>
      </div>
      <slot/>
      <div ref="loading">
        <!-- 下拉刷新 -->
        <Loading :loadText="loadText"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerListLoad: Boolean, //判断页面是否加载完成
    setshouldLoadData: Function //判断是否要请求数据
  },
  data() {
    return {
      loadText: "下拉刷新...",
      height: "",
      isPullDown: false
    };
  },
  computed: {
    setHeight() {
      return this.$refs.loading.offsetHeight;
    }
  },
  methods: {
    //关闭下拉刷新
    endPullUp() {
      this.scroll.scrollTo(0, -1 * this.height, 300);
      this.isPullDown = false;
    }
  },
  mounted() {
    // let height = this.$refs.loading.offsetHeight;
    this.height = this.setHeight;
    this.scroll = new IScroll(this.$refs.scroll, {
      tap: true,
      click: true,
      probeType: 3,
    });
    this.scroll.on("beforeScrollStart", () => {
      this.scroll.refresh();
    });
    this.scroll.scrollTo(0, -this.height, 0);
    this.scroll.on("scrollEnd", () => {
      //下拉刷新
      if (this.isPullDown) {
        return;
      }
      if (this.scroll.y >= 0) {
        this.isPullDown = true;
        this.setshouldLoadData(true); //需要请求数据
        if (this.singerListLoad) {
          this.scroll.scrollTo(0, -this.height, 0);
        }
      } else if (this.scroll.y < 0 && this.scroll.y > -this.height) {
        this.scroll.scrollTo(0, -this.height, 0);
        this.loadText = "下拉刷新...";
      }
      //上拉加载更多
      if (
        this.scroll.y > this.scroll.maxScrollY &&
        this.scroll.y < this.scroll.maxScrollY + this.height
      ) {
        this.scroll.scrollTo(0, this.scroll.maxScrollY + this.height, 0);
      } else if (this.scroll.y <= this.scroll.maxScrollY) {
        //请求加载更多数据
        if (this.singerListLoad) {
          this.scroll.scrollTo(0, this.scroll.maxScrollY + this.height, 300);
        }
        this.$emit("getMoreData");
      }
    });

    //滚动检测
    this.scroll.on("scroll", () => {
      if (this.isPullDown) {
        return;
      }
      //下拉刷新
      if (this.scroll.y >= 0) {
        this.loadText = "松开刷新...";
        if (this.singerListLoad) {
          this.loadText = "拼命加载中...";
        }
      } else if (this.scroll.y < 0 && this.scroll.y > -this.height) {
        this.loadText = "下拉刷新...";
      }
      // 上拉加载更多
      if (
        this.scroll.y > this.scroll.maxScrollY &&
        this.scroll.y <= this.scroll.maxScrollY + this.height
      ) {
        this.loadText = "上拉加载更多...";
      } else if (this.scroll.y < this.scroll.maxScrollY) {
        if (this.singerListLoad) {
          this.loadText = "拼命加载中...";
        }
        this.loadText = "松开加载更多...";
      }
    });
  }
};
</script>

<style scoped lang="scss">
.infinite-view {
  overflow: hidden;
}
</style>
