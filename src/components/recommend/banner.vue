<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in bannerData" :key="index">
        <img :src="item" alt>
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
  </div>
</template>
<script>
import Swiper from "swiper/swiper-bundle.js";
import "swiper/swiper-bundle.css";

export default {
  props: {
    bannerData: Array
  },
  watch: {
    bannerData() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(".swiper-container", {
          autoplay: {
            delay: 1000 //1秒切换一次
          },
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  },
  mounted() {}
};
</script scoped>
<style lang="scss">
.swiper-container { 
  height: 160px;
  --swiper-theme-color: #d44439;
  span {
    width: 8px;
    height: 8px;
  }
}
.swiper-slide {
  background: linear-gradient(to bottom, #d44439 65%, #fff 65%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  img {
    // width: 367px;
    // height: 160px;
    width: 98%;
    height: 98%;
    border-radius: 4px;
  }
}
</style>
