<template>
  <div class="app-scroll" ref="scroll">
    <div class="scrollWrap" :style="{width: wrapWidth}">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    change: Function,
    isScrollX: Boolean,
    isScrollY: Boolean,
    // 接收滚动视图的宽度
    width: {
      type: [String, Number],
      default: "100%"
    },
    getScroll: Function, //判断滚动，执行头部动画
    NOScrollY: Boolean,
    isGetScrollY: Boolean
  },
  computed: {
    // 计算最终宽度的样式
    wrapWidth() {
      if (typeof this.width === "string") {
        return this.width;
      } else {
        return this.width + "px";
      }
    }
  },
  mounted() {
    this.scroll = new IScroll(this.$refs.scroll, {
      scrollX: this.isScrollX,
      scrollY: this.isScrollY,
      click: true,
      tap: true,
      probeType: 3
      // scrollbars: true,
      // fadeScrollbars: true
    });
    this.scroll.on("beforeScrollStart", () => {
      this.scroll.refresh();
    });
    (this.NOScrollY || this.isGetScrollY) &&
      this.scroll.on("scroll", () => {
        this.$emit("getScroll", this.scroll.y);
        // console.log(this.scroll.y);
        // if(this.scroll.y >= -100) {
        //   this.scroll.scrollTo(0, 0, 300);
        // }
        if (this.NOScrollY) {
          if (this.scroll.y >= 0) {
            this.scroll.scrollTo(0, 0, 0);
          }
        }
      });
    this.change &&
      this.scroll.on("scroll", () => {
        if (Math.round(this.scroll.y) > 0) {
          this.change(true);
        } else {
          this.change(false);
        }
      });
  }
};
</script>
<style>
.app-scroll {
  overflow: hidden;
}
</style>
