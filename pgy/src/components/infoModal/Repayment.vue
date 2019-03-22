<template>
  <div>
    <Modal v-model="model1" :width="950" title="还款计划" @on-ok="ok" @on-cancel="cancel">
      <Table
        border
        ref="selection"
        :columns="columns1"
        :data="data_list"
        :loading="loading"
        @on-selection-change="selectionItems"
      ></Table>
      <div slot="footer">
        <Button @click="confirmup">提交</Button>
      </div>
    </Modal>
    <Modal v-model="holdModal.modal" class="beizhu" title="代扣还款">
      <div>
        将会从用户绑定的银行卡扣款
        <span class="text_Primary">{{this.money}}</span>元
      </div>
      <div slot="footer">
        <Button type="text" @click="holdCancel" size="large">取消</Button>
        <Button type="primary" @click="holdOver" size="large">确定</Button>
      </div>
      <Spin size="large" fix v-show="spinShow1"></Spin>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "stagesList",
  data() {
    return {
      spinShow1: false,
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "还款金额",
          align: "center",
          key: "price"
        },
        {
          title: "还款日",
          align: "center",
          key: "return_time"
        },
        {
          title: "还款状态",
          align: "center",
          key: "status",
          render: (h, prams) => {
            if (prams.row.status == 0) {
              return "未还款";
            } else if (prams.row.status == 1) {
              return "已还款";
            }
          }
        }
      ],
      loading: true,
      data_list: [],
      model1: this.State,
      holdModal: {
        value: "",
        modal: false
      },
      money: "",
      idIist: []
    };
  },
  props: ["State", "orderId", "user_id"],
  watch: {
    State(val) {
      this.money = "";
      this.idIist = [];
      this.model1 = val;
    },
    orderId(val) {
      if (val != "") {
        this.$post("/backend/Order/getPlan", {
          type: "1",
          order_id: val
        }).then(d => {
          this.loading = true;
          if (d.status == 1) {
            let _data = d.data;
            _data.forEach((item, index) => {
              if (item.status == 1) {
                _data[index]._checked = true;
                _data[index]._disabled = true;
              }
            });
            this.data_list = _data;
            this.loading = false;
          }
        });
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("CloseModal", false);
    },
    ok() {
      this.$emit("CloseModal", false);
    },
    //全选
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //保存选中
    selectionItems(val) {
      this.idIist = val;
    },
    //确认
    confirmup() {
      var money = "";
      this.idIist.forEach((item, index) => {
        if (item.status == 0) {
          money = Number(money) + Number(item.price);
        }
      });
      this.money = Math.round(money*100)/100;
      if (money != "") {
        this.holdModal = {
          value: 1,
          modal: true
        };
      } else {
        this.$Message.error("请选择分期");
      }
    },
    holdCancel() {
      this.holdModal = {
        value: "",
        modal: false
      };
    },
    holdOver() {
      if (this.idIist != "") {
        var ids = "";
        this.idIist.forEach((item, index) => {
          if (item.status == 0) {
            ids += item.id + ",";
          }
        });
        this.spinShow1 = true;
        this.$post("/backend/finance-new-loan/period-loan", {
          ids: ids.slice(0, ids.length - 1),
          uid: this.user_id
        }).then(d => {
          if (d.status == 1) {
            this.$emit("CloseModal", false);
            this.spinShow1 = false;
            this.$Message.success('操作成功');
            this.holdModal = {
              value: "",
              modal: false
            };
          } else {
            this.$Message.error(d.message);
          }
        });
      }
    }
  }
};
</script>

