<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 #app{
    height: auto;
    min-height: 100%;
  }
  .confirm-text{
    font-size: 18px;
  }
</style>
