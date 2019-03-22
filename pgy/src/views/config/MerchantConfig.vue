<template>
  <div id="user-config">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
      <Button type="info" @click="Refresh">&nbsp;刷新&nbsp;</Button>
    </h1>
    <div v-for="(item,index) in lists" :key="index" class="opt-between name_list">名称：
      <Input placeholder="名称" v-model="item.mkey" style="width: 26%"/>值：
      <Input placeholder="值" v-model="item.mval" style="width: 26%"/>备注：
      <Input placeholder="备注" v-model="item.remark" style="width: 26%"/>
    </div>
    <Button v-show="lists!=''" type="success" @click="Preservation" style="float:right">&nbsp;保存修改&nbsp;</Button>
  </div>
</template>

<script>
export default {
  name: "MerchantConfig",
  data() {
    return {
      title: "商户配置",
      apiUrl: "/backend/Sysconfig/SysConfigList",
      RefreshApiUrl: "/backend/Sysconfig/refreshSysConfig",
      lists: []
    };
  },
  created() {
    this.initData(this.apiUrl);
  },
  computed: {},
  methods: {
    initData(url) {
      this.$fetch(url).then(d => {
        this.lists = d.data.lists;
      });
    },
    Refresh() {
      this.$fetch(this.RefreshApiUrl).then(d => {
        if (d.status == 1) {
          this.initData(this.apiUrl);
          this.$Message.success("刷新成功");
        } else {
          this.$Message.error(d.message);
        }
      });
    },
    Preservation() {
      var _data = JSON.stringify(this.lists);
      this.$post("/backend/Sysconfig/updateSysConfig", {
        config_json: _data
      }).then(d => {
        if (d.status == 1) {
          this.initData(this.apiUrl);
          this.$Message.success(d.message);
        } else {
          this.$Message.error(d.message);
        }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.list-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: normal;
  padding-bottom: 10px;
}
.name_list {
  font-size: 16px;
  line-height: 32px;
  padding: 10px;
}
</style>
