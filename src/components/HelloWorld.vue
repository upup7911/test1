<template>
  <div>
    <h1>{{index}}</h1>
    <ul>
      <li>这是点1</li>
      <li>这是点1</li>
      <li>这是点1</li>
      <li>这是点1</li>
      <li>这是点1</li>
    </ul>

    <!-- 这是存放副业面的 -->
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: "这是主页面",
    };
  },
  created: {},
  computed: {},
  watch: {},
};
</script>

<style lang="less" scoped>
ul{
  li{
    color: red;
    list-style: none;
  }
}
</style>