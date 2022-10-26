<template>
  <transition appear appear-active-class="songTo-active-class" 
  v-on:appear="bforeAppearAction"
  v-on:after-appear="afterAppearAction">
    <div class="songSheet-view subpage" ref="songSheet">
      <!-- 歌单可隐藏顶部 -->
      <Song-top :title="title" :scrollY="scrollY" :songTitle="topDetailData.name"/>
      <app-scroll
        class="content"
        :isScrollX="false"
        :isScrollY="true"
        @getScroll="getScroll"
        :NOScrollY="true"
      >
        <!-- 歌单背景头部 -->
        <Song-header :topDetailData="topDetailData"/>
        <!-- 歌单列表 -->
        <Song-list :songListData="songListData"/>
      </app-scroll>
    </div>
  </transition>
</template>

<script>
import SongTop from "../components/song-list/song-top";
import SongHeader from "../components/song-list/song-header";
import SongList from "../components/song-list/song-list";

import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "歌单",
      scrollY: 0,
      songTitle: ""
    };
  },
  components: {
    SongTop,
    SongHeader,
    SongList
  },
  computed: {
    ...mapState({
      songListData: state => state.songList.songListData,
      topDetailData: state => state.songList.topDetailData
      //   this.songTitle = this.$store.state.songList.topDetailData.name;
    })
  },
  methods: {
    getScroll(val) {
      this.scrollY = val;
    },
    bforeAppearAction() {
        this.$refs.songSheet.style.transform = 'rotateZ(90deg)';
    },
    afterAppearAction() {
        this.$refs.songSheet.style.transform = 'rotateZ(0deg)';
    }
  },
  mounted() {
    this.$store.dispatch("songList/getSongListData", {
      id: this.$route.params.id
    });
  }
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.songSheet-view {
    transform-origin: left bottom;
    transform: rotateZ(90deg);
}
.songTo-active-class {
    animation: moved 0.3s linear;
}
@keyframes moved {
    50% {transform: rotateZ(45deg)}
    100% {transform: rotateZ(0deg)}
}
</style>
