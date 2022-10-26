<template>
  <div class="recommendList">
    <h4>推荐歌单</h4>
    <div class="loading" v-if="!musicLoad">
      <Loading/>
    </div>
    <div class="musicList">
      <div
        class="box"
        v-for="(item,index) in musicData"
        :key="index"
        @click="routerToAction(item.id)"
      >
        <!-- 播放次数 -->
        <div class="hot">
          <i class="iconfont icon-headset"></i>
          <span>{{item.playCount | formatter}}</span>
        </div>
        <!-- 歌单封面 -->
        <img v-lazy="item.picUrl" alt="加载失败">
        <!-- 歌单名称 -->
        <div class="title">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    musicData: Array,
    musicLoad: Boolean
  },
  methods: {
    routerToAction(id) {
      this.$router.push({ name: "recommend-list", params: { id } });
    }
  },
  mounted() {
    // console.log(this.musicData);
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
.recommendList {
  background-color: #f2f3f4;
}
h4 {
  font-weight: 700;
  padding-left: 6px;
  font-size: 14px;
  line-height: 60px;
}
.musicList {
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .box {
    width: 120px;
    height: 172px;
    position: relative;
    .hot {
      position: absolute;
      top: 0;
      right: 3px;
      color: #f1f1f1;
      display: flex;
      justify-content: space-around;
    }
    img {
      width: 120px;
      height: 120px;
    }
    .title {
      overflow: hidden;
      margin-top: 2px;
      padding: 0px 2px;
      height: 50px;
      text-align: left;
      font-size: 12px;
      line-height: 18px;
      color: rgb(46, 48, 48);
    }
  }
}
</style>
<style scoped>
.loading {
  margin-top: -10px;
}
</style>
