<template>
  <div id="user-config">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>导流配置
            <!-- <Switch  v-model="switch1" size="large" @on-change="change">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </Switch> -->
             <Switch v-model="switch1" @on-change="change" />
             <span v-show="switch1">开启</span>
             <span v-show="!switch1">关闭</span>
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="ReviewCol" :data="ReviewData" :loading="Reviewloading"></Table>
      </Card>
    </div>
    <Modal v-model="CenterModal.modal" title="版本配置">
      <Form
        ref="CenterModal"
        :model="CenterModal.data"
        :rules="ValidateRules"
        label-position="right"
        :label-width="100"
      >
        <!-- <FormItem label="平台类型：" prop="platform">
            <Input v-model="CenterModal.data.platform"></Input>
        </FormItem>-->
        <!-- <FormItem label="黑名单类型：" prop="type">
        
          <Select v-model="CenterModal.data.type" >
            <Option v-for="(item,index) in blackData" :key="index" :value="item.id" >{{item.title}}</Option>
          </Select>
        </FormItem>-->
        <FormItem label="导流单价：" prop="price">
          <Input v-model="CenterModal.data.price"></Input>
        </FormItem>
        <FormItem label="导流地址：" prop="url">
          <Input v-model="CenterModal.data.url"></Input>
        </FormItem>
        <FormItem label="产品简介：" prop="remark">
          <Input v-model="CenterModal.data.remark"></Input>
        </FormItem>
        <FormItem label="产品名：" prop="name">
          <Input v-model="CenterModal.data.name"></Input>
        </FormItem>
        <!-- <FormItem label="强制更新：" prop="flag">
            <Select v-model="CenterModal.data.flag">
              <Option v-for="item in AuthData" :value="item.id" :key="item.id">{{ item.title }}</Option>
            </Select>
        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="ModalCancel" size="large">取消</Button>
        <Button type="primary" @click="SubmitOver" size="large">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getLocal, crtTimeFtt } from "@/util/util";

export default {
  name: "diversion",

  data() {
    return {
      title: "",
      switch1:'',
      APIURL: "/backend/black-config/list",
      blackData: [
        { id: 1, title: "A-机审拒绝" },
        { id: 2, title: "B-人工拒绝" },
        { id: 3, title: "C-贷后拒绝" }
      ],
      ReviewCol: [
        { title: "产品名", align: "center", key: "name" },
        { title: "产品简介", align: "center", key: "remark" },
        { title: "导流单价", align: "center", key: "price" },
        { title: "导流地址", align: "center", key: "url" },
        {
          title: "客户类型",
          align: "center",
          key: "type",
          render: (h, params) => {
            if (params.row.type == 1) {
              return "A";
            } else if (params.row.type == 2) {
              return "B";
            } else if (params.row.type == 3) {
              return "C";
            }
          }
        },
        {
          title: "修改时间",
          align: "center",
          key: "update_at"
          // render: (h, params) => {
          //   return crtTimeFtt(params.row.create_at);
          // }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            //需要判断人员是否离职
            return h("div", this.$renderBtn(h, params, this.ReviewBtnData));
          }
        }
      ],
      ReviewBtnData: [
        {
          name: "编辑",
          color: "primary",
          class: "reviewQuitOpt"
        }
      ],
      ReviewData: [],
      Reviewloading: false,
      CenterModal: {
        //更新的模态框
        modal: false,
        data: {
          type: "",
          price: "",
          url: "",
          remark: "",
          name: ""
        }
      },
      ValidateRules: {
        type: [{ required: true, message: "不能为空！" }],
        price: [{ required: true, message: "不能为空！" }],
        url: [{ required: true, message: "不能为空！" }],
        remark: [{ required: true, message: "不能为空！" }],
        name: [{ required: true, message: "不能为空！" }]
      }
    };
  },
  created() {
    this.InitData();
  },
  methods: {
   change (msg) {
      var obj = 2;
      if (msg == true) {
        var obj = 1;
      }
      this.$post("/backend/black-config/edit", { status: obj, id: 1 }).then(
        d => {}
      );
      this.$post("/backend/black-config/edit", { status: obj, id: 2 }).then(
        d => {}
      );
      this.$post("/backend/black-config/edit", { status: obj, id: 3 }).then(
        d => {
          if (d.status == 1) {
            this.$Message.success(d.message);
             if(d.data.lists[0].status==1){
          this.switch1=true
        }else{
          this.switch1=false
        }
          } else {
            this.$Message.error("系统错误，请重试！");
          }
        }
      );
    },
    InitData() {
      this.$fetch(this.APIURL).then(d => {
        var obj = [];
        obj[0] = d.data.lists[0];
        obj[1] = d.data.lists[2];
        obj[2] = d.data.lists[1];
        if(d.data.lists[0].status==1){
          this.switch1=true
        }else{
          this.switch1=false
        }
        this.ReviewData = obj;
      });
    },
    reviewQuitOpt(row) {
      this.CenterModal = {
        //更新的模态框
        modal: true,
        data: {
          id: row.id,
          type: row.type,
          price: row.price,
          url: row.url,
          remark: row.remark,
          name: row.name
        }
      };
    },
    ModalCancel() {
      this.CenterModal.modal = false;
    },
    SubmitOver() {
      this.$post("/backend/black-config/edit", this.CenterModal.data).then(
        d => {
          if (d.status == 1) {
            this.$Message.success("修改成功");
            this.CenterModal.modal = false;
            this.InitData();
          } else {
            this.$Message.console.error("修改失败");
          }
        }
      );
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
.data-area {
  padding-top: 20px;
  .ivu-table-wrapper {
    border: none;
  }
  .page-box {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
.card-tit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>