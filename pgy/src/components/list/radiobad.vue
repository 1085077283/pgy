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
  props: ["status", "url", "number", "datas", "id", "index"],
  methods: {
    change() {
      if (this.status == 1) {
        var status = 2;
      } else {
        var status = 1;
      }

      this.$post(this.url, { status: status, number: this.number }).then(d => {
        if (d.status == 1) {
          this.$Message.success('更改成功');
          this.$set(this.datas[this.index], "status", parseInt(status));
        } else {
          this.$Message.error('操作失败！');
        }
      });
    }
  }
};
</script>

