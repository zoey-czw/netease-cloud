<template>
  <div class="songList-view">
    <ul>
      <li v-for="(item,index) in songListData" :key="index" @click="playSongAction(index)">
        <div class="num">{{index+1}}</div>
        <div class="songDetail">
          <h6>{{item.name}}</h6>
          <span>{{item.author}} - {{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    songListData: Array
  },
  methods: {
    playSongAction(index) {
      // console.log(this.songListData);
      this.$store.commit("player/setSongSrc", [this.songListData, index]); //传入歌曲信息-下标
      this.$store.commit("player/setShowPlayer", true); //设置player开关
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.songList-view {
  ul {
    li {
      width: 100%;
      display: flex;
      .num {
        width: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
      }
      .songDetail {
        width: 80%;
        height: 60px;
        box-sizing: border-box;
        padding: 4px 0;
        font-size: 12px;
        color: #bba8a8;
        border-bottom: 1px solid rgb(228, 228, 228);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        h6 {
          font-size: 16px;
          color: #2e3030;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
