<template>
  <div id="radio-list">
    <RadioGroup v-model="rstatus" @on-change="change" vertical>
      <Radio label="1">
        <span>启用</span>
      </Radio>
      <Radio label="2">
        <span>禁用</span>
      </Radio>
    </RadioGroup>
  </div>
</template>

<script>
export default {
  name: "radioList",
  data() {
    return {
      rstatus: this.status
    };
  },
  props: ["index", "status", "datas", "id", "url", "Name"],
  methods: {
    change() {
      if (typeof this.Name == "string") {
        var idData = { admin_id: this.id };
      } else {
        var idData = { id: this.id };
      }
      this.$post(this.url, idData).then(d => {
        if (d.status == 1) {
          this.$Message.success("更改成功");
          //   this.$set(this.datas[this.index],'status',parseInt(this.status))
        } else {
          this.$Message.error("操作失败！");
        }
      });
    }
  }
};
</script>

