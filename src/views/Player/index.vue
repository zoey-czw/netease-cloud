<template>
  <div class="player-view">
    <!-- 底部迷你播放器 -->
    <Mini-player v-show="isShow" 
    @showNormalBgImg="showNormalBgImg" 
    :songSrcListData="songSrcListData[this.currentIndex]"/>
    <!-- 界面播放器 -->
    <Normal-player v-show="!isShow" 
    @closeNormalPanel="closeNormalPanel" 
    :songSrcListData="songSrcListData[this.currentIndex]"
    ref="normalPlayer"/>
    <!-- 歌曲播放器 -->
    <audio ref="audio"/>
  </div>
</template>

<script>
import MiniPlayer from "./children/mini-player";
import NormalPlayer from "./children/normal-player";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isShow: true //true展示mini ,false展示normal
    };
  },
  components: {
    MiniPlayer,
    NormalPlayer
  },
  methods: {
    // normal页面开关
    showNormalBgImg(val) {
      this.$refs.normalPlayer.handleEnter();
      this.isShow = false; //打开normal
    },
    closeNormalPanel() {
      this.isShow = true; //关闭normal
    }
  },
  computed: {
    //控制player页面开关
    ...mapState({
      songSrcListData: state => state.player.songSrcList, //歌曲数据
      currentIndex: state => state.player.currentIndex, //当前播放歌曲下标
      playing: state => state.player.playing //播放状态 
    })
  },
  watch: {
    // 监听下标变化
    currentIndex(val) {
      // console.log(this.songSrcListData[this.currentIndex]);
      this.$refs.audio.src =`https://music.163.com/song/media/outer/url?id=${this.songSrcListData[this.currentIndex].id}.mp3`
      this.$refs.audio.play();
    }
  },
  mounted() {
    // console.log(this.showPlayer);
    // const audio = this.$refs.audio;
    // if(this.playing) {

    // }
  }
};
</script>


<style scoped>
</style>

