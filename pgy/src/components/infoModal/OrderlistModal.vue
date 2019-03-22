<template>
  <Modal v-model="model1" title="催收记录" z-index="1" @on-ok="ok" @on-cancel="cancel">
    <div class="dingdanbody" id="dialogue_box">
      <div v-for="(item,index) in beizhuData" :key="index">
        <p class="bode_time">{{item.create_at}}</p>
        <p class="bode_name">{{item.type_name}} {{item.user_name}} {{item.fm}}</p>
        <p>{{item.content}}</p>
      </div>
    </div>
    <div slot="footer">
      <div class="foot">
        <Dropdown @on-click="changeMenu">
          <Button type="success">{{collection_default}}</Button>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item,index) in collection_type"
              :key="index"
              :name="item.id"
            >{{item.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input class="inp" v-model="value" placeholder="请输入..."/>
        <Button type="info" @click="ok">提交</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { getLocal, crtTimeFtt,crtTimeFM } from "@/util/util";

export default {
  name: "OrderlistModal",
  data() {
    return {
      beizhuData: [],
      model1: this.modalShow,
      RowUserData: [],
      Order: {
        modal: false,
        row: {}
      },
      value: "",
      collection_type: [
        { id: 1, title: "用户停机" },
        { id: 2, title: "用户失联" },
        { id: 3, title: "承诺还款" },
        { id: 4, title: "承诺展期" },
        { id: 5, title: "拒绝还款" }
      ],
      collection_default: "选择分类",
      collection_index: ""
    };
  },
  props: ["modalShow", "order_id"],
  watch: {
    modalShow(val) {
      this.model1 = val;
    },
    order_id(val) {
      this.$post("/backend/collection-record/list", {
        page: 1,
        num: 999,
        order_id: val
      }).then(d => {
        d.data.list.forEach((val, index) => {
           d.data.list[index].fm=crtTimeFM(val.create_at)
          d.data.list[index].create_at = crtTimeFtt(val.create_at);
        });
        this.beizhuData = d.data.list;
        this.nextTick();
      });
    }
  },

  methods: {
    nextTick() {
      this.$nextTick(function() {
        var div = document.getElementById("dialogue_box");
        div.scrollTop = div.scrollHeight;
      });
    },
    changeMenu(name) {
      this.collection_index = name;
      for (let i = 0; i < this.collection_type.length; i++) {
        if (name == this.collection_type[i].id) {
          this.collection_default = this.collection_type[i].title;
        }
      }
    },
    cancel() {
      this.$emit("CloseModal", false);
    },
    ok() {
      if (this.value == "") {
        this.$Message.error("内容不能为空");
      } else if (this.collection_index == "") {
        this.$Message.error("类型不能为空");
      } else {
        this.$post("/backend/collection-record/add", {
          order_id: this.order_id,
          content: this.value,
          collection_type: this.collection_index
        }).then(d => {
        });
        this.model1 = false;
        this.$emit("CloseModal", false);
      }
    },
    viewOrder(row) {
      this.Order.modal = true;
      this.Order.row = row;
    },
    OrderCancel() {
      this.Order.modal = false;
    }
  }
};
</script>
<style lang="less" scoped>
.foot {
  display: flex;
  .inp {
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
.dingdanbody {
  height: 200px;
  overflow: auto;
}
.bode_time {
  text-align: center;
}
.bode_name {
  color: #2db7f5;
}
</style>

