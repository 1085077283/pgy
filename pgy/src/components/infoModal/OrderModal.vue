<template>
  <div>
    <Modal v-model="model1" title="订单详情" @on-ok="ok" @on-cancel="cancel">
      <Row>
        <Col span="12">订 单 号 ：{{data.order_id}}</Col>
        <Col span="12">姓 名 ： {{data.name}}</Col>
        <Col span="12">手 机 号 ：{{data.phone}}</Col>
        <Col span="12">状态 ： {{this.$store.getters.orderStatus[data.status]}}</Col>
        <Col span="12">借款日 ：{{data.loan_day}}</Col>
        <!-- <Col span="12">
          <div v-if="data.channel==0">渠道 ：app</div>
          <div v-else>渠道 ：其他</div>
        </Col> -->
        <Col span="12">应还日：{{data.anount_time}}</Col>
        <Col span="12">申请时间 ：{{data.created_at}}</Col>
        <Col span="12">实际还款日：{{data.return_time}}</Col>
        <Col span="12">还款日：{{data.repay_time}}</Col>

        <Col span="12">审核时间 ：{{data.review_time}}</Col>

        <Col span="12">账单金额 ：{{data.amount_due}}</Col>
        
        <Col span="12">放款时间 ：{{data.loan_time}}</Col>
        <Col span="12">借款金额 ：{{data.loan_amount}}</Col>
        <Col span="12">支付时间 ：{{data.pay_time}}</Col>

        <Col span="12">实际到帐 ：{{data.actual_arrival}}</Col>
        
        <Col span="12">审核员 ：{{data.auditor_name}}</Col>
        <Col span="12">服务费 ：{{data.fee}}</Col>
        <Col span="12">催收员 ：{{data.recruiter_name}}</Col>
        <Col span="12">利息 ：{{data.interest}}</Col>
        
      </Row>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "OrderModal",
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

