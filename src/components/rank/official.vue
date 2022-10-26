<template>
  <div class="official-view">
    <h3 class="title">官方榜</h3>
    <ul class="officialList">
      <li v-for="(item) in officialData" :key="item.id" @click = 'routerToAction(item.id)'>
        <div class="coverImg">
          <img :src="item.coverImgUrl" alt="加载失败">
          <span>{{item.updateFrequency}}</span>
        </div>
        <div class="singList">
          <div v-for="(item2,index) in item.tracks" :key="index">
            <div>{{ index+1 +'. '+ item2.first+' - '+item2.second}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    officialData: Array
  },
  methods: {
    routerToAction(id) {
      this.$router.push({name:'rank-list',params:{id}});
      // this.$store.dispatch('songList/getSongListData',{id});
    }
  }
};
</script>

<style lang="scss">
.official-view {
  width: 100%;
  min-height: 448px;
}
.officialList {
  li {
    width: 100%;
    height: 108px;
    margin: 4px 0;
    border-bottom: 1px solid rgb(228, 228, 228);
    display: flex;
    align-items: center;
    .coverImg {
      position: relative;
      span {
        color: rgb(241, 241, 241);
        position: absolute;
        bottom: 6px;
        left: 6px;
      }
      img {
        height: 100px;
        width: 100px;
      }
    }
    .singList {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 10px;
      color: gray;
    }
  }
}
</style>
