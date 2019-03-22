<template>
  <div>
    <Modal v-model="model1" :width="950" title="还款计划" @on-ok="ok" @on-cancel="cancel">
      <Table border ref="selection" :columns="columns1" :data="data_list" :loading="loading"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "stagesList",
  data() {
    return {
      columns1: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
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
      model1: this.State
    };
  },
  props: ["State", "orderId"],
  watch: {
    State(val) {
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
            let _data=d.data
            // _data.forEach((item,index) => {
            //   if(item.status==1)
            //   _data[index]._checked=true;
            //   _data[index]. _disabled=true
            // });
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
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  }
};
</script>

