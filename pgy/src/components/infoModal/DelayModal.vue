<template>
  <Modal
    v-model="State"
    :title="'发起展期申请（'+DelayInfo.name+'）'"
    :styles="{top: '30px',zIndex: '10'}"
    @on-cancel="CloseBtn"
  >
    <Form :model="DelayInfo" :label-width="120">
      <FormItem label="展期金额：">
        <Input class="unit-width" v-model="DelayInfo.money_limit" disabled/>
      </FormItem>
      <FormItem label="展期开始日：">
        <Input class="unit-width" v-model="DelayInfo.start_day" disabled/>
      </FormItem>
      <FormItem label="展期结束日：">
        <Input class="unit-width" v-model="DelayInfo.end_day" disabled/>
      </FormItem>
      <FormItem label="展期天数：">
        <Input class="unit-width" v-model="DelayInfo.days" disabled/>
      </FormItem>
      <FormItem label="展期费：">
        <Input class="unit-width" v-model="DelayInfo.delay_price" disabled/>
      </FormItem>
      <FormItem label="违约金：">
        <Input class="unit-width" v-model="DelayInfo.reduce_price" disabled/>
      </FormItem>
      <FormItem label="应收金额：">
        <Input class="unit-width" v-model="DelayInfo.zhanqi_price" disabled/>
      </FormItem>
      <FormItem label="实际收取金额：">
        <Input class="unit-width" v-model="shiji"/>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="error" @click="CloseBtn">取消</Button>
      <Button type="primary" @click="Submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "DelayModal",
  data() {
    return {
      State: this.modalShow,
      DelayInfo: {
        uid: "",
        name: "",
        money_limit: "",
        start_day: "",
        end_day: "",
        days: "",
        reduce_price: "",
        zhanqi_price: ""
      },
      shiji: "",
      zhanqi: "",
      weiyue: ""
    };
  },
  props: {
    modalShow: Boolean,
    initData: Object
  },

  watch: {
    modalShow(val) {
      this.State = val;
    },
    initData(val) {
      this.zhanqi = val.config.order.delay_price;
      this.weiyue = val.config.order.reduce_price;
      this.DelayInfo = {
        uid: val.uid,
        name: val.name,
        order_id: val.order_id,
        money_limit: val.config.order.loan_amount,
        start_day: val.config.order.start_day,
        end_day: val.config.order.end_day,
        days: val.config.days,
        delay_price: val.config.order.delay_price,
        reduce_price: val.config.order.reduce_price,
        zhanqi_price: val.config.order.zhanqi_price
      };
    },
    shiji(val) {
      if (val === "") {
        this.DelayInfo.delay_price = this.initData.config.order.delay_price;
        this.DelayInfo.reduce_price = this.initData.config.order.reduce_price;
      } else {
        var zhanqi = this.zhanqi;
        var weiyue = this.weiyue;
        if (Number(val) <= Number(zhanqi) + Number(weiyue)) {
          if (Number(val) < Number(zhanqi)) {
            this.DelayInfo.reduce_price = "0";
            this.DelayInfo.delay_price = Number(val);
          } else {
            this.DelayInfo.reduce_price = Math.round((Number(val) - Number(zhanqi))*1000)/1000;
            this.DelayInfo.delay_price = zhanqi;
          }
          // }else{
          //   this.DelayInfo.delay_price=zhanqi
          //    this.DelayInfo.reduce_price=Number(val)- Number(weiyue)
          // }
        }
      }
    }
  },
  methods: {
    CloseBtn() {
      this.$emit("CloseModal");
    },
    Submit() {
      if (this.shiji > this.DelayInfo.zhanqi_price) {
        this.$Message.error("实际收取金额不能大于应收金额！");
      } else {
        this.$post("/backend/order-delay/add-delay", {
          uid: this.DelayInfo.uid,
          order_id: this.DelayInfo.order_id,
          price: this.shiji
        }).then(d => {
          if (d.status == 1) {
            this.$Message.success("展期成功");
      this.$emit("CloseModal");

          } else {
            this.$Message.error(d.message);
          }
        });
      }
    },
    ChoseStart(value) {
      this.DelayInfo.start_date = value;
    },
    ChoseEnd(value) {
      this.DelayInfo.end_date = value;
    },
    GetTotalCount() {
      this.$post("/backend/Tocalculate/zhanqiTocals", {
        uid: this.DelayInfo.uid,
        amount: this.DelayInfo.amount,
        days: this.DelayInfo.days
      }).then(d => {
        this.DelayInfo.fee = d.data;
      });
    },
    ResetCalc() {
      const start = new Date(this.DelayInfo.start_date),
        end = new Date(
          start.getTime() + 1000 * 60 * 60 * 24 * this.DelayInfo.days
        );
      this.DelayInfo.end_date = `${end.getFullYear()}-${end.getMonth() +
        1}-${end.getDate(0)}`;
      this.GetTotalCount();
    }
  }
};
</script>

<style lang="less" scoped>
.big-img {
  display: inline-block;
}
.unit-width {
  width: 280px;
}
</style>
