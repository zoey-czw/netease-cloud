<template>
  <div class="global">
    <h3 class="title">全球榜</h3>
    <ul>
      <li v-for="(item) in globalData" :key="item.id" @click = 'routerToAction(item.id)'>
          <div class="coverImg">
            <img :src="item.coverImgUrl" alt="加载失败">
            <div class="mask">
              <span>{{item.updateFrequency}}</span>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    globalData: Array
  },
    methods: {
    routerToAction(id) {
      this.$router.push({name:'rank-list',params:{id}});
      // this.$store.dispatch('songList/getSongListData',{id});
    }
  }
};
</script>

<style scoped lang="scss">
.global {
  h3 {
    margin-top: 8px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    li {
      margin: 4px 0;
    }
    li:nth-last-child(1) {
      flex: 1;
    }
  }
}
.coverImg {
  position: relative;
  img {
    width: 120px;
    height: 120px;
    border-radius: 3px;
  }
  .mask {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    span {
      color: rgb(241, 241, 241);
      position: absolute;
      bottom: 6px;
      left: 6px;
    }
  }
}
</style>
