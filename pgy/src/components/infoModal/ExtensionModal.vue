<template>
  <div>
    <Modal v-model="model1" title="订单详情" @on-ok="ok" @on-cancel="cancel">
      <Row>
        <Col span="12">订 单 号 ：{{data.order_id}}</Col>
        <Col span="12">姓 名 ： {{data.true_name}}</Col>
        <Col span="12">手 机 号 ：{{data.phone}}</Col>
        <Col span="12">订单金额 ：{{data.order_amount}}</Col>
        <Col span="12">展期次数 ： {{data.number}}</Col>

        <Col span="12">展期金额 ： {{data.delay_amount}}</Col>
        <Col span="12">展期费 ： {{data.fee}}</Col>
        <Col span="12">展期天数 ： {{data.days}}</Col>
        <Col span="12">开始日 ： {{data.delay_begin_time}}</Col>
        <Col span="12">结束日 ： {{data.delay_end_time}}</Col>
        <Col span="12">逾期天数 ： {{data.overdue_days}}</Col>

        <Col span="12">违约金 ： {{data.violate_amount}}</Col>
        <Col span="12">
          状态 ：
          <span v-show="data.status==0">审核中</span>
          <span v-show="data.status==1">成功</span>
          <span v-show="data.status==2">失败</span>
        </Col>
        <Col span="12">展期时间 ： {{data.update_at}}</Col>
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ExtensionModal",
  data() {
    return {
      model1: this.modalShow
    };
  },
  props: ["modalShow", "data"],
  watch: {
    modalShow(val) {
      this.model1 = val;
    }
  },
  methods: {
    cancel() {
      this.$emit("CloseModal", false);
    },
    ok() {
      this.$emit("CloseModal", false);
    }
  }
};
</script>

