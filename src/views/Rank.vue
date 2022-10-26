<template>
  <div class="rank-view page">
    <app-scroll class="content" :isScrollX="false" :isScrollY="true">
      <Official :officialData="officialData"/>
      <Global :globalData="globalData"/>
    </app-scroll>
    <router-view/>
  </div>
</template>

<script>
import Official from "../components/rank/official";
import Global from "../components/rank/global";
import { mapState } from "vuex";

export default {
  components: {
    Official,
    Global
  },
  computed: {
    ...mapState({
      officialData: state => state.rank.officialData,
      globalData: state => state.rank.globalData
    })
  },
  mounted() {
    this.$store.dispatch("rank/getOfficialData");
  }
};
</script>
<style lang="scss">
.rank-view {
  h3 {
    font-size: 14px;
    line-height: 26px;
    font-weight: bold;
  }
}
</style>

<style lang="scss" scoped>
.content {
  width: 98%;
  height: 100%;
  padding: 0 4px;
}
</style>
