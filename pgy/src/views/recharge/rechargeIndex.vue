<template>
  <div class="content">
    <Form :model="formItem" :label-width="180">
      <FormItem label="充值商户名：">信贷管理后台</FormItem>
      <FormItem label="充值金额：">
        <Input style="width: auto" type="text" v-model="formItem.money"></Input>元
      </FormItem>
      <FormItem label>
        <span class="info">(温馨提醒：充值成功后，余额可能存在延迟现象，一般5-10分钟内到帐，如有长时间未到帐问题，咨询客服。)</span>
      </FormItem>
      <FormItem label="充值方式：">
        <div>
          <img src="../../assets/images/recharge.png" width="100px" alt>
        </div>
      </FormItem>
      <FormItem>
        <Button type="default">立即充值</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "rechargeIndex",
  data() {
    return {
      formItem: {}
    };
  }
};
</script>

<style scoped>
.content /deep/ .ivu-form-item-label {
  font-size: 20px;
}
.content /deep/ .ivu-form-item-content {
  font-size: 20px;
  padding-top: 5px;
}
.info {
  color: rgba(74, 74, 74, 0.7);
  font-size: 18px;
}
</style>
