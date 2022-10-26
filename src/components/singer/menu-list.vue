<template>
  <app-scroll class="content" :isScrollX="true" :isScrollY="true" :width="wrapWidth">
    <div class="menu-view" ref="wrap">
      <span class="title" @click="clickAction">{{title}}</span>
      <span class="item" 
      v-for="(item,index) in data" 
      :key="item.id" 
      :class="{action: index==value}"
      @click="clickAction(index)"
      >{{item.label}}</span>
    </div>
  </app-scroll>
</template>
<script>
export default {
  props: {
    title: String,
    data: Array,
    setshouldLoadData: Function, //判断是否要请求数据
    value: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      wrapWidth: 0
    };
  },
  mounted() {
    this.wrapWidth = this.$refs.wrap.offsetWidth;
  },
  methods: {
    clickAction(index) {
      this.$emit('input',index);
      this.setshouldLoadData(true);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../assets/global-style.scss";
.content {
  width: 98%;
}
.menu-view {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: max-content;
  box-sizing: border-box;
  margin-top: 6px;
  span {
    display: inline-block;
    border: 1px solid transparent;
    padding: 4px;
    border-radius: 8px;
  }
  span:nth-child(1) {
    padding-right: 0px;
    color: grey;
  }
  .action {
    border: 1px solid #d44439;
    color: #d44439;
  }
}
</style>
<style>
</style>
