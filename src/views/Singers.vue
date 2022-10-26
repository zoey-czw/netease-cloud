<template>
  <div class="singers-view page">
    <Menu-list :title="'分类(默认热门)：'" :data="hotDate" 
    v-model="select_type" 
    :setshouldLoadData="setshouldLoadData"/>
    <Menu-list :title="'首字母：'" :data="wordData" 
    v-model="select_letter" 
    :setshouldLoadData="setshouldLoadData"/>
    <infinite-scroll
      class="infScroll"
      :singerListLoad="singerListLoad"
      :setshouldLoadData="setshouldLoadData"
      @getMoreData="getMoreData"
      ref="scroll">
      <!-- 歌手列表 -->
      <ul class="singerList">
        <li v-for="item in hotList" :key="item.id" @click="routerToAction(item.id)">
          <img v-lazy="item.picUrl" alt="加载失败" class="singerImg">
          <div class="singTitle">{{item.name}}</div>
        </li>
      </ul>
    </infinite-scroll>
    <!-- 路由跳转 -->
    <router-view/>
  </div>
</template>
<script>
import MenuList from "../components/singer/menu-list";
import { mapState } from "vuex";
export default {
  data() {
    return {
      hotDate: [],
      wordData: [],
      select_type: -1,
      select_letter: -1,
      shouldLoadData: false //判断是否要请求数据
    };
  },
  components: {
    MenuList
  },
  watch: {
    select_type() {
      this.requestData();
      //   console.log('this.hotDate',this.select_type,this.hotDate);
    },
    select_letter() {
      this.requestData();
    },
    //刷新数据
    shouldLoadData() {
      this.shouldLoadData = false;
      this.scrollFlage = true;
      this.requestData();
      this.$refs.scroll.endPullUp();
    }
  },
  computed: {
    ...mapState({ hotList: state => state.singer.hotList }),
    ...mapState({ singerListLoad: state => state.singer.singerListLoad })
  },
  methods: {
    //数据请求
    requestData(isLoadMore) {
      let type = -1;
      let area = -1;
      let limit = 30;
      let initial = "";
    //   let offset = 0;
      let offset = isLoadMore? this.hotList.length : 0;

      if (this.select_type >= 0) {
        type = this.hotDate[this.select_type].typeID;
        area = this.hotDate[this.select_type].areaID;
      }
      if (this.select_letter >= 0) {
        initial = this.wordData[this.select_letter].id;
      }
      this.$store.dispatch("singer/getHotListDate", {
        type,
        area,
        limit,
        offset,
        initial
      });
    },
    //刷新数据
    setshouldLoadData(val) {
      this.shouldLoadData = val;
    },
    //上拉加载更多数据
    getMoreData(){
        this.requestData(true);
    },
    // 路由跳转
    routerToAction(id) {
      this.$router.push({name:'singerSong-list',params:{id}});
    }
  },
  created() {
    const sexType = [
      { label: "男", id: "1" },
      { label: "女", id: "2" },
      { label: "组合", id: "3" }
    ];
    const areas = [
      { label: "华语", id: "7" },
      { label: "欧美", id: "96" },
      { label: "日本", id: "8" },
      { label: "美国", id: "16" },
      { label: "其他", id: "0" }
    ];
    //热门分类展示
    let result = [];
    areas.forEach(area => {
      result = [
        ...result,
        ...sexType.map(type => {
          return {
            label: area.label + type.label,
            id: area.id + type.id,
            areaID: area.id,
            typeID: type.id
          };
        })
      ];
    });
    this.hotDate = result;
    //字母展示
    this.wordData = new Array(26).fill(65).map((item, index) => {
      return {
        label: String.fromCharCode(item + index),
        id: String.fromCharCode(97 + index)
      };
    });
  },
  mounted() {
    this.requestData();
  }
};
</script>
<style scoped lang="scss">
.singerList {
  li {
    display: flex;
    border-bottom: 1px solid rgb(228, 228, 228);
    padding: 7px 4px;
  }
  .singerImg {
    width: 50px;
    height: 50px;
    border-radius: 8px;
  }
  .singTitle {
    font-size: 14px;
    color: rgb(46, 48, 48);
    font-weight: bold;
    line-height: 50px;
    padding-left: 14px;
  }
}
</style>
<style scoped>
.infScroll {
  position: absolute;
  top: 73px;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
