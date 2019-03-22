
   <template>
  <div id="user-config">
    <h1 class="list-title">
      <span class="tit-text">{{ title }}</span>
    </h1>
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>版本配置
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="ReviewCol" :data="ReviewData" :loading="Reviewloading"></Table>
      </Card>
      <Modal v-model="CenterModal.modal" title="版本配置" @CloseModal="AuditCancel">
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
          <FormItem label="版本号：" prop="version_code">
            <Input v-model="CenterModal.data.version_code"></Input>
          </FormItem>
          <FormItem label="下载地址：" prop="url">
            <Input v-model="CenterModal.data.url"></Input>
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
    <div class="data-area">
      <Card :padding="0">
        <div class="card-tit" slot="title">
          <h3>
            <Icon type="clipboard"></Icon>客服微信号
          </h3>
          <div class="btn-box"></div>
        </div>
        <Table border :columns="WeixinCol" :data="WeixinData" :loading="Weixinloading"></Table>
      </Card>
    </div>
    <Modal v-model="WeixinModal.modal" title="修改客服微信号" @CloseModal="AuditCancel">
      <Form
        ref="WeixinModal"
        :model="WeixinModal.data"
        :rules="ValidateRulesWei"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="微信号：" prop="value">
          <Input v-model="WeixinModal.data.value"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="ModalCancel" size="large">取消</Button>
        <Button type="primary" @click="SubmitOverWei" size="large">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "systemConfiguration",
  data() {
    return {
      title: "",
      ReviewCol: [
        {
          title: "平台类型",
          align: "center",
          key: "platform"
        },
        {
          title: "强制更新链接 ",
          align: "center",
          key: "url"
        },
        {
          title: "版本号",
          align: "center",
          key: "version_code"
        },
        {
          title: "是否强制更新",
          align: "center",
          key: "flag",
          render: (h, params) => {
            if (params.row.flag == 1) {
              return "强制更新";
            } else {
              return "不强制更新";
            }
          }
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
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
      Weixinloading: false,
      WeixinCol: [
        {
          title: "客服微信号",
          align: "center",
          key: "value"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", this.$renderBtn(h, params, this.WeixinBtnData));
          }
        }
      ],
      WeixinBtnData: [
        {
          name: "编辑",
          color: "primary",
          class: "reviewWeixin"
        }
      ],
      WeixinData: [],
      CenterModal: {
        //更新的模态框
        modal: false,
        data: {
          platform: "",
          version_code: "",
          url: "",
          flag: ""
        }
      },
      WeixinModal: {
        //更新的模态框
        modal: false,
        data: {
          value: ""
        }
      },
      ValidateRules: {
        // platform: [{ required: true, message: "不能为空！" }],
        version_code: [{ required: true, message: "不能为空！" }],
        url: [{ required: true, message: "不能为空！" }]
        // flag: [{ required: true, message: "不能为空！" }]
      },
      ValidateRulesWei: {
        value: [{ required: true, message: "不能为空！" }]
      },
      AuthData: [
        {
          id: 0,
          title: "不强制更新"
        },
        {
          id: 1,
          title: "强制更新"
        }
      ]
    };
  },
  created() {
    this.InitData();
  },
  methods: {
    InitData() {
      this.$fetch("/backend/config-version/get-list").then(d => {
        this.ReviewData = d.data;
      });
      this.$fetch("/backend/system-setting/get-wechat").then(d => {
        // console.log(d.data.description);
        this.WeixinData.push({
          value: d.data.value,
          id: d.data.id
        });

        // this.WeixinData[0]=obj;
        // console.log(this.WeixinData);
      });
    },
    reviewQuitOpt(row) {
      this.CenterModal = {
        //更新的模态框
        modal: true,
        data: {
          platform: row.platform,
          version_code: row.version_code,
          url: row.url,
          flag: row.flag,
          id: row.id,
          describe: row.describe
        }
      };
    },
    reviewWeixin(row) {
      this.WeixinModal = {
        //更新的模态框
        modal: true,
        data: {
          value: this.WeixinData[0].value,
          id: this.WeixinData[0].id
        }
      };
    },
    ModalCancel() {
      this.CenterModal.modal = false;
      this.WeixinModal.modal = false;
      //取消
    },
    SubmitOver() {
      //确定
      // console.log(this.CenterModal.data);
      this.$post("/backend/config-version/edit", this.CenterModal.data).then(
        d => {
          if (d.status == 1) {
            (this.WeixinData = []), (this.CenterModal.modal = false);
            this.InitData();
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        }
      );
    },
    SubmitOverWei() {
      this.$post("/backend/system-setting/edit-wechat", {
        id: this.WeixinModal.data.id,
        value: this.WeixinModal.data.value
      }).then(d => {
        if (d.status == 1) {
          this.WeixinData = [];
          this.WeixinModal.modal = false;
          this.InitData();
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("修改失败");
        }
      });
    },
    AuditCancel() {}
  }
};
</script>

<style scoped>
</style>