<template>
  <div>
    <Card>
      <div class="opt-between">
        <p class="title_top">统计详情</p>
        <Dropdown @on-click="changeMenu">
          <Button >{{collection_default}}<Icon type="ios-arrow-down"></Icon></Button>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item,index) in collection_type"
              :key="index"
              :name="item.id"
            >{{item.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div id="dataChart1" :style="{width: '100%', height: '300px'}"></div>
      <div class="opy-around">
        <div class="opt-box notes">
          <b class="circulargirl"></b>
          女
          <!-- </div>
          <div class="opt-box notes">-->
          <b class="circularboy"></b>
          男
        </div>
      </div>

      <!-- <div id="dataChart2" :style="{width: '100%', height: '300px'}"></div>
      <div class="opy-around">
        <div class="opt-box notes">
          <b class="circulargirl"></b>
          女
        
          <b class="circularboy"></b>
          男
        </div>
      </div>-->
      <div id="dataChart3" :style="{width: '100%' , height: '300px'}"></div>
      <div class="opy-around">
        <div class="opt-box notes">
          <b class="circulargirl"></b>
          女
          <!-- </div>
          <div class="opt-box notes">-->
          <b class="circularboy"></b>
          男
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "userAnalysis",
  data() {
    return {
      collection_type: [
        { id: "", title: "借款客户" },
        { id: "1", title: "逾期客户" }
      ],
      collection_index: "",
      collection_default:'借款客户'
    };
  },
  created() {},
  mounted() {
    this.creatAge();
  },
  watch: {
      collection_index(val){
         this.creatAge();
      }
  },
  methods: {
    changeMenu(name) {
      this.collection_index = name;
        for (let i = 0; i < this.collection_type.length; i++) {
        if (name == this.collection_type[i].id) {
          this.collection_default = this.collection_type[i].title;
        }
      }
    },
    creatAge: function() {
      this.$fetch("/backend/statistical/user-data-info", {
        type: this.collection_index
      }).then(d => {
        var data = d.data;
        let myChart1 = this.$echarts.init(
          document.getElementById("dataChart1")
        );
        // 绘制图表
        myChart1.setOption({
          title: {
            text: "客户年龄占比",
            subtext: "单位%",
            x: "center"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {},
          xAxis: [
            {
              type: "category",
              data: data.age
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "女",
              type: "bar",
              data: data.woman,
              itemStyle: {
                normal: {
                  color: "#ff9900" //颜色
                }
              }
            },
            {
              name: "男",
              type: "bar",
              data: data.man,
              itemStyle: {
                normal: {
                  color: "#2db7f5" //颜色
                }
              }
            }
          ]
        });
      });
      //图表2 城市  立刻更换

      //   this.$fetch("/backend/statistical/user-data-info", {
      //     type: ''
      //   }).then(d => {
      //     if (d.status == 1) {
      //       if (d.data.length == 0) {
      //         d.data = {
      //           age: [],
      //           woman: [0],
      //           man: [0]
      //         };
      //       }
      //       let myChart2 = this.$echarts.init(
      //         document.getElementById("dataChart2")
      //       );
      //       // 绘制图表
      //       myChart2.setOption({
      //         title: {
      //           text: "客户城市占比",
      //           subtext: "单位%",
      //           x:'center'
      //         },
      //         tooltip: {
      //           trigger: "axis"
      //         },
      //         legend: {},
      //         xAxis: [
      //           {
      //             type: "category",
      //             data: ["1月", "2月"]
      //           }
      //         ],
      //         yAxis: [
      //           {
      //             type: "value"
      //           }
      //         ],
      //         series: [
      //           {
      //             name: "女",
      //             type: "bar",
      //             data: [26, 59],
      //             itemStyle: {
      //               normal: {
      //                 color: "#ff9900" //颜色
      //               }
      //             }
      //           },
      //           {
      //             name: "男",
      //             type: "bar",
      //             data: [26, 59],
      //             itemStyle: {
      //               normal: {
      //                 color: "#2db7f5" //颜色
      //               }
      //             }
      //           }
      //         ]
      //       });
      //     }
      //   });

      // //星座

      this.$fetch("/backend/statistical/user-star", {
        type: this.collection_index
      }).then(d => {
        if (d.data.length == 0) {
          d.data = {
            star: [],
            woman: [0],
            man: [0]
          };
        }
        if (d.status == 1) {
          let myChart3 = this.$echarts.init(
            document.getElementById("dataChart3")
          );
          // 绘制图表
          myChart3.setOption({
            title: {
              text: "客户星座占比",
              subtext: "单位%",
              x: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {},
            xAxis: [
              {
                type: "category",
                data: d.data.star
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "女",
                type: "bar",
                data: d.data.woman,
                itemStyle: {
                  normal: {
                    color: "#ff9900" //颜色
                  }
                }
              },
              {
                name: "男",
                type: "bar",
                data: d.data.man,
                itemStyle: {
                  normal: {
                    color: "#2db7f5" //颜色
                  }
                }
              }
            ]
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.right_flex {
  display: flex;
  flex-direction: row-reverse;
}
.notes {
  line-height: 25px;
  z-index: 100;
  margin-top: -20px;
  margin-bottom: 20px;
}
.go {
  color: #358af5;
  position: relative;
  margin-right: 15px;
}
.go_icon {
  width: 8px;
  height: 13px;
  position: absolute;
  top: 5px;
  right: -15px;
}
.row_pad {
  padding: 40px 20px 20px 20px;
  margin-left: 35px;
}
.circularboy {
  display: block;
  background-color: #2db7f5;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-top: 5px;
  margin-left: 65px;
}
.circulargirl {
  display: block;
  background-color: #ff9900;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin-top: 5px;
  margin-right: 5px;
}
.opt-between{
    padding: 0 45px;
}
.title_top{

font-size:24px;

font-weight:500;
color:rgba(34,34,34,1);
line-height:21px;
}
</style>