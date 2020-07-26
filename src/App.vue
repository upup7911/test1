<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import index from "./pages/Index";

export default {
  components: {
    index,
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
p{
  font-size: 14px;
}
a{
  text-decoration: none;
  font-size: 14px;
  color: #000;
}
#app {
  font-family: "黑体";
  .container {
    width: 1280px;
    margin: 0 auto;
  }
  .containerMax{
    width: 100%;
  }
}
</style>
