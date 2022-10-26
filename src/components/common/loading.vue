<template>
  <div class="load">
    <div class="loadingAnimate">
      <span v-for="item in 6" :key="item"/>
      <span class="loadContext">{{loadText}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loadText: String,
  }
}
</script>

<style scoped lang="scss">
.load {
  width: 100%;
  height: 24px;
  line-height: 24px;
  text-align: center;
}
.loadingAnimate {
  span:not(.loadContext) {
    display: inline-block;
    width: 1px;
    background-color: #d44439;
    margin: 0 1px;
  }
  span:nth-child(1) {
    height: 10px;
    animation: changed 0.5s infinite 0s;
  }
  span:nth-child(2) {
    height: 8px;
    animation: changed 0.5s infinite 0.2s;
  }
  span:nth-child(3) {
    height: 6px;
    animation: changed 0.5s infinite 0.4s;
  }
  span:nth-child(4) {
    height: 4px;
    animation: changed 0.5s infinite 0.6s;
  }
  span:nth-child(5) {
    height: 2px;
    animation: changed 0.5s infinite 0.8s;
  }
  span:nth-child(6) {
    height: 0px;
    animation: changed 0.5s infinite 1s;
    margin-right: 4px;
  }

  .loadContext {
    font-size: 12px;
  }
}
@keyframes changed {
  0% {
    height: 12px;
  }
  20% {
    height: 10px;
  }
  40% {
    height: 8px;
  }
  60% {
    height: 6px;
  }
  80% {
    height: 4px;
  }
  100% {
    height: 2px;
  }
}
</style>
