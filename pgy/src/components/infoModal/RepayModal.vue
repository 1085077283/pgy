<template>
  <Modal
    v-model="State"
    :title="'发起销账申请（'+RepayInfo.name+'）'"
    :styles="{top: '30px',zIndex: '10'}"
    @on-cancel="CloseBtn"
  >
    <Form :model="RepayInfo" :label-width="120">
      <!--<FormItem label="还款类型：">
        <Select v-model="RepayInfo.type" style="width:280px" @on-change="ChangeType">
          <Option v-for="item in RepayType" :key="item.value" :value="item.value">{{item.name}}</Option>
        </Select>
      </FormItem>-->
      <!-- <FormItem label="姓名:">
        <Input class="unit-width" v-model="RepayInfo.name" disabled/>
      </FormItem>-->
      <FormItem label="账单金额:">
        <Input class="unit-width" v-model="RepayInfo.amount_due" disabled/>
      </FormItem>
      <FormItem label="违约金:">
        <Input class="unit-width" v-model="RepayInfo.reduce_amount" disabled/>
      </FormItem>
      <FormItem label="应收金额:">
        <Input class="unit-width" v-model="RepayInfo.back_price" disabled/>
      </FormItem>
      <FormItem label="实际收取金额:">
        <Input class="unit-width" v-model="yinshou"/>
      </FormItem>
      <!-- <FormItem label="实际还款金额：">
        <Input class="unit-width" v-model="RepayInfo.yh_amountn" @on-keyup="LimitAmountn" @on-blur="GetYhamount"/>
      </FormItem>-->
      <!--<FormItem label="违约金：">
        <Input class="unit-width" v-model="RepayInfo.wy_amount"/>
      </FormItem>-->
    </Form>
    <div slot="footer">
      <Button type="error" @click="CloseBtn">关闭</Button>
      <Button type="primary" @click="Submit">提交</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "DelayModal",
  data() {
    return {
      State: false,
      RepayType: [
        {
          value: 2,
          name: "提前还款"
        },
        {
          value: 3,
          name: "销账还款"
        }
      ],
      RepayInfo: {
        name: "",
        amount_due: "",
        reduce_amount: "",
        back_price: ""
      },
      yinshou: "",
      weiyue: "",
      zhangdan: ""
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
      this.weiyue = val.reduce_amount;
      this.zhangdan = val.amount_due;
      this.RepayInfo = {
        name: val.name,
        order_id: val.order_id,
        amount_due: val.amount_due,
        reduce_amount: val.reduce_amount,
        back_price: val.back_price,
        left_price: val.left_price
      };
    },
    yinshou(val) {
      var weiyue = this.weiyue;
      var zhangdan = this.zhangdan;
      if (val == "") {
        this.RepayInfo.reduce_amount = weiyue;
      } else if (val < Number(weiyue) + Number(zhangdan)) {
        if (Number(val) <= Number(zhangdan)) {
          this.RepayInfo.reduce_amount = 0;
        } else {
          this.RepayInfo.reduce_amount =
            Math.round((Number(val) - Number(zhangdan)) * 1000) / 1000;
        }
      }
    }
  },
  methods: {
    CloseBtn() {
      this.$emit("CloseModal");
    },
    Submit() {
      if (this.yinshou > this.RepayInfo.back_price) {
        this.$Message.error("实际收取金额不能大约应收金额！");
      } else {
        this.$post("/backend/order/review-order", {
          order_id: this.RepayInfo.order_id,
          amount_due: this.RepayInfo.amount_due,
          left_price: this.RepayInfo.left_price,
          reduce_amount: this.weiyue,
          back_price: this.yinshou
        }).then(d => {
          if (d.status == 1) {
            this.$Message.success("申请销账成功!");
            this.$emit("CloseModal");
          } else {
            this.$Message.error(d.message);
          }
        });
      }
    },
    GetTotalCount() {
      this.$post("/backend/Tocalculate/fangkuanTocal", {
        jid: this.RepayInfo.jid
      }).then(d => {
        this.RepayInfo.amountn = d.data;
        this.ChangeType(2);
      });
    },
    ChangeType(type) {
      if (type === 2) {
        this.RepayInfo.yh_amount = this.RepayInfo.amount;
        this.RepayInfo.yh_amountn = this.RepayInfo.amountn;
      }
    },
    LimitAmountn() {
      if (
        parseFloat(this.RepayInfo.yh_amountn) >
        parseFloat(this.RepayInfo.amountn)
      ) {
        this.RepayInfo.yh_amountn = this.RepayInfo.amountn;
      }
      this.GetYhamount();
    },
    GetYhamount() {
      const data = {
        uid: this.RepayInfo.uid,
        amount: this.RepayInfo.yh_amountn
      };
      this.$post("/backend/Tocalculate/getBamount", data).then(d => {
        this.RepayInfo.yh_amount = d;
      });
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
