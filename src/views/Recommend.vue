<template>
  <div class="recommend-view page" :class="{current: isShow}">
    <app-scroll class="content" :change="handleScrollChange" :isScrollX="false" :isScrollY="true">
      <!-- 轮播图 -->
      <div class="recommendWrap">
        <Banner :bannerData="bannerData"/>
        <!-- 歌曲列表 -->
        <RecommendList :musicData="musciList" :musicLoad="musicLoad"/>
      </div>
    </app-scroll>
    <router-view/>
  </div>
</template>
<script>
import Banner from "../components/recommend/banner";
import RecommendList from "../components/recommend/recommend-list";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    Banner,
    RecommendList
  },
  computed: {
    ...mapActions({
      requestBannerList: "recommend/requestBannerList",
      requestRecommendList: "recommend/requestRecommendList"
    }),
    ...mapState({
      bannerData: state => state.recommend.bannerList,//获取轮播图数据
      musciList: state => state.recommend.musciList,//获取推荐歌单数据
      musicLoad: state => state.recommend.musicLoad//歌单是否加载完毕
    })
  },
  created() {
    this.requestBannerList;//触发获取轮播图数据事件
    this.requestRecommendList;//触发获取推荐歌单事件
  },
  methods: {
    handleScrollChange(boolean) {
      this.isShow = boolean;//判断是否要展示下拉scroll红色背景
    }
  },
  watch: {
    // musicLoad: {
    //   handler() {
    //     console.log(this.musicLoad);
    //   },
    //   immediate: true,
    // }
  },
  mounted() {
    //   console.log(this.musciList);
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.current {
  background-color: #d44439;
}
</style>

