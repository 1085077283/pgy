<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style >
#app {
  height: auto;
  min-height: 100%;
}
.confirm-text {
  font-size: 18px;
}
  .ivu-table .table-tag-row td{
    background-color: #ff6600!important;
    color: #fff!important;
  }
  .ivu-table .table-hang-row td{
    background-color: #76d2fb!important;
    color: #333!important;
  }
  .opt-box{
    display: flex;
    flex-direction: row;
  }
  .opt-between{
     display: flex;
     justify-content: space-between;
  }
  .opt-around{
    display: flex;
    justify-content: space-around;
  }
</style>
