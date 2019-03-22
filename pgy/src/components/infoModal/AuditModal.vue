<template>
  <div>
    <Modal
      ref="UserInfo"
      v-model="State"
      :width="1150"
      class="all-modal"
      :styles="{top: '50px'}"
      @on-cancel="CloseBtn"
    >
      <div class="head-area" slot="header">
        <div class="big-head">
          <h4>数据详情（{{UserInfo.name}}）</h4>
          <h6>来源：{{UserInfo.regForm}}</h6>&nbsp;&nbsp;
          <h6 class="red" v-show="UserInfo.black_type==1">机审拒绝黑名单&nbsp;&nbsp;</h6>
          <h6 class="red" v-show="UserInfo.black_type==2">人工拒绝黑名单&nbsp;&nbsp;</h6>
          <h6 class="red" v-show="UserInfo.black_type==3">贷后黑名单&nbsp;&nbsp;</h6>
          <h6 class="red" v-show="UserInfo.black_type==4">贷后黑名单&nbsp;&nbsp;</h6>
          <h6 class="red">{{UserInfo.black_operater}}&nbsp;&nbsp;{{UserInfo.black_remark}}</h6>
        </div>
      </div>
      <div slot="close">
        <Icon class="close-icon" type="ios-close-outline"></Icon>
      </div>
      <Row class="content">
        <Col span="4">
          <ul>
            <li>
              <a
                :class="{cur: NavData.baseInfo.cur}"
                href="javascript:;"
                @click="NavChange('baseInfo')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/inbox.png" alt>
                <div class="item_title">基本信息</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.Certification.cur}"
                href="javascript:;"
                @click="NavChange('Certification')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/allmail.png" alt>
                <div class="item_title">风控信息</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.management.cur}"
                href="javascript:;"
                @click="NavChange('management')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/sent.png" alt>
                <div class="item_title">认证信息</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.apply.cur}"
                href="javascript:;"
                @click="NavChange('apply')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/important.png" alt>
                <div class="item_title">申请信息</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.transaction.cur}"
                href="javascript:;"
                @click="NavChange('transaction')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/draft.png" alt>
                <div class="item_title">交易信息</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.collection.cur}"
                href="javascript:;"
                @click="NavChange('collection')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/spam.png" alt>
                <div class="item_title">催收记录</div>
              </a>
            </li>
            <li>
              <a
                :class="{cur: NavData.repayment.cur}"
                href="javascript:;"
                @click="NavChange('repayment')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/pandingicon.png" alt>
                <div class="item_title">还款计划</div>
              </a>
            </li>

            <li>
              <a
                :class="{cur: NavData.operation.cur}"
                href="javascript:;"
                @click="NavChange('operation')"
                class="opt-box item_body"
              >
                <img class="item_icon" src="../../assets/images/trash.png" alt>
                <div class="item_title">操作信息</div>
              </a>
            </li>
          </ul>
        </Col>

        <Col class="border_left" :span="20">
          <div class="right-box">
            <div class="withe" v-show="NavData.baseInfo.cur">
              <div class="info-area">
                <ul>
                  <li class="single-line">
                    <Row>
                      <Col span="4">
                        <p class="label">姓名</p>
                        <p class="value">
                          <span>{{UserInfo.name}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">性别</p>
                        <p class="value">
                          <span>{{UserInfo.gender}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">年龄</p>
                        <p class="value">
                          <span>{{UserInfo.age}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">生日</p>
                        <p class="value">
                          <span>{{UserInfo.birthday}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">身份证号</p>
                        <p class="value">
                          <span>{{UserInfo.card}}</span>
                        </p>
                      </Col>
                    </Row>
                  </li>
                  <li class="single-line">
                    <Row>
                      <Col span="4">
                        <p class="label">学历</p>
                        <p class="value">
                          <span>{{UserInfo.education}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">手机号</p>
                        <p class="value">
                          <span>{{UserInfo.phone}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">客户类型</p>
                        <p class="value">
                          <span>{{UserInfo.type}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">银行卡类型</p>
                        <p class="value">
                          <span>{{UserInfo.bank}}</span>
                        </p>
                      </Col>
                      <Col span="5">
                        <p class="label">银行卡卡号</p>
                        <p class="value">
                          <span>{{UserInfo.bankCard}}</span>
                        </p>
                      </Col>
                    </Row>
                  </li>
                  <li class="single-line">
                    <p class="label">联系人</p>
                    <p class="value long">
                      <Row>
                        <Col v-for="item in UserInfo.Relation" :key="item.name" :span="12">
                          <Row>
                            <Col class="lxr-line" :span="12">
                              {{item.relationship}}
                              <span>{{item.name}}</span>
                            </Col>
                            <Col class="lxr-line" :span="12">
                              手机号：
                              <span>{{item.phone}}</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </p>

                    <!-- <Row>
                      <Col v-for="(value, key) in AllInfo.moxie.yys" :key="key" :span="6">
                        <p class="line">
                          {{key}}-
                          <span class="num">{{value}}</span>次
                        </p>
                      </Col>
                    </Row>-->
                  </li>
                  <li class="single-line">
                    <Row>
                      <Col :span="12">
                        <p class="label">工作单位</p>
                        <div class="value long">
                          <p class="line">{{UserInfo.company}}</p>
                        </div>
                      </Col>
                      <Col :span="12">
                        <p class="label">居住地址</p>
                        <div class="value long">
                          <p class="line">{{UserInfo.address}}</p>
                        </div>
                      </Col>
                    </Row>
                  </li>

                  <li class="single-line">
                    <Row>
                      <Col :span="8">
                        <p class="label">身份证正面</p>
                        <p class="idcard-box" v-show="UserInfo.frontCard==''">暂无身份证正面</p>
                        <p class="idcard-box" v-show="UserInfo.frontCard!==''">
                          <img
                            :src="UserInfo.frontCard"
                            @click="CheckBigPic(UserInfo.frontCard)"
                            alt
                          >
                        </p>
                      </Col>
                      <Col :span="8">
                        <p class="label">身份证反面</p>
                        <p class="idcard-box" v-show="UserInfo.backCard!==''">
                          <img :src="UserInfo.backCard" @click="CheckBigPic(UserInfo.backCard)" alt>
                        </p>
                        <p class="idcard-box" v-show="UserInfo.backCard==''">暂无身份证反面</p>
                      </Col>
                      <Col :span="8">
                        <p class="label">活体照片</p>
                        <p class="idcard-box" v-show="UserInfo.liveCard!==''">
                          <img :src="UserInfo.liveCard" @click="CheckBigPic(UserInfo.liveCard)" alt>
                        </p>
                        <p class="idcard-box" v-show="UserInfo.liveCard==''">暂无图片</p>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </div>
            </div>
            <div v-show="NavData.Certification.cur">
              <div class="management_padding" v-show="fkwk">
                <h2>用户信息异常</h2>
              </div>
              <div class="management_padding" v-show="!fkwk">
                <Button @click="qzsx" style="float:right">刷新</Button>
                <h6 style="float:right;margin-top:8px;margin-right:8px;">最后一次更新时间：{{zhbb.create_at}}</h6>
                <div class="m_top">
                  <span class="top_name">基本信息</span>
                </div>
                <Row class="m_body">
                  <Col span="12">姓名：{{zhbb.base_info.id_name}}</Col>
                  <Col span="12">手机号：{{zhbb.base_info.phone}}</Col>
                  <!-- <Col span="12">申请地址：{{zhbb.base_info.formatted_address}}</Col> -->
                  <Col span="12">性别：{{zhbb.base_info.gender}}</Col>
                  <Col span="12">身份证号：{{zhbb.base_info.id_number}}</Col>
                  <!-- <Col span="12">经纬度：({{zhbb.base_info.lon}},{{zhbb.base_info.lat}})</Col> -->
                  <Col span="12">民族：{{zhbb.base_info.nation}}</Col>
                  <Col span="12">身份证地址：{{zhbb.base_info.address}}</Col>
                  <!-- <Col span="12">芝麻分：{{zhbb.base_info.zmop}}</Col> -->
                  <!-- <Col span="12">手机号归属地：{{zhbb.base_info.phone_address}}</Col> -->
                  <!-- <Col
                        span="12"
                  >绑定银行卡：{{zhbb.base_info.bank_card_no}}({{zhbb.base_info.bank_name}})</Col>-->
                  <!-- <Col span="12">注册时间：{{zhbb.base_info.formatted_address}}</Col> -->
                  <!-- <Col span="12">名下银行卡数：{{zhbb.base_info.user_have_bankcard_count}}</Col> -->
                </Row>
                <div class="m_top">
                  <span class="top_name">用户特征</span>
                </div>
                <Row class="m_body">
                  <Button
                    v-for="(val,key,index) in riskLevel"
                    :key="index"
                    :class="[val.cls,'btn_level']"
                  >
                    <p>{{val.name}}</p>
                    <p>{{val.time}}</p>
                  </Button>
                </Row>
                <div class="m_top">
                  <span class="top_name">黑名单信息</span>
                </div>
                <!-- <Row class="m_body">
                      <Col span="12">查询机构</Col>
                      <Col span="12">命中结果</Col>
                      <Col span="12">*融黑名单</Col>
                      <Col span="12">
                        <div v-show="zhbb.black_info.anrong_black==0">未命中</div>
                        <div class="red" v-show="zhbb.black_info.anrong_black==1">命中</div>
                      </Col>
                      <Col span="12">*盾名单</Col>
                      <Col span="12">
                        <div v-show="zhbb.black_info.youdun_black==0">未命中</div>
                        <div class="red" v-show="zhbb.black_info.youdun_black==1">命中</div>
                      </Col>
                      <Col span="12">*诚黑名单</Col>
                      <Col span="12">
                        <div v-show="zhbb.black_info.zhichen_black==0">未命中</div>
                        <div class="red" v-show="zhbb.black_info.zhichen_black==1">命中</div>
                      </Col>
                      <Col span="12">*贝黑名单</Col>
                      <Col span="12">
                        <div v-show="zhbb.black_info.tianbei_black==0">未命中</div>
                        <div class="red" v-show="zhbb.black_info.tianbei_black==1">命中</div>
                      </Col>
                </Row>-->
                <Row class="me_body">
                  <Col class="m_item_top" span="4">
                    <div>*融黑名单</div>
                    <div v-show="zhbb.black_info.anrong_black==0">未命中</div>
                    <div class="red" v-show="zhbb.black_info.anrong_black==1">命中</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>*盾名单</div>
                    <div v-show="zhbb.black_info.youdun_black==0">未命中</div>
                    <div class="red" v-show="zhbb.black_info.youdun_black==1">命中</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>*诚黑名单</div>
                    <div v-show="zhbb.black_info.zhichen_black==0">未命中</div>
                    <div class="red" v-show="zhbb.black_info.zhichen_black==1">命中</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>*贝黑名单</div>
                    <div v-show="zhbb.black_info.tianbei_black==0">未命中</div>
                    <div class="red" v-show="zhbb.black_info.tianbei_black==1">命中</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>*数黑名单</div>
                    <div v-show="zhbb.black_info.zheshu_black==0">未命中</div>
                    <div class="red" v-show="zhbb.black_info.zheshu_black==1">命中</div>
                  </Col>
                </Row>

                <div class="m_top">
                  <span class="top_name">信贷行为</span>
                </div>
                <Row class="me_body">
                  <Col class="m_item_top" span="4">
                    <div>通过率</div>
                    <div>{{zhbb.face_info.loan_detail.passingrate}}%</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>申请总数</div>
                    <div>{{zhbb.face_info.loan_detail.loan_platform_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>借款总数</div>
                    <div>{{zhbb.face_info.loan_detail.actual_loan_platform_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>还款总数</div>
                    <div>{{zhbb.face_info.loan_detail.repayment_platform_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>还款笔数</div>
                    <div>{{zhbb.face_info.loan_detail.repayment_times_count}}</div>
                  </Col>
                </Row>
                <div id="myChart" :style="{width: '900px', height: '300px'}"></div>
                <div class="m_top">
                  <span class="top_name">逾期信息</span>
                </div>
                <Row class="me_body">
                  <Col class="m_item_top" span="8">
                    <div>借*宝</div>
                    <div v-show="zhbb.overdue_info.jie_dai_bao==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.jie_dai_bao==1">逾期</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>无**条</div>
                    <div v-show="zhbb.overdue_info.wu_you==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.wu_you==1">逾期</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>今*到</div>
                    <div v-show="zhbb.overdue_info.jin_jie_dao==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.jin_jie_dao==1">逾期</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>*房</div>
                    <div v-show="zhbb.overdue_info.mi_fang==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.mi_fang==1">逾期</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>*融</div>
                    <div v-show="zhbb.overdue_info.an_rong==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.an_rong==1">逾期</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>*诚</div>
                    <div v-show="zhbb.overdue_info.zhi_chen==0">未逾期</div>
                    <div class="red" v-show="zhbb.overdue_info.zhi_chen==1">逾期</div>
                  </Col>
                  <!-- <Col class="m_item_top" span="8">
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                      </Col>
                      <Col class="m_item_top" span="8">
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                  </Col>-->
                </Row>
                <div class="m_top">
                  <span class="top_name">设备信息</span>
                </div>
                <Row class="m_body" v-for="(val,index) in zhbb.face_info.devices_list" :key="index">
                  <Col span="9" class="opt-box">
                    <img class="iphone_user" src="../../assets/images/iphone_user.png" alt>
                    <div>
                      <div style="color:#2DB7F5;padding:5px 0 0 0;">手机型号：{{val.device_name}}</div>
                      <div>设备ID：{{val.device_id}}</div>
                      <div></div>
                    </div>
                  </Col>
                  <Col span="5">
                    <p class="sbpa">最近使用时间：{{val.device_last_use_date}}</p>
                    <p>网络类型：{{val.device_detail.network_type}}</p>
                  </Col>
                  <Col span="5">
                    <p class="sbpa">安装极多借贷app：{{zhbb.device_info.app_instalment_count}}</p>
                    <p>设备使用用户数：:{{val.device_link_id_count}}人</p>
                  </Col>
                  <Col span="5">
                    <p class="sbpa">
                      是否越狱：
                      <span v-show="val.device_detail.is_rooted==0">否</span>
                      <span v-show="val.device_detail.is_rooted==1">是</span>
                    </p>
                  </Col>
                </Row>

                <!-- <div class="m_top">
                  <span class="top_name">共债报告</span>
                </div>
                <Row class="me_body">
                  <Col class="m_item_top" span="4">
                    <div>申请数</div>
                    <div>{{zhbb.report_info.apply_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="5" setof="1">
                    <div>通过率</div>
                    <div>{{zhbb.report_info.accept_rate}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>当前逾期总金额</div>
                    <div>{{zhbb.report_info.overdue_money}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>逾期次数</div>
                    <div>{{zhbb.report_info.overdue_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="5">
                    <div>正常还款次数</div>
                    <div>{{zhbb.report_info.normal_count}}</div>
                  </Col>
                 
                </Row>
                <Table :columns="columns1" :data="data1" :loading="loading"></Table>

                <div class="m_top">
                  <span class="top_name">用户信用被查询信息</span>
                </div>
                <Row class="me_body">
                  <Col class="m_item_top" span="8">
                    <div>用户信用被查询信息次数</div>
                    <div>{{zhbb.credit_info.query_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>近三个月次数</div>
                    <div>{{zhbb.credit_info.third_month_count}}</div>
                  </Col>
                  <Col class="m_item_top" span="8">
                    <div>近半年次数</div>
                    <div>{{zhbb.credit_info.six_month_count}}</div>
                  </Col>
              
                </Row>
                <Table :columns="columns2" :data="data2" :loading="loading"></Table>-->
              </div>
            </div>
            <div v-show="NavData.management.cur">
              <div class="management_padding">
                <Tabs value="name1">
                  <!-- <TabPane label="综合报告" name="name1">
                    111
                  </TabPane>-->
                  <TabPane label="通讯录" name="name1">
                    <div class="ooder_text" v-show="txl.status==0">
                      <img src="../../assets/images/noorder.png" alt>
                      <div>用户没有认证</div>
                    </div>
                    <div v-show="txl.status==1">
                      <!-- <div style="float:right;margin-right:5px">获取于{{dx.data.lists[0].create_at}}</div> -->
                      <div class="m_top">
                        <span class="top_name">通讯录列表</span>
                      </div>
                      <Table border :columns="txlListcolumns" :data="txlList"></Table>

                      <Page
                        style="float:right"
                        :current="txlListPage.page"
                        :total="txlListPage.count"
                        placement="top"
                        @on-change="txlListChangePage"
                      ></Page>
                    </div>
                  </TabPane>
                  <TabPane label="短信" name="name2">
                    <div class="ooder_text" v-show="dx.status==0">
                      <img src="../../assets/images/noorder.png" alt>
                      <div>用户没有认证</div>
                    </div>
                    <div v-show="dx.status==1">
                      <!-- <div style="float:right;margin-right:5px">获取于{{dx.data.lists[0].create_at}}</div> -->
                      <div class="m_top">
                        <span class="top_name">短信列表</span>
                      </div>
                      <Table border :columns="msgListcolumns" :data="msgList"></Table>
                      <Page
                        style="float:right"
                        :current="smsPage.page"
                        :total="smsPage.count"
                        placement="top"
                        @on-change="smsChangePage"
                      ></Page>
                    </div>
                  </TabPane>
                  <TabPane label="运营商" name="name3" @click="carrier">
                    <div class="ooder_text" v-show="yys.status==0">
                      <img src="../../assets/images/noorder.png" alt>
                      <div>用户没有认证</div>
                    </div>
                    <div v-show="yys.status==1">
                      <a :href="yys.url" target="_blank">
                        <h2>点击查看运营商报告</h2>
                      </a>
                    </div>
                    <!-- <iframe v-if="yys.status==1" class="iframe" :src="yys.url">
                      <p>你的浏览器不支持，推荐使用谷歌浏览器查看。</p>
                    </iframe>-->
                    <!-- <a :href="yys.url" target="_Blank" v-if="yys.status==1">
                      <div class="ooder_text">
                        <img src="../../assets/images/thisorder.png" alt>
                        <div>点击查看</div>
                      </div>
                    </a>-->
                  </TabPane>
                  <TabPane label="淘宝" name="name4">
                    <div class="ooder_text" v-show="tb.status==0">
                      <img src="../../assets/images/noorder.png" alt>
                      <div>用户没有认证</div>
                    </div>
                    <div v-show="tb.status==1">
                      <a :href="tb.url" target="_blank">
                        <h2>点击查看淘宝报告</h2>
                      </a>
                    </div>
                    <!-- <iframe v-if="tb.status==1" class="iframe" :src="tb.url">
                      <p>你的浏览器不支持，推荐使用谷歌浏览器查看。</p>
                    </iframe>-->
                    <!-- <a :href="tb.url" target="_Blank" v-if="tb.status==1">
                      <div class="ooder_text">
                        <img src="../../assets/images/thisorder.png" alt>
                        <div>点击查看</div>
                      </div>
                    </a>-->
                  </TabPane>
                  <TabPane label="QQ" name="name5">
                    <div class="ooder_text" v-if="qq.status==0">
                      <img src="../../assets/images/noorder.png" alt>
                      <div>用户没有认证</div>
                    </div>
                    <div v-if="qq.status==1">
                      <div style="float:right;margin-right:5px">获取于{{qq.qqUserInfo.createTime}}</div>
                      <div class="m_top">
                        <span class="top_name">基本信息</span>
                      </div>
                      <Row class="m_body">
                        <Col span="12">QQ号：{{qq.qqUserInfo.qqNum}}</Col>
                        <Col span="12">性别：{{qq.qqUserInfo.sex}}</Col>
                        <Col span="12">手机号:{{qq.qqUserInfo.mailcellphone}}</Col>
                        <Col span="12">年龄：{{qq.qqUserInfo.age}}</Col>
                        <Col span="12">QQ昵称：{{qq.qqUserInfo.nickName}}</Col>
                        <Col span="12">生日：{{qq.qqUserInfo.birthYear}}-{{qq.qqUserInfo.birthday}}</Col>
                        <Col span="12">QQ空间名称:{{qq.qqUserInfo.spaceName}}</Col>
                        <Col span="12">星座:{{qq.qqUserInfo.constellation}}</Col>
                        <!-- <Col span="12">QQ空间描述：{{qq.qqUserInfo.desciption}}</Col> -->
                        <!-- <Col span="12">生肖：{{qq.qqUserInfo.id_name}}</Col> -->
                        <!-- <Col span="12">QQ空间签名：{{qq.qqUserInfo.signature}}</Col> -->
                        <!-- <Col span="12">Q龄：{{qq.qqUserInfo.id_name}}</Col> -->
                        <Col
                          span="12"
                        >住址：{{qq.qqUserInfo.country}}{{qq.qqUserInfo.province}}{{qq.qqUserInfo.city}}</Col>
                        <!-- <Col span="12">QQ等级：{{qq.qqUserInfo.id_name}}</Col> -->
                        <!-- <Col span="12">邮箱：{{qq.qqUserInfo.id_name}}</Col> -->
                        <Col span="12">血型：{{qq.qqUserInfo.bloodType}}</Col>
                        <Col span="12">职业：{{qq.qqUserInfo.career}}</Col>
                        <Col span="12">婚姻状况：{{qq.qqUserInfo.marriage}}</Col>
                        <!-- <Col span="12">学校：{{qq.qqUserInfo.id_name}}</Col> -->
                        <Col span="12">爱人QQ号：{{qq.qqUserInfo.lover}}</Col>
                        <Col span="12">公司名称：{{qq.qqUserInfo.company}}</Col>
                        <!-- <Col span="12">个性签名：{{qq.qqUserInfo.id_name}}</Col> -->
                        <Col
                          span="12"
                        >公司地址：{{qq.qqUserInfo.companyCity}}{{qq.qqUserInfo.companyDetailAddress}}</Col>
                        <!-- <Col span="12">兴趣爱好：{{qq.qqUserInfo.id_name}}</Col> -->
                      </Row>

                      <div class="m_top">
                        <span class="top_name">QQ群信息</span>
                      </div>
                      <Table height="400" :columns="quncolumns" :data="qunData" :loading="loading"></Table>
                      <div class="m_top">
                        <span class="top_name">QQ好友信息</span>
                      </div>
                      <Table
                        :columns="haoyoucolumns"
                        :data="haoyoulists"
                        :loading="loading"
                      ></Table>
                      <Page
                        style="float:right"
                        :current="haoyouPage.page"
                        :total="haoyouPage.count"
                        placement="top"
                        @on-change="qqListChangePage"
                      ></Page>

                      <div class="m_top">
                        <span class="top_name">QQ最近联系人信息</span>
                      </div>
                      <Table
                        height="400"
                        :columns="lianxicolumns"
                        :data="lianxiData"
                        :loading="loading"
                      ></Table>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div v-show="NavData.apply.cur">
              <Table :columns="UserCol" :data="UserData" :loading="loading"></Table>
              <div class="page-box">
                <Page
                  :current="applyPage.cur"
                  :page-size="applyPage.size"
                  :total="applyPage.count"
                  placement="top"
                  @on-change="ApplyChangePage"
                  @on-page-size-change="ApplyChangeSize"
                  show-sizer
                ></Page>
              </div>
              <!-- <div class="page-box">
            <Page :current="Page.cur"
                  :page-size="Page.size"
                  :total="Page.count"
                  placement="top"
                  @on-change="ChangePage"
              @on-page-size-change="ChangeSize" show-sizer></Page>-->
            </div>
            <div v-show="NavData.transaction.cur" class="transaction_body">
              <Card class="transaction_card">
                <div class="transaction_top opt-between">
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>借款总金额</p>
                      <p class="font_num">{{total.loan_amount}}</p>
                    </div>
                    <div>
                      <p>借款总笔数</p>
                      <p class="font_num">{{total.count}}</p>
                    </div>
                  </div>
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>展期总金额</p>
                      <p class="font_num">{{total.delay_amount}}</p>
                    </div>
                    <div>
                      <p>展期总笔数</p>
                      <p class="font_num">{{total.delay_count}}</p>
                    </div>
                  </div>
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>逾期总金额</p>
                      <p class="font_num">{{total.reduce_amount}}</p>
                    </div>
                    <div>
                      <p>逾期总笔数</p>
                      <p class="font_num">{{total.delay}}</p>
                    </div>
                  </div>
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>逾期违约金</p>
                      <p class="font_num">{{total.delay_price}}</p>
                    </div>
                    <div>
                      <p>逾期总时间</p>
                      <p class="font_num">{{total.delay_day}}</p>
                    </div>
                  </div>
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>应还金额</p>
                      <p class="font_num">{{total.left_amount}}</p>
                    </div>
                    <div>
                      <p>未还本金</p>
                      <p class="font_num">{{total.left_price}}</p>
                    </div>
                  </div>
                  <div class="left_border">
                    <div class="transaction_top_first">
                      <p>展期费金额</p>
                      <p class="font_num">{{total.delay_fee}}</p>
                    </div>
                    <div>
                      <p>已还总金额</p>
                      <p class="font_num">{{total.return_amount}}</p>
                    </div>
                  </div>
                </div>
              </Card>
              <!-- 还款状态 -->
              <Card class="transaction_card" v-for="(item,index) in order_list" :key="index">
                <div class="transaction_main">
                  <Row class="padding_15 top">
                    <Col class="green" span="3" v-show="item.status==1">
                      <p>借款中</p>
                      <p>{{item.left_days}}天后还款</p>
                    </Col>
                    <Col class="red" span="3" v-show="item.status==3">
                      <p>逾期中</p>
                      <p>逾期{{item.left_days}}天</p>
                    </Col>
                    <Col class="red" span="3" v-show="item.status==2">
                      <p>展期中</p>
                      <p>{{item.left_days}}天后还款</p>
                    </Col>
                    <Col class="blue" span="3" v-show="item.status==4">
                      <p>已还款</p>
                      <p v-show="item.delay_day!=0">逾期{{item.delay_day}}天</p>
                    </Col>
                    <Col span="2" v-show="item.status==4">
                      <p>已还金额</p>
                      <p>{{item.back_price}}</p>
                    </Col>
                    <Col span="2" v-show="item.status==1||item.status==2||item.status==3">
                      <p>应还金额</p>
                      <p>{{item.back_price}}</p>
                    </Col>
                    <Col span="2">
                      <p>总天数</p>
                      <p>{{item.loan_days}}</p>
                    </Col>
                    <Col span="2">
                      <p>逾期总天数</p>
                      <p>{{item.reduce_days}}</p>
                    </Col>
                    <Col span="2">
                      <p>总违约金</p>
                      <p>{{item.delay_price}}</p>
                    </Col>
                    <Col span="3">
                      <p>应还日期</p>
                      <p>{{item.anount_time}}</p>
                    </Col>
                    <Col span="3">
                      <p>实际还款日</p>
                      <p>{{item.return_time}}</p>
                    </Col>
                    <Col span="2">
                      <p>账单金额</p>
                      <p>{{item.amount_due}}</p>
                    </Col>
                    <Col span="2">
                      <p>审核员</p>
                      <p>{{item.auditor_name}}</p>
                    </Col>
                    <Col span="2">
                      <p>催收员</p>
                      <p>{{item.recruiter_name}}</p>
                    </Col>
                  </Row>

                  <Row class="padding_15 border_top">
                    <Col class="blue" span="3">
                      <p>
                        <img class="zt" src="../../assets/images/jie.png" alt>
                      </p>
                    </Col>
                    <Col span="2">
                      <p>借款金额</p>
                      <p>{{item.loan_amount}}</p>
                    </Col>
                    <Col span="2">
                      <p>借款天数</p>
                      <p>{{item.loan_day}}</p>
                    </Col>
                    <Col span="2">
                      <p>逾期天数</p>
                      <p>{{item.delay_day}}</p>
                    </Col>
                    <Col span="2">
                      <p>违约金</p>
                      <p>{{item.delay_price}}</p>
                    </Col>
                    <Col span="3">
                      <p>借出日期</p>
                      <p>{{item.loan_time}}</p>
                    </Col>
                    <Col span="3">
                      <p>还款日期</p>
                      <p>{{item.repay_time}}</p>
                    </Col>
                  </Row>
                  <Row
                    class="padding_15 border_top"
                    v-for="(item,index) in item.delay_list"
                    :key="index"
                  >
                    <Col class="blue" span="3">
                      <p>
                        <img class="zt" src="../../assets/images/zhan.png" alt>
                      </p>
                    </Col>
                    <Col span="2">
                      <p>展期金额</p>
                      <p>{{item.delay_amount}}</p>
                    </Col>
                    <Col span="2">
                      <p>展期天数</p>
                      <p>{{item.days}}</p>
                    </Col>
                    <Col span="2">
                      <p>逾期天数</p>
                      <p>{{item.overdue_days}}</p>
                    </Col>
                    <Col span="2">
                      <p>违约金</p>
                      <p>{{item.violate_amount}}</p>
                    </Col>
                    <Col span="3">
                      <p>开始日期</p>
                      <p>{{item.delay_begin_time}}</p>
                    </Col>
                    <Col span="3">
                      <p>结束日期</p>
                      <p>{{item.delay_end_time}}</p>
                    </Col>
                    <Col span="2">
                      <p>展期费</p>
                      <p>{{item.fee}}</p>
                    </Col>
                  </Row>
                  <Row
                    class="padding_15 border_top"
                    v-for="(item,index) in item.return_list"
                    :key="index"
                  >
                    <Col class="blue" span="3">
                      <p>
                        <img class="zt" src="../../assets/images/huan.png" alt>
                      </p>
                    </Col>
                    <div>
                      <Col span="2">
                        <p>还款金额</p>
                        <p>{{item.price}}</p>
                      </Col>
                      <Col span="6">
                        <p>还款时间</p>
                        <p>{{item.update_at}}</p>
                      </Col>
                    </div>
                  </Row>
                </div>
              </Card>
              <div class="page-box">
                <Page
                  :current="transactionPage.page"
                  :page-size="transactionPage.num"
                  :total="transactionPage.count"
                  placement="top"
                  @on-change="transactionPageClick"
                ></Page>
              </div>
            </div>

            <div class="operation_body" v-show="NavData.repayment.cur">
              <h2 class="transaction_card" v-show="repaymentList==''">没有分期订单</h2>
              <div class="transaction_card" v-for="(item,index) in repaymentList" :key="index">
                <div class="m_top">
                  <span class="top_name">{{item.order_id}}</span>
                </div>
                <div>
                  <Table :columns="repaymentCol" :data="item.data" :loading="loading"></Table>
                </div>
              </div>
            </div>
            <!-- 操作信息 -->
            <div class="operation_body" v-show="NavData.collection.cur">
              <h2 class="transaction_card" v-show="beizhuData==''">没有催收记录</h2>
              <div class="dingdanbody" id="dialogue_box">
                <div v-for="(item,index) in beizhuData" :key="index">
                  <p class="bode_time">{{item.create_at}}</p>
                  <p class="bode_name">{{item.type_name}} {{item.fm}}</p>
                  <p>{{item.content}}</p>
                </div>
              </div>
            </div>
            <div class="operation_body" v-show="NavData.operation.cur">
              <Card class="transaction_card">
                <div class="operation_top">
                  <Row>
                    <Col span="2" offset="1">
                      <p class="prominent">注册</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.reg==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.reg==0" class="prominent_small red">未认证</p>
                    </Col>
                    <Col span="2" offset="2">
                      <p class="prominent">有盾</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.auth_face==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.auth_face==0" class="prominent_small red">未认证</p>
                    </Col>
                    <Col span="2" offset="2">
                      <p class="prominent">淘宝</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.auth_taobao==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.auth_taobao==0" class="prominent_small red">未认证</p>
                    </Col>
                    <Col span="2" offset="2">
                      <p class="prominent">运营商</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.auth_mno==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.auth_mno==0" class="prominent_small red">未认证</p>
                    </Col>
                    <Col span="2" offset="2">
                      <p class="prominent">QQ</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.auth_qq==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.auth_qq==0" class="prominent_small red">未认证</p>
                    </Col>
                    <Col span="2" offset="2">
                      <p class="prominent">银行卡</p>
                      <p class="bor_bottom"></p>
                      <p v-show="user_operate.auth_card==1" class="prominent_small green">已认证</p>
                      <p v-show="user_operate.auth_card==0" class="prominent_small red">未认证</p>
                    </Col>
                  </Row>
                </div>
              </Card>
              <div class="operation_main">
                <Row>
                  <Col span="12">
                    <Card class="record">
                      <div>
                        <p></p>
                        <p class="left_border">备注记录</p>
                        <p></p>
                      </div>
                      <div class="main_data" v-for="(item,index) in Remarks" :key="index">
                        <p class="opteration_time">{{item.create_at}}</p>
                        <p class="opteration_man">{{item.admin_name}}:{{item.fm}}</p>
                        <p>{{item.content}}</p>
                      </div>
                    </Card>
                  </Col>
                  <Col span="12">
                    <Card class="record">
                      <p></p>
                      <p class="left_border">操作记录</p>
                      <p></p>
                      <div class="main_data" v-for="(item,index) in operation_data" :key="index">
                        <p class="opteration_time">{{item.create_at}}</p>
                        <p class="opteration_man">
                          <span v-show="item.admin_name==''">用户</span>
                          <span v-show="item.admin_name!=''">{{item.admin_name}}</span>
                          {{item.fm}}
                        </p>
                        <p>{{item.content}}</p>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div slot="footer" class="footer-area">
        <div class="btn-box">
          <Button type="primary" style="margin-left: 0" v-show="IsEdit" @click="SubOpt">保存</Button>
          <Button type="warning" v-show="IsEdit">取消</Button>
          <Button
            v-for="item in ButtonAll"
            :disabled="PassBtnStatus(item.class)"
            :key="item.id"
            :type="item.color"
            @click="EventTune(item.class)"
          >{{item.name}}</Button>
          <p v-show="IsPass.status && IsPass.isLoan" class="inline-block">
            <Button :type="SetLoan.type" @click="SetLoanOpt">{{SetLoan.name}}</Button>
          </p>
          <p v-show="IsPass.isLimit" class="inline-block">
            <Button
              type="primary"
              v-show="IsPass.status && !Limit.status"
              @click="GiveLimitOpt"
            >{{ Limit.text }}</Button>
            <Input
              ref="LimitInput"
              v-show="Limit.status"
              v-model="Limit.value"
              autofocus
              @on-enter="SubmitLimit"
              style="width: 80px;display: inline-block"
            />
          </p>
          <Button type="info" @click="RemarkOpt">添加备注</Button>
          <p id="clipBtn" class="clipBtn" ref="ClipBox" :src="LoanCopyInfo"></p>
        </div>
        <!-- <Page
          :current="CurrentPage"
          :total="TotalPage"
          :page-size="1"
          @on-change="ChangePage"
          simple
        ></Page>-->
      </div>
      <Spin size="large" fix v-if="loading"></Spin>
    </Modal>
    <Modal v-model="ModeModal.modal" class="beizhu" title="备注">
      <Input
        v-model="ModeModal.value"
        type="textarea"
        :autosize="{minRows: 3,maxRows: 7}"
        placeholder="请输入。。。"
      />

      <div slot="footer">
        <Button type="text" @click="ModalCancel" size="large">取消</Button>
        <Button type="primary" @click="AddOver" size="large">保存</Button>
      </div>
    </Modal>
    <Modal v-model="WithholdModal.modal" class="beizhu" title="代扣还款">
      <!-- <Input
        v-model="WithholdModal.value"
        :disabled='true'
      />-->
      <div>将会从用户绑定的银行卡进行扣款
        <div class="text_Primary">{{this.WithholdModal.value}}</div>元
      </div>
      <div slot="footer">
        <Button type="text" @click="WithholdCancel" size="large">取消</Button>
        <Button type="primary" @click="WithholdOver" size="large">确定</Button>
      </div>
    </Modal>
    <Modal v-model="CenterModal.modal" title="提示">
      <div>本次刷新将获取用户最新的信用报告，本次操作将会扣费。</div>
      <div slot="footer">
        <Button type="text" @click="ModalCancelz" size="large">取消</Button>
        <Button type="primary" @click="SubmitOver" size="large">确定</Button>
      </div>
    </Modal>
    <Modal v-model="black.modal" class="beizhu" title="拉黑原因">
      <Input
        v-model="black.value"
        type="textarea"
        :autosize="{minRows: 3,maxRows: 7}"
        placeholder="请输入拉黑原因。。。"
      />
      <div slot="footer">
        <Button type="text" @click="blackCancel" size="large">取消</Button>
        <Button type="primary" @click="blackOver" size="large">确定</Button>
      </div>
    </Modal>
    <Modal :width="850" v-model="qqqun.modal" class="beizhu" title="QQ群成员">
      <Table :columns="qqqunCol" :data="qqqunData"></Table>
      <div class="page-box">
        <Page
          :current="group.cur"
          :page-size="group.size"
          :total="group.count"
          placement="top"
          @on-change="groupChangePage"
        ></Page>
      </div>
      <div slot="footer">
        <Button type="primary" @click="qqqunOver" size="large">确定</Button>
      </div>
    </Modal>

    <Modal v-model="Tips.modal" class="beizhu" title="选择还款方式">
      <!-- <div class="tips">
        <img class="tipsImg" v-show="Tips.status==1" src="../../assets/images/ok.png">
        <img class="tipsImg" v-show="Tips.status==2" src="../../assets/images/no.png">
        <div v-show="Tips.status==1">确认通过？</div>
        <div v-show="Tips.status==2">确认拒绝？</div>
      </div>-->
      <RadioGroup v-model="stage" type="button" size="large">
        <Radio label="1">
          <span>&nbsp;&nbsp;&nbsp;分期&nbsp;&nbsp;&nbsp;</span>
        </Radio>
        <Radio label="2">
          <span>&nbsp;&nbsp;&nbsp;标准&nbsp;&nbsp;&nbsp;</span>
        </Radio>
      </RadioGroup>
      <div slot="footer">
        <Button type="text" @click="TipsCancel" size="large">取消</Button>
        <Button type="primary" @click="TipsOver" size="large">确认</Button>
      </div>
    </Modal>
    <Modal v-model="blackOut.modal" class="beizhu" title="确认拒绝">
      <!-- <div>拒绝或加入黑名单</div> -->
      <RadioGroup v-model="animal" type="button" size="large">
        <Radio label="1">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拒绝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </Radio>
        <Radio label="2">
          <span>人工黑名单</span>
        </Radio>
        <Radio label="4">
          <span>临时黑名单</span>
        </Radio>
        <Input
          v-show="this.animal!=1"
          style="margin-top:10px;width:480px;"
          v-model="blackOut.remark"
          type="textarea"
          placeholder="请输入..."
        />
      </RadioGroup>
      <div slot="footer">
        <Button type="text" @click="blackOutCancel" size="large">取消</Button>
        <Button type="primary" @click="blackOutOver" size="large">确认</Button>
      </div>
    </Modal>
    <Modal v-model="removeBlack.modal" class="heimingdan" title="移除黑名单">
      <div>确定移除黑名单吗？</div>
      <div slot="footer">
        <Button type="text" @click="RemoveBlackCancel" size="large">取消</Button>
        <Button type="primary" @click="removeBlackOver" size="large">确定</Button>
      </div>
    </Modal>
    <BigPic
      :modalShow="BigPic.modal"
      :InitData="BigPic.img"
      :maxWidth="800"
      titleTxt="身份证正反面"
      @CloseModal="CloseBigPic"
    ></BigPic>
    <DelayModal
      :modalShow="Delay.modal"
      :initData="Delay.data"
      @CloseModal="DelayCancel"
      @SubModal="DelaySub"
    ></DelayModal>
    <RepayModal
      :modalShow="Repay.modal"
      :initData="Repay.data"
      @CloseModal="RepayCancel"
      @SubModal="RepaySub"
    ></RepayModal>
    <LoanModal
      :modalShow="Loan.modal"
      :initData="Loan.data"
      @CloseModal="LoanCancel"
      @SubModal="LoanSub"
    ></LoanModal>
    <Repayment
      :State="Repayment.modal"
      :user_id="Repayment.user_id"
      :orderId="Repayment.orderId"
      @CloseModal="repayment"
    ></Repayment>
  </div>
</template>

<script>
import { crtTimeFtt, crtTimeFM } from "@/util/util";
import Area from "@/util/area.json";
import Clipboard from "clipboard";
import BigPic from "@/components/infoModal/BigPic";
import DelayModal from "@/components/infoModal/DelayModal";
import RepayModal from "@/components/infoModal/RepayModal";
import LoanModal from "@/components/infoModal/LoanModal";
import Repayment from "@/components/infoModal/Repayment";

export default {
  name: "AuditModal",
  components: {
    BigPic,
    DelayModal,
    RepayModal,
    LoanModal,
    Repayment
  },
  data() {
    return {
      haoyouPage: {
        page: 1,
        size: 10,
        count: 0
      },
      txlListPage: {
        page: 1,
        size: 10,
        count: 0
      },
      smsPage: {
        page: 1,
        size: 10,
        count: 0
      },
      Repayment: {
        modal: false,
        orderId: "",
        user_id: ""
      },
      fkwk: false,
      repaymentCol: [
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
          render: (h, params) => {
            if (params.row.status == 0) {
              return "未还款";
            } else if (params.row.status == 1) {
              return "已还款";
            }
          }
        }
      ],
      repaymentList: [
        {
          order_id: "",
          price: "",
          return_time: "",
          status: ""
        }
      ],
      beizhuData: [],
      blackOut: {
        modal: false,
        remark: ""
      },
      stage: "1",
      animal: "1",
      qqgroupId: "",
      removeBlack: {
        modal: false
      },
      Tips: {
        modal: false,
        status: 1
      },
      msgListcolumns: [
        {
          title: "短信种类",
          width: "90",
          align: "center",
          key: "type"
        },
        {
          title: "对方号码",
          width: "130",
          align: "center",
          key: "phone"
        },
        {
          title: "发送时间",
          width: "180",
          align: "center",
          key: "sms_at"
        },
        {
          title: "短信内容",
          align: "center",
          key: "content"
        }
      ],
      msgList: [],
      dx: {
        data: {
          lists: [{ create_at: 0 }]
        }
      },
      group: {
        count: 0,
        cur: 1,
        size: 10
      },
      lianxicolumns: [
        {
          title: "序号",
          width: "70",
          align: "center",
          key: "index"
        },
        {
          title: "QQ号",
          // width:'70',
          align: "center",
          key: "contactNum"
        },
        {
          title: "QQ昵称",
          // width:'70',
          align: "center",
          key: "contactName"
        },
        {
          title: "最近一次联系时间",
          // width:'70',
          align: "center",
          key: "contactTime"
        }
      ],
      lianxiData: [],
      haoyouData: [],
      haoyoulists:[],
      haoyoucolumns: [
        {
          title: "序号",
          width: "70",
          align: "center",
          key: "index"
        },
        {
          title: "QQ号",
          // width:'70',
          align: "center",
          key: "relationQqNum"
        },
        {
          title: "QQ昵称",
          // width:'70',
          align: "center",
          key: "nickName"
        },
        {
          title: "亲密度分值",
          // width:'70',
          align: "center",
          key: "intimacyScore"
        },
        {
          title: "好友所在分组",
          // width:'70',
          align: "center",
          key: "groupName"
        }
      ],
      qunData: [],
      quncolumns: [
        {
          title: "序号",
          width: "70",
          align: "center",
          key: "index"
        },
        {
          title: "QQ群号",
          align: "center",
          key: "groupid"
        },

        {
          title: "QQ群名称",
          align: "center",
          key: "groupName"
        },
        {
          title: "QQ群人数",
          align: "center",
          key: "totalMember"
        },
        {
          title: "群内非朋友人数",
          align: "center",
          key: "notFriendMember"
        },
        {
          title: "是否还在群里",
          align: "center",
          key: "status"
        },
        {
          title: "操作",
          align: "center",
          key: "groupid",
          render: (h, params) => {
            return h(
              "div",
              this.$renderBtn(h, params, [
                { class: "showContent", name: "查看群成员", color: "info" }
              ])
            );
          }
        }
      ],
      columns1: [
        {
          title: "申请日期",
          align: "center",
          key: "applyDate"
        },
        {
          title: "申请地点",
          align: "center",
          key: "creditAddress"
        },
        {
          title: "申请金额",
          align: "center",
          key: "loanMoney"
        },
        {
          title: "申请状态",
          align: "center",
          key: "applyResult"
        },
        {
          title: "还款状态",
          align: "center",
          key: "loanStatus"
        },
        {
          title: "借款时间",
          align: "center",
          key: "applyDate"
        },
        {
          title: "查询机构",
          align: "center",
          key: "remark"
        }
      ],
      columns2: [
        {
          title: "查询时间",
          align: "center",
          key: "queryDate"
        },
        {
          title: "查询会员类型",
          align: "center",
          key: "memberType"
        },
        {
          title: "查询类别",
          align: "center",
          key: "queryType"
        },
        {
          title: "备注",
          align: "center",
          key: "remark"
        }
      ],
      data1: [],
      data2: [],
      ModeModal: {
        modal: false,
        value: ""
      },
      qq: {
        qqUserInfo: {
          addressType: 0,
          age: 36,
          ageType: 0,
          animalsignType: 0,
          birthYear: 0,
          birthday: "06-04",
          birthdayType: 0,
          bloodType: 5,
          career: "",
          city: "",
          company: "",
          companyCity: "",
          companyContry: "",
          companyDetailAddress: "",
          companyProvince: "",
          constellation: "",
          constellationType: 0,
          country: "",
          createTime: "",
          desciption: "",
          famousCustomHomepage: 0,
          homeCity: "",
          homeCountry: "",
          homeProvince: "",
          homeType: 0,
          id: 0,
          isFamous: 0,
          islunar: 0,
          lastModifyTime: "",
          lover: null,
          mailaddr: "",
          mailcellphone: "",
          mailname: "",
          marriage: 1,
          nickName: "普通人",
          province: "江西",
          ptimestamp: 0,
          qqNum: "1119224220",
          sex: "",
          sexType: 0,
          signature: "",
          spaceName: "",
          userId: ""
        }
      },
      tb: {},
      yys: {},
      zhbb: {
        base_info: {
          id_number: "", //身份证
          id_name: "", //姓名
          nation: "", //名族
          gender: "", //性别
          address: "", //身份证地址
          user_id: "", //用户ID
          type: "", //用户分级
          phone: "", //手机号码
          price: "",
          lon: "", //经度
          lat: "", //纬度
          formatted_address: "", //申请地址
          phone_address: "", //号码归属地
          bank_card_no: "", //银行卡号
          bank_name: "", //银行名称
          user_have_bankcard_count: 0 //名下银行卡 (取自第三方)
        },
        device_info: {
          //设备信息
          device_name: "", //手机型号
          device_last_use_date: "", //最近使用时间
          network_type: "", //网络类型
          is_rooted: "", //是否越狱 1:是 0:否
          app_instalment_count: "", //APP安装数量
          living_attack_device_count: "", //活体攻击设备数量
          actual_loan_platform_count_6m: "" //短时间内申请借款笔数
        },
        black_info: {
          //黑名单信息
          anrong_black: 0, //安融黑名单 1:命中 0:未命中
          youdun_black: 0, //有盾名单 1:命中 0:未命中
          zhichen_black: 0, //致诚黑名单 1:命中 0:未命中
          tianbei_black: 0 //天贝黑名单 1:命中 0:未命中
        },
        overdue_info: {
          //逾期信息
          jie_dai_bao: 0, //借贷宝逾期  1:是 0:否
          jin_jie_dao: 0, //今借到逾期  1:是 0:否
          mi_fang: 0, //米房逾期  1:是 0:否
          wu_you: 0, //无忧逾期  1:是 0:否
          an_rong: 0, //安融逾期  1:是 0:否
          zhi_chen: 0 //致诚逾期  1:是 0:否
        },
        report_info: {
          //共债报告
          apply_count: 0, //申请数
          accept_rate: 0, //通过率
          overdue_money: 0, //当前逾期总金额
          overdue_count: 0, //逾期总次数
          normal_count: 0, //正常还款次数
          list: [
            {
              //申请记录明细
              applyDate: "", //申请时间
              applyResult: "", //申请状态
              creditAddress: "", //申请地址
              loanMoney: "", //申请金额
              memberType: "",
              remark: "", //来源
              loanStatus: "" //还款状态
            }
          ]
        },
        credit_info: {
          //用户信用被查询信息
          list: [
            {
              memberType: "", //查询会员类型
              queryDate: "", //查询时间
              queryType: "", //查询类型
              remark: "" //备注
            }
          ],
          "12m_count": 0, //近一年
          "6m_count": 0, //近半年
          "3m_count": 0, //近3个月
          query_count: 0, //查询总次数
          institution_count: 0
        },
        face_info: {
          devices_list: [
            {
              device_detail: {
                network_type: "",
                is_rooted: ""
              },
              device_name: "",
              device_id: "",
              device_last_use_date: "",
              device_link_id_count: ""
            }
          ],
          loan_detail: {
            loan_platform_count: "",
            actual_loan_platform_count: "",
            repayment_platform_count: "",
            repayment_times_count: ""
          }
        }
      },
      order_list: [], //交易信息
      user_operate: {}, //认证
      operation_data: [], //操作
      Remarks: [], //备注
      UserInfo: {}, //用户资料
      total: "", //交易统计
      UserData: [],
      UserCol: [
        {
          title: "订单号",
          width: "80",
          align: "center",
          key: "order_id"
        },
        {
          title: "申请时间",
          key: "created_at",
          align: "center"
        },
        {
          title: "申请金额",
          key: "loan_amount",
          align: "center"
        },
        {
          title: "申请期限",
          key: "loan_day",
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            return this.$store.getters.orderStatus[params.row.status];
          }
        },
        // {
        //   title: "渠道",
        //   align: "center",
        //   key: "channel"
        // },
        {
          title: "审核员",
          align: "center",
          key: "auditor_name"
        },
        {
          title: "催收员",
          align: "center",
          key: "recruiter_name"
        }
        // {
        //   title: '操作',
        //   key: 'operation',
        //   align: 'center',
        //   width: '300',
        //   render: (h, params)=>{
        //     return h('div',this.$renderBtn(h, params, this.BtnData));
        //   }
        // }
      ],
      loading: true,
      State: this.modalShow,
      ID: this.InitId,
      Unique: this.UniqueId,
      IdArr: this.AllId,
      // order_id:this.order_id,
      IptWidth: "160px",
      Avator: "",
      NickName: "",
      Reports: {
        modal: false,
        data: {}
      },
      TextArr: {
        edu: ["初中", "高中", "大专", "本科", "硕士", "博士", "博士后"]
      },
      NewType: [],
      AllAreaData: Area, //全国省市区信息集合
      AllInfo: {
        jiben: {
          idcardimg: ["", ""],
          huoti: [""],
          info: {
            auditorId: "",
            collectorId: "",
            tongdun: {},
            cajl: {},
            yunyings: {},
            taobao: {},
            zhimafen: {},
            huabei: {}
          },
          renz: ""
        },
        loan: {
          jk_count: "",
          jk_this_amount: "",
          jk_all_amount: "",
          jk_list: [{ capital_modal: false }],
          zq_count: "",
          zq_this_amount: "",
          zq_all_amount: "",
          hk_count: "",
          hk_this_amount: {
            amount: ""
          },
          hk_all_yhamount: "",
          hk_all_wyamount: ""
        },
        moxie: {
          tb: [],
          yys: {}
        },
        operation: {
          log: {
            system: []
          }
        }
      },
      EditData: {
        info: {
          name: "",
          phone: "",
          idcard: "",
          education: "",
          company: "",
          address_company: [],
          address_live: [],
          type: "",
          black: "",
          zmop: "",
          allow_delay: "",
          credit_limit: "",
          sex: "",
          nation: "",
          birth: "",
          address: "",
          remark: "",
          owner: 1
        },
        lianxiren: [],
        auditor: [],
        collector: []
      },
      ChoseCompany: [],
      DetailsCompany: "",
      ChoseLive: [],
      DetailsLive: "",
      IsEdit: false,
      IsPass: {
        isLimit: false,
        isLoan: false,
        type: "success",
        status: false,
        text: "通过"
      },
      IsHang: {
        type: "primary",
        status: false,
        text: "挂起"
      },
      Limit: {
        status: false,
        value: "",
        text: "借款额度"
      },
      SetLoan: {
        status: false,
        select: [],
        value: "",
        type: "info",
        name: ""
      },
      NavData: {
        baseInfo: {
          cur: true
        },
        Certification: {
          cur: false
        },
        management: {
          cur: false
        },
        apply: {
          cur: false
        },
        transaction: {
          cur: false
        },
        collection: {
          cur: false
        },
        repayment: {
          cur: false
        },
        operation: {
          cur: false
        }
      },
      DelayBtn: {
        type: "primary",
        name: "发起展期"
      },
      BlackBtn: {
        status: false,
        type: "error",
        name: "加入黑名单"
      },
      Authorize: {
        Col: [
          {
            title: "类型",
            align: "center",
            key: "type"
          },
          {
            title: "状态",
            align: "center",
            key: "status"
          },
          {
            title: "生成时间",
            width: "120",
            align: "center",
            key: "create_at"
          }
        ],
        Data: []
      },
      Audit: {
        Col: [
          {
            title: "类型",
            align: "center",
            key: "type"
          },
          {
            title: "状态",
            align: "center",
            key: "status"
          },
          {
            title: "生成时间",
            align: "center",
            key: "create_at"
          }
        ],
        Data: []
      },
      Urge: {
        auth: false,
        status: false,
        content: "",
        Col: [
          {
            title: "记录",
            align: "center",
            key: "content"
          },
          {
            title: "生成时间",
            align: "center",
            key: "create_at"
          }
        ],
        Data: []
      },
      BigPic: {
        modal: false,
        img: ""
      },
      //展期操作
      Delay: {
        modal: false,
        data: {}
      },
      //主动还款操作
      Repay: {
        modal: false,
        data: {}
      },
      //放款操作
      Loan: {
        modal: false,
        data: {
          id: "",
          name: "",
          amount: ""
        }
      },
      Huabei: {
        modal: false,
        data: {
          uid: "",
          value: ""
        }
      },
      Zhimafen: {
        modal: false,
        data: {
          uid: "",
          zmop: ""
        }
      },
      Capital: {
        modal: false,
        data: {
          jid: "",
          ren: ""
        }
      },
      //按钮集合
      ButtonAll: [],
      EditPerson: {
        auditor: "",
        IsAuditor: false,
        collector: "",
        IsCollector: false
      },
      applyPage: {
        count: 0,
        cur: 1,
        size: 20
      },
      black: {
        modal: false,
        value: ""
      },
      WithholdModal: {
        modal: false,
        value: ""
      },
      transactionPage: {
        page: 1,
        num: 5,
        count: 0
      },
      qqqun: {
        modal: false
      },
      txlList: [],
      txl: [],
      qqqunData: [],
      qqqunCol: [
        {
          title: "QQ群成员QQ号",
          align: "center",
          key: "groupMemberNum"
        },
        {
          title: "QQ群成员昵称",
          align: "center",
          key: "groupMemberNickName"
        },
        {
          title: "QQ群成员性别",
          align: "center",
          key: "gender",
          render: (h, params) => {
            if (params.row.gender == 1) {
              return "男";
            } else if (params.row.gender == 2) {
              return "女";
            } else {
              return "未知";
            }
          }
        },
        {
          title: "用户所在QQ群的群号",
          align: "center",
          key: "groupId"
        },
        {
          title: "记录获取时间",
          align: "center",
          key: "createTime"
        }
      ],
      txlListcolumns: [
        {
          title: "姓名",
          align: "center",
          key: "name"
        },
        {
          title: "手机号",
          align: "center",
          key: "phone"
        },
        {
          title: "创建时间",
          align: "center",
          key: "create_at"
        },
        {
          title: "备注",
          align: "center",
          key: "remark"
        },
        {
          title: "状态",
          align: "center",
          key: "state",
          render: (h, params) => {
            if (params.row.state == 0) {
              return "未检测";
            } else if (params.row.state == 1) {
              return "正常";
            } else if (params.row.state == 2) {
              return "异常";
            }
          }
        }
      ],
      CenterModal: {
        modal: false
      },
      riskLevel: []
    };
  },
  props: {
    modalShow: Boolean,
    InitId: [String, Number],
    is_period: [String, Number],
    UniqueId: [String, Number],
    AllId: [Array, String],
    Status: [String, Number],
    order_id: [Array, String],
    BtnId: [String, Number],
    back_price: [String, Number]
  },
  watch: {
    modalShow(val) {
      this.State = val;
      if (val) {
        this.loading = true;
        this.InitData(this.InitId);
        this.NavData = {
          baseInfo: {
            cur: true
          },
          Certification: {
            cur: false
          },

          management: {
            cur: false
          },
          apply: {
            cur: false
          },

          transaction: {
            cur: false
          },
          collection: {
            cur: false
          },
          repayment: {
            cur: false
          },
          operation: {
            cur: false
          }
        };
      }
    },
    InitId(val) {
      this.ID = val;
    },
    UniqueId(val) {
      this.Unique = val;
    },
    AllId(val) {
      this.IdArr = val;
    },
    order_id(val) {
      this.order_id = val;
    },
    ChoseCompany() {
      this.AddressBack();
    },
    ChoseLive() {
      this.AddressBack();
    },
    DetailsCompany() {
      this.AddressBack();
    },
    DetailsLive() {
      this.AddressBack();
    }
  },
  mounted() {
    this.ClipBoard = new Clipboard("#clipBtn", {
      text: function(elm) {
        return elm.getAttribute("src");
      }
    });
    this.ClipBoard.on("success", e => {
      this.$Message.success("复制成功！");
    });
  },
  destroyed() {
    this.ClipBoard.destroy();
  },
  computed: {
    CurrentPage() {
      let cur = 0;
      if (this.IdArr.length > 0) {
        this.IdArr.forEach((val, index) => {
          if (val === this.UniqueId) cur = index + 1;
        });
      }
      return cur;
    },
    CheckSex() {
      if (this.EditData.info.idcard) {
        let i = this.EditData.info.idcard.substr(16, 1);
        if (i % 2 == 0) {
          return require("../../assets/images/female.jpeg");
        }
      }
      return require("../../assets/images/male.jpeg");
    },
    TotalPage() {
      return this.IdArr.length;
    },
    ReviewStatus() {
      switch (this.AllInfo.jiben.info.status) {
        case 1:
          return "未审核";
          break;
        case 2:
          return "已通过";
          break;
        case 3:
          return "未通过";
          break;
        default:
          return "未知";
      }
    },
    GetAuditor() {
      let name = "";
      this.EditData.auditor.forEach(val => {
        if (val.id === this.EditData.info.auditorId) {
          name = val.admin_user;
        }
      });
      return name;
    },
    GetCollector() {
      let name = "";
      this.EditData.collector.forEach(val => {
        if (val.id === this.EditData.info.collectorId) {
          name = val.admin_user;
        }
      });
      return name;
    },
    LoanCopyInfo() {
      let amount = "";
      if (this.AllInfo.loan.jk_list.length > 0) {
        const last_jk = this.ArrLast(this.AllInfo.loan.jk_list);
        amount = last_jk.amount;
      } else {
        amount = this.Limit.value;
      }
      const start = new Date(),
        end = new Date(
          start.getTime() + 1000 * 60 * 60 * 24 * this.AllInfo.jiben.info.days
        );
      return `金额：${amount} 利率：24% 还款时间：${end.getFullYear()}-${end.getMonth() +
        1}-${end.getDate(0)}`;
    },
    JudgeIdcard() {
      if (
        this.AllInfo.jiben.idcardimg[0] === false ||
        this.AllInfo.jiben.idcardimg[0] === false
      ) {
        return false;
      } else {
        return true;
      }
    },
    EmptyAvator() {
      if (this.Avator === "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    qzsx() {
      this.CenterModal.modal = true;
      //       this.$fetch("/backend/report/compre", {
      // uid: this.InitId,
      // refresh:1
      // }).then(d => {
      //   if(d.status==1){
      //     this.$Message.success('刷新成功')
      // this.zhbb = d.data;
      // this.data1 = d.data.report_info.list;
      // this.data2 = d.data.credit_info.list;
      //   }
      // })
    },
    ModalCancelz() {
      this.CenterModal.modal = false;
    },
    SubmitOver() {
      this.$fetch("/backend/report/compre", {
        uid: this.InitId,
        refresh: 1
      }).then(d => {
        if (d.status == 1) {
          var riskLevel = this.$store.getters.riskLevel;
          // if (typeof d.data.face_info.user_features != "undefined") {
          var face_info = d.data.face_info;
          var loan_detail = face_info.loan_detail;
          let user_features = face_info.user_features;
          var passingrate =
            loan_detail.actual_loan_platform_count /
            loan_detail.loan_platform_count;
          loan_detail.passingrate = passingrate.toFixed(2) * 100;
          riskLevel.forEach((val, index) => {
            riskLevel[index].time = "";
            riskLevel[index].cls = "";
          });

          riskLevel.forEach((val, index) => {
            user_features.forEach((item, num) => {
              if (item.user_feature_type == val.num) {
                riskLevel[index].time = item.last_modified_date;
                riskLevel[index].cls = riskLevel[index].class;
              }
            });
          });
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            title: {},
            tooltip: {},
            xAxis: {
              data: ["全部", "近6月", "近3月", "近1月"]
            },
            yAxis: {},
            series: [
              {
                name: "申请借款平台数",
                type: "bar",
                data: [
                  loan_detail.loan_platform_count,
                  loan_detail.loan_platform_count_6m,
                  loan_detail.loan_platform_count_3m,
                  loan_detail.loan_platform_count_1m
                ],
                itemStyle: {
                  normal: {
                    color: "#4594D9" //颜色
                  }
                }
              },
              {
                name: "实际借款平台数",
                type: "bar",
                data: [
                  loan_detail.actual_loan_platform_count,
                  loan_detail.actual_loan_platform_count_6m,
                  loan_detail.actual_loan_platform_count_3m,
                  loan_detail.actual_loan_platform_count_1m
                ],
                itemStyle: {
                  normal: {
                    color: "#77D7E8" //颜色
                  }
                }
              },
              {
                name: "还款平台数",
                type: "bar",
                data: [
                  loan_detail.repayment_platform_count,
                  loan_detail.repayment_platform_count_6m,
                  loan_detail.repayment_platform_count_3m,
                  loan_detail.repayment_platform_count_1m
                ],
                itemStyle: {
                  normal: {
                    color: "#22B97D" //颜色
                  }
                }
              }
            ]
          });
          // riskLevel.forEach((val,index)=>{
          // } else {
          //   riskLevel.forEach((val, index) => {
          //     riskLevel[index].time = "";
          //     riskLevel[index].cls = "";
          //   });
          // }
          this.CenterModal.modal = false;
          this.$Message.success("刷新成功");
          this.zhbb = d.data;
          this.data1 = d.data.report_info.list;
          this.data2 = d.data.credit_info.list;
        } else {
          this.$Message.success(d.message);
        }
      });
    },

    //提交信息操作
    UploadData(url, info) {
      return new Promise((resolve, reject) => {
        this.$post(url, info)
          .then(d => {
            if (d.status === 1) {
              this.$Message.success(d.message);
              resolve(d.data);
            } else {
              this.$Message.error(d.message);
              reject();
            }
          })
          .catch(err => {
            this.$Message.error("服务器繁忙，请稍后再试！");
          });
      });
    },
    //触发事件
    EventTune(event) {
      this[event]();
    },
    ResetData() {
      this.EditData = {
        info: {
          name: "",
          phone: "",
          idcard: "",
          education: "",
          company: "",
          address_company: [],
          address_live: [],
          type: "",
          black: "",
          zmop: "",
          allow_delay: "",
          credit_limit: "",
          sex: "",
          nation: "",
          birth: "",
          address: "",
          remark: ""
        },
        rz_info: [],
        lianxiren: [],
        auditor: [],
        collector: []
      };
      this.ChoseCompany = [];
      this.DetailsCompany = "";
      this.ChoseLive = [];
      this.DetailsLive = "";
      this.IsEdit = false;
      this.Limit.status = false;
    },
    CloseBtn() {
      this.ResetData();
      this.$emit("CloseModal", this.modalState);
    },
    InitData(id) {
      this.$fetch("backend/Menuauth/listAuthGet", { auth_id: this.BtnId }).then(
        d => {
          if (d.status == 1) {
            this.ButtonAll = [];
            this.IsPass.isLimit = false;
            this.IsPass.isLoan = false;
            this.Urge.auth = false;
            d.data.operation.forEach(val => {
              if (val.class === "GiveLimitOpt") {
                this.IsPass.isLimit = true;
              } else if (val.class === "SetLoanOpt") {
                this.SetLoan.name = val.name;
                this.SetLoan.type = val.color;
                this.IsPass.isLoan = true;
              } else if (val.class === "RecordAddOpt") {
                this.Urge.auth = true;
              } else if (val.name == "通过" || val.name == "拒绝") {
                if (this.Status == 1) {
                  this.ButtonAll.push(val);
                }
              } else {
                this.ButtonAll.push(val);
              }
            });
          }
        }
      );

      this.$post("/backend/user/get-user-info", { uid: this.InitId }).then(
        d => {
          if (d.status == 1) {
            this.loading = true;
            var UserInfo = d.data.UserInfo;
            if (UserInfo.Relation != "") {
              for (let i = 0; UserInfo.Relation.length > i; i++) {
                if (UserInfo.Relation[i].relationship == "P") {
                  UserInfo.Relation[i].relationship = "配偶";
                } else if (UserInfo.Relation[i].relationship == "Y") {
                  UserInfo.Relation[i].relationship = "朋友";
                } else if (UserInfo.Relation[i].relationship == "L") {
                  UserInfo.Relation[i].relationship = "领导";
                } else if (UserInfo.Relation[i].relationship == "T") {
                  UserInfo.Relation[i].relationship = "同事";
                } else if (UserInfo.Relation[i].relationship == "M") {
                  UserInfo.Relation[i].relationship = "母亲";
                } else if (UserInfo.Relation[i].relationship == "F") {
                  UserInfo.Relation[i].relationship = "父亲";
                }
              }
            }
            // if (UserInfo.frontCard !== "") {
            //   UserInfo.frontCard =
            //     "data:image/png;base64," + UserInfo.frontCard;
            // }
            // if (UserInfo.backCard !== "") {
            //   UserInfo.backCard = "data:image/png;base64," + UserInfo.backCard;
            // }
            // if (UserInfo.liveCard !== "") {
            //   UserInfo.liveCard = "data:image/png;base64," + UserInfo.liveCard;
            // }
            this.UserInfo = UserInfo;
            this.ButtonAll.forEach(val => {
              if (val.class === "AddBlackOpt") {
                val.name =
                  typeof UserInfo.black_type == "number"
                    ? "移除黑名单"
                    : "进黑名单";
                val.color =
                  typeof UserInfo.black_type == "number" ? "default" : "error";
              }
            });
            this.loading = false;
          }
        }
      );
    },
    DetailsOpt() {
      let routeData = this.$router.resolve({
        path: "/Report",
        query: { id: this.Reports.data.id }
      });
      window.open(routeData.href, "_blank");
      //this.Reports.modal = true
      // console.log(this.ID);
    },
    ChangePage(page) {
      this.loading = true;
      this.ID = this.IdArr[page - 1];
      this.InitData(this.ID);
    },
    EditInfo() {
      this.IsEdit = true;
    },
    SubOpt(sign = 1) {
      const allinfo = JSON.stringify(this.EditData);
      this.UploadData("/backend/User/editUserQuery", { _post: allinfo }).then(
        () => {
          if (sign) {
            this.IsEdit = false;
          }
        }
      );
    },

    CopyInfoOpt() {
      this.$refs.ClipBox.click();
    },
    HangOpt() {
      /*const tips = this.IsHang.status?'确认要取消该用户挂起状态吗？':'确认挂起该用户吗？';
        this.$Modal.confirm({
          title: '提示',
          content: `<p class="confirm-text">${tips}</p>`,
          onOk: ()=>{
          }
        })*/
      this.UploadData("/backend/User/setGuaQi", { uid: this.ID }).then(() => {
        this.IsHang.status = !this.IsHang.status;
        this.JudgeHang(this.IsHang.status);
        this.CloseBtn();
      });
    },
    GiveLimitOpt() {
      this.Limit.status = true;
      this.$nextTick(() => {
        this.$refs.LimitInput.focus();
      });
    },
    SubmitLimit() {
      const data = {
        uid: this.ID,
        edu: this.Limit.value
      };
      this.UploadData("/backend/User/creditLimit", data).then(() => {
        this.Limit.status = false;
        this.Limit.text = this.Limit.value;
      });
    },
    LimitCancel() {
      this.Limit.status = false;
    },
    SetLoanOpt() {
      const data = {
        type: 0,
        uid: this.ID,
        fk_id: 7
      };
      this.UploadData("/backend/User/distributionFk", data).then(() => {
        this.InitData(this.InitId);
      });
    },
    SubmitSetLoan() {
      const data = {
        type: 0,
        uid: this.ID,
        fk_id: this.SetLoan.value
      };
      this.UploadData("/backend/User/distributionFk", data).then(() => {
        this.SetLoan.status = false;
      });
    },
    SetLoanCancel() {
      this.SetLoan.status = false;
    },
    PickDate(time) {
      this.EditData.info.birth = time;
    },
    //转换前端用地址格式
    StdArea(arr) {
      if (arr[0] === arr[1]) {
        return [arr[0], arr[2]];
      } else {
        return [...arr.slice(0, 3)];
      }
    },
    //转换后端用
    BackArea(arr) {
      let newArr = [...arr];
      if (arr.length === 2) {
        newArr.unshift(arr[0]);
      }
      return newArr;
    },
    //传输所用的地址
    AddressBack() {
      this.EditData.info.address_company = [
        ...this.BackArea(this.ChoseCompany),
        this.DetailsCompany
      ];
      this.EditData.info.address_live = [
        ...this.BackArea(this.ChoseLive),
        this.DetailsLive
      ];
    },
    AddressText(arr) {
      return arr.join(",");
    },
    NavChange(nav) {
      Object.keys(this.NavData).forEach(val => {
        this.NavData[val].cur = val === nav ? true : false;
      });
      if (nav == "apply") {
        this.apply();
      } else if (nav == "Certification") {
        this.Certification();
      } else if (nav == "transaction") {
        this.transaction();
      } else if (nav == "operation") {
        this.operation();
      } else if (nav == "collection") {
        this.collection();
      } else if (nav == "repayment") {
        this.repayment();
      } else if (nav == "management") {
        this.management();
      }
    },
    Certification() {
      this.$fetch("/backend/report/compre", {
        uid: this.InitId
      }).then(d => {
        if (d.data.base_info != false) {
          this.fkwk = false;
          var riskLevel = this.$store.getters.riskLevel;
          if (typeof d.data.face_info != "undefined") {
            var face_info = d.data.face_info;
            var loan_detail = face_info.loan_detail;
            let user_features = face_info.user_features;
            var passingrate =
              loan_detail.actual_loan_platform_count /
              loan_detail.loan_platform_count;
            loan_detail.passingrate = passingrate.toFixed(2) * 100;
            riskLevel.forEach((val, index) => {
              riskLevel[index].time = "";
              riskLevel[index].cls = "";
            });

            riskLevel.forEach((val, index) => {
              user_features.forEach((item, num) => {
                if (item.user_feature_type == val.num) {
                  riskLevel[index].time = item.last_modified_date;
                  riskLevel[index].cls = riskLevel[index].class;
                }
              });
            });
            let myChart = this.$echarts.init(
              document.getElementById("myChart")
            );
            // 绘制图表
            myChart.setOption({
              title: {},
              tooltip: {},
              xAxis: {
                data: ["全部", "近6月", "近3月", "近1月"]
              },
              yAxis: {},
              series: [
                {
                  name: "申请借款平台数",
                  type: "bar",
                  data: [
                    loan_detail.loan_platform_count,
                    loan_detail.loan_platform_count_6m,
                    loan_detail.loan_platform_count_3m,
                    loan_detail.loan_platform_count_1m
                  ],
                  itemStyle: {
                    normal: {
                      color: "#4594D9" //颜色
                    }
                  }
                },
                {
                  name: "实际借款平台数",
                  type: "bar",
                  data: [
                    loan_detail.actual_loan_platform_count,
                    loan_detail.actual_loan_platform_count_6m,
                    loan_detail.actual_loan_platform_count_3m,
                    loan_detail.actual_loan_platform_count_1m
                  ],
                  itemStyle: {
                    normal: {
                      color: "#77D7E8" //颜色
                    }
                  }
                },
                {
                  name: "还款平台数",
                  type: "bar",
                  data: [
                    loan_detail.repayment_platform_count,
                    loan_detail.repayment_platform_count_6m,
                    loan_detail.repayment_platform_count_3m,
                    loan_detail.repayment_platform_count_1m
                  ],
                  itemStyle: {
                    normal: {
                      color: "#22B97D" //颜色
                    }
                  }
                }
              ]
            });
            // riskLevel.forEach((val,index)=>{
          } else {
            riskLevel.forEach((val, index) => {
              riskLevel[index].time = "";
              riskLevel[index].cls = "";
            });
            d.data.face_info = {
              devices_list: [
                {
                  device_detail: {
                    network_type: "",
                    is_rooted: ""
                  },
                  device_name: "",
                  device_id: "",
                  device_last_use_date: "",
                  device_link_id_count: ""
                }
              ],
              loan_detail: {
                loan_platform_count: "",
                actual_loan_platform_count: "",
                repayment_platform_count: "",
                repayment_times_count: ""
              }
            };
          }
          this.zhbb = d.data;
          this.riskLevel = riskLevel;
          this.data1 = d.data.report_info.list;
          this.data2 = d.data.credit_info.list;
          //   console.log(val);

          //   if(val.time==''){
          //     riskLevel[index].cls=''
          //   }
          // })
        } else {
          this.fkwk = true;
        }
      });
    },
    repayment() {
      // alert("还款计划");
      this.$post("/backend/Order/getPlan", {
        type: "2",
        user_id: this.InitId,
        num: 9999,
        page: 1
      }).then(d => {
        if (d.status == 1) {
          this.repaymentList = d.data;
        }
      });
    },
    collection() {
      this.$post("/backend/collection-record/list", {
        page: 1,
        num: 999,
        type: 1,
        uid: this.InitId
      }).then(d => {
        d.data.list.forEach((val, index) => {
          d.data.list[index].fm = crtTimeFM(val.create_at);
          d.data.list[index].create_at = crtTimeFtt(val.create_at);
        });
        this.beizhuData = d.data.list;
      });
    },

    //报告
    management() {
      (this.txlListPage = {
        page: 1,
        size: 10,
        count: 0
      }),
        (this.smsPage = {
          page: 1,
          size: 10,
          count: 0
        }),
        this.sms(this.smsPage);
      this.txlclick(this.txlListPage);
      this.carrier();
      this.taobao();
      this.qqlist();
    },
    //运营商
    carrier() {
      this.$fetch("/backend/report/carrier", {
        uid: this.InitId
      }).then(d => {
        this.yys = d.data;
      });
    },
    taobao() {
      this.$fetch("/backend/report/taobao", {
        uid: this.InitId
      }).then(d => {
        this.tb = d.data;
      });
    },
    qqlist() {
      this.$fetch("/backend/report/qq", {
        uid: this.InitId
      }).then(d => {
        var _data = d.data;
        // console.log(_data);
        this.qq = _data;
        if (_data.status == 1) {
          var xinzuo = [
            "白羊座",
            "金牛座",
            "双子座",
            "巨蟹座",
            "狮子座",
            "处女座",
            "天秤座",
            "天蝎座",
            "射手座",
            "摩羯座",
            "水瓶座",
            "双鱼座"
          ];
          var hun = [
            "未知",
            "单身",
            "已婚",
            "保密",
            "恋爱中",
            "已订婚",
            "分居",
            "离异"
          ];
          var qqsex = ["未知", "男", "女"];
          var xuexin = ["未知", "A", "B", "O", "AB", "其他"];
          _data.qqUserInfo.constellation =
            xinzuo[_data.qqUserInfo.constellation];
          _data.qqUserInfo.sex = qqsex[_data.qqUserInfo.sex];
          _data.qqUserInfo.marriage = hun[_data.qqUserInfo.marriage];
          _data.qqUserInfo.bloodType = xuexin[_data.qqUserInfo.bloodType];

          var qunData = _data.qqGroups;
          qunData.forEach((item, index) => {
            qunData[index].index = index + 1;
            qunData[index].status = item.status == 1 ? "是" : "否";
          });
          this.qunData = qunData;
          _data.qqContacts.forEach((item, index) => {
            _data.qqContacts[index].index = index + 1;
          });
          _data.qqRecentContacts.forEach((item, index) => {
            _data.qqRecentContacts[index].index = index + 1;
          });
          this.lianxiData = _data.qqRecentContacts;
          this.haoyouData = _data.qqContacts;
          this.haoyouPage.count = this.haoyouData.length;
          this.qqListChangePage(1)
        }
      });
    },
    //qq好友本地加载跟多
    qqListChangePage(curpage) {
      this.haoyouPage.page=curpage;
      this.haoyoulists=[];
      for (let i = this.haoyouPage.page*10; i < this.haoyouData.length; i++) {
        if (i<this.haoyouPage.page*10+10) {
           this.haoyoulists.push(this.haoyouData[i]);
        }
      }
    },
    //qq好友本地加载减少

    txlclick(obj) {
      obj.uid = this.InitId;
      this.$fetch("/backend/report/tel", obj).then(d => {
        let _msg = d.data;
        this.txl = d;
        if (d.status == 1) {
          let _msgList = _msg.lists;
          if (_msgList != "") {
            // _msgList.forEach((item, index) => {
            //   _msgList[index].type = item.type == 1 ? "接收" : "发送";
            // });
            this.txlList = _msgList;
            this.txlListPage.count = _msg.total;
          }
        }
      });
    },
    sms(obj) {
      obj.uid = this.InitId;
      this.$fetch("/backend/report/sms", obj).then(d => {
        let _msg = d.data;
        this.dx = d;
        if (d.status == 1) {
          let _msgList = _msg.lists;
          if (_msgList != "") {
            _msgList.forEach((item, index) => {
              _msgList[index].type = item.type == 1 ? "接收" : "发送";
            });
            this.msgList = _msgList;
            this.smsPage.count = _msg.total;
          }
        }
      });
    },
    //申请信息
    apply() {
      this.$fetch("/backend/user/apply-order", {
        uid: this.InitId,
        page: this.applyPage.cur,
        num: this.applyPage.size
      }).then(d => {
        if (d.data != "") {
          let qudao = ["app", "未知"];
          var _data = d.data.list;
          _data.forEach((val, index) => {
            _data[index].channel = qudao[val.channel];
          });
          this.applyPage.count = d.data.count;
          this.UserData = _data;
        }
      });
    },
    //切换页面
    transactionPageClick(curpage) {
      this.transactionPage.page = curpage;
      this.transaction();
    },
    //交易信息
    transaction() {
      this.$fetch("/backend/user/trade-info", {
        uid: this.InitId,
        page: this.transactionPage.page,
        num: this.transactionPage.num
      }).then(d => {
        if (d.status == 1) {
          this.total = d.data.total;
          var order_item = d.data.order.list;
          this.transactionPage.count = d.data.order.count;
          order_item.forEach((item, index) => {
            if (item.return_time == "1970-01-01") {
              order_item[index].return_time = "";
            }
          });
          var order_list = order_item;
          this.order_list = order_list;
        }
      });
    },
    //操作信息
    operation() {
      this.$fetch("/backend/user/user-operate", {
        uid: this.InitId
      }).then(d => {
        this.user_operate = d.data;
      });
      this.$fetch("/backend/user/user-remark", {
        uid: this.InitId,
        page: 1,
        num: 999
      }).then(d => {
        var data = d.data;
        data.forEach((val, index) => {
          data[index].fm = crtTimeFM(val.create_at);
          data[index].create_at = crtTimeFtt(val.create_at);
        });
        this.Remarks = data;
      });
      this.$fetch("/backend/user/user-operation", {
        uid: this.InitId,
        page: 1,
        num: 999
      }).then(d => {
        var data = d.data;
        data.forEach((val, index) => {
          if (val.create_at != "") {
            data[index].fm = crtTimeFM(val.create_at);
            data[index].create_at = crtTimeFtt(val.create_at);
          }
        });
        this.operation_data = data;
      });
    },
    BindHidden() {
      // console.log(this.UserInfo.black_type);
      // if(typeof(this.UserInfo.black_type)=='string'){
      //   this.removeBlack.modal=true;
      // }else{
      //   const black = this.EditData.info.black;
      // this.BlackBtn.status = black;
      // this.JudgeBlack(black);
      // }
    },
    //开通展期
    DelayOpt() {
      this.$post("/backend/order-delay/get-level", { uid: this.InitId }).then(
        d => {
          if (d.status === 1) {
            this.Delay.modal = true;
            d.data.uid = this.UserInfo.uid;
            d.data.name = this.UserInfo.name;
            d.data.order_id = this.order_id;
            this.Delay.data = d.data;
          }
        }
      );
      // const jk_list = this.AllInfo.loan.jk_list;
      // const type = this.AllInfo.jiben.info.type;
      // let days = "";
      // switch (type) {
      //   case "A":
      //     days = 28;
      //     break;
      //   case "B":
      //     days = 15;
      //     break;
      //   case "C":
      //     days = 10;
      //     break;
      //   default:
      //     days = this.AllInfo.jiben.info.days;
      // }
      // if (this.AllInfo.jiben.info.yuE <= 0) {
      //   this.$Message.error("没法展期！");
      // }
      // if (jk_list.length > 0) {
      //   const jk_data = this.ArrLast(jk_list);
      //   const data = {
      //     uid: this.ID,
      //     id: jk_data.id,
      //     days: days,
      //     amount: this.AllInfo.jiben.info.yuE,
      //     hk_date: jk_data.hk_date,
      //     name: this.AllInfo.jiben.info.name,
      //     type: this.AllInfo.jiben.info.type
      //   };
      //   this.Delay.modal = true;
      //   this.Delay.data = data;
      // } else {
      //   this.$Message.error("当前无借款！");
      // }
    },
    DelayCancel() {
      this.Delay.modal = false;
    },
    DelaySub(data) {
      this.UploadData("/backend/Loan/payDelayRequest", data)
        .then(() => {
          this.Delay.modal = false;
          this.InitData(this.InitId);
          this.$post("/backend/Collection/remark", {
            loan_id: data.jid,
            remark: " "
          });
        })
        .catch(() => {
          this.Delay.modal = false;
        });
    },
    //加入黑名单
    AddBlackOpt() {
      if (typeof this.UserInfo.black_type == "number") {
        this.removeBlack.modal = true;
      } else {
        this.black.modal = true;
      }
    },
    RemarkOpt() {
      this.ModeModal.modal = true;
      this.ModeModal.value = "";
    },
    ModalCancel() {
      this.ModeModal.modal = false;
      this.ModeModal.value = "";
    },
    AddOver() {
      if (this.ModeModal.value != "") {
        this.$post("/backend/user/remark", {
          uid: this.ID,
          remark: this.ModeModal.value
        }).then(d => {
          // console.log(d);
          if (d.status == 1) {
            this.$Message.success(d.message);
            this.ModeModal.modal = false;
            this.ModeModal.value = "";
            this.NavChange("operation");
          } else {
            this.$Message.error(d.message);
          }
        });
      } else {
        this.$Message.error("内容不能为空");
      }
    },
    //查看群成员
    showContent(row) {
      this.group.cur = 1;
      this.group.size = 10;
      this.qqgroupId = row.groupid;
      this.qqqun.modal = true;
      this.qqgroup();
    },
    qqqunOver() {
      this.qqqun.modal = false;
    },
    qqgroup() {
      this.$fetch("/backend/report/qq-group-members", {
        groupid: this.qqgroupId,
        page: this.group.cur,
        size: this.group.size
      }).then(d => {
        this.qqqunData = d.data.lists;
        this.group.count = d.data.total;
      });
    },

    //主动还款
    RepayOpt() {
      this.$post("/backend/order/get-order", { uid: this.InitId }).then(d => {
        this.Repay.data = d.data;
        this.Repay.data.name = this.UserInfo.name;

        this.Repay.modal = true;
      });
      // const jk_list = this.AllInfo.loan.jk_list;
      // if (jk_list.length > 0) {
      //   const jk_data = this.ArrLast(jk_list);
      //   const data = {
      //     uid: this.ID,
      //     jid: jk_data.id,
      //     amount: this.AllInfo.jiben.info.yuE,
      //     name: this.AllInfo.jiben.info.name,
      //     hk_status: this.AllInfo.jiben.info.hk_status
      //   };
      //   this.Repay.modal = true;
      //   this.Repay.data = data;
      // } else {
      //   this.$Message.error("当前无借款！");
      // }
    },
    RepayCancel() {
      this.Repay.modal = false;
    },
    RepaySub(data) {
      // this.UploadData("/backend/Loan/payMentDone", data).then(() => {
      //   this.Repay.modal = false;
      //   this.InitData(this.InitId);
      // });
    },
    //放款操作
    LoanOpt() {
      let amount = "";
      if (this.AllInfo.loan.jk_list.length > 0) {
        const last_jk = this.ArrLast(this.AllInfo.loan.jk_list);
        if (this.AllInfo.jiben.info.yuE > 0) {
          this.$Message.error("该用户已放款！");
          return false;
        }
        //amount = last_jk.amount;
      }
      amount = this.Limit.value;
      if (amount <= 0) {
        this.$Message.error("请先给用户授予额度！");
        return;
      }
      this.Loan.data = {
        uid: this.ID,
        amount,
        name: this.AllInfo.jiben.info.name,
        type: this.AllInfo.jiben.info.type,
        limit: this.Limit.value,
        jk_date: this.AllInfo.jiben.info.days
      };
      this.Loan.modal = true;
    },
    LoanCancel() {
      this.Loan.modal = false;
    },
    LoanSub(data) {
      this.UploadData("/backend/Loan/payLoanRequest", data).then(() => {
        this.Loan.modal = false;
        this.InitData(this.InitId);
      });
    },
    StateText(arr) {
      if (arr !== false && arr.length > 0) {
        arr.forEach(val => {
          val.capital_modal = false;
        });
      }
    },
    //淘宝报表
    ReportTaobao() {
      this.$fetch("/backend/Report/taobao", { user_id: this.ID }).then(d => {
        if (d.status === 0) {
          this.$Message.error(d.message);
        } else {
          const { href } = this.$router.resolve({
            path: "/taobaoReport",
            name: "淘宝报表",
            query: {
              uid: this.ID
            }
          });
          window.open(href, "_blank");
        }
      });
    },
    //运营商报表
    ReportCarrier() {
      this.$fetch("/backend/Report/carrier", { user_id: this.ID }).then(d => {
        if (d.status === 0) {
          this.$Message.error(d.message);
        } else {
          const { href } = this.$router.resolve({
            path: "/carrierReport",
            name: "运营商报表",
            query: {
              uid: this.ID
            }
          });
          window.open(href, "_blank");
        }
      });
    },
    //查看大图
    CheckBigPic(img) {
      this.BigPic.img = img;
      this.BigPic.modal = true;
    },
    CloseBigPic() {
      this.BigPic.modal = false;
    },
    RecordAddOpt() {
      this.Urge.status = true;
    },
    //黑名单
    blackOver() {
      if (this.black.value != "") {
        this.UploadData("/backend/black/add", {
          uid: this.ID,
          remark: this.black.value
        }).then(d => {
          this.black.modal = false;
          this.black.value = "";
          this.InitData(this.InitId);
          // this.EditData.info.black = d.val;
          // this.BindHidden();
        });
      } else {
        this.$Message.error("备注不能为空！");
      }
    },
    blackCancel() {
      this.black.modal = false;
      this.black.value = "";
    },
    UrgeAddOver() {
      const data = {
        uid: this.ID,
        content: this.NavData.baseInfo.remark_ipt
        //content: this.Urge.content
      };
      this.UploadData("/backend/User/addCollection", data).then(d => {
        //this.Urge.status = false;
        this.Urge.Data.unshift({
          content: this.NavData.baseInfo.remark_ipt,
          create_at: d.date
        });
      });
    },
    //判断挂起状态
    JudgeHang(status) {
      this.ButtonAll.forEach(val => {
        if (val.class === "HangOpt") {
          val.name = status ? "取消挂起" : "挂起";
          val.color = status ? "default" : "primary";
        }
      });
    },
    //判断黑名单
    JudgeBlack(status) {
      this.ButtonAll.forEach(val => {
        if (val.class === "AddBlackOpt") {
          val.name = status ? "移除黑名单" : "进黑名单";
          val.color = status ? "default" : "error";
        }
      });
    },
    //获取放款员列表
    GetFangkuan() {
      this.$fetch("/backend/User/distributionFk", { type: 1 }).then(d => {
        this.SetLoan.select = d.data;
      });
    },
    JudgeAmtTip(color) {
      if (color === "#19be6b" || color === "#42be19") {
        return "已还";
      } else {
        return "应还";
      }
    },
    ArrLast(arr) {
      return arr[0];
    },
    //花呗编辑
    HuabeiEdit() {
      this.Huabei.modal = true;
    },
    HuabeiSub() {
      this.Huabei.modal = false;
    },
    //芝麻分修改
    ZmfEdit() {
      this.Zhimafen.modal = true;
      this.Zhimafen.data.uid = this.ID;
      this.$nextTick(() => {
        this.$refs.ZmfIpt.focus();
      });
    },
    ZmfSub() {
      this.UploadData("/backend/User/editZmop", this.Zhimafen.data).then(() => {
        this.AllInfo.jiben.info.zhimafen.info = this.Zhimafen.data.zmop;
        this.AllInfo.jiben.info.zhimafen.status = 1;
        this.AllInfo.jiben.info.zmop = this.Zhimafen.data.zmop;
        this.EditData.info.zmop = this.Zhimafen.data.zmop;
        this.Zhimafen.modal = false;
      });
    },
    //出资人修改
    CapitalEdit(id) {
      let jk_list = this.AllInfo.loan.jk_list,
        ren = "";
      if (jk_list.length > 0) {
        jk_list.forEach((val, index) => {
          if (id === val.id) {
            this.$set(
              this.AllInfo.loan.jk_list,
              index,
              Object.assign(val, { capital_modal: true })
            );
            ren = val.capital_account;
          } else {
            this.$set(
              this.AllInfo.loan.jk_list,
              index,
              Object.assign(val, { capital_modal: false })
            );
          }
        });
      }
      this.Capital.data.ren = ren;
      this.Capital.data.jid = id;
    },
    CapitalSub(value) {
      this.Capital.data.ren = value;
      this.UploadData("/backend/User/editChuziren", this.Capital.data).then(
        () => {
          let jk_list = this.AllInfo.loan.jk_list;
          jk_list.forEach((val, index) => {
            let capital_account = "";
            if (val.id === this.Capital.data.jid) {
              capital_account = this.Capital.data.ren === 1 ? "L" : "Z";
            } else {
              capital_account = val.capital_account;
            }
            let newData = {
              capital_modal: false,
              capital_account
            };
            this.$set(
              this.AllInfo.loan.jk_list,
              index,
              Object.assign(val, newData)
            );
          });
        }
      );
    },
    PassBtnStatus(name) {
      if (name === "PassOpt" && this.AllInfo.jiben.info.status === 2) {
        return true;
      } else if (name === "RejectOpt" && this.AllInfo.jiben.info.status === 3) {
        return true;
      } else if (
        (name === "DelayOpt" || name === "RepayOpt") &&
        this.AllInfo.jiben.info.yuE <= 0
      ) {
        return true;
      } else if (
        name === "RepayOpt" &&
        this.AllInfo.jiben.info.hk_status === 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    OpenEdit(type) {
      this.EditPerson[type] = true;
      this.EditPerson.collector = this.EditData.info.collectorId;
      this.EditPerson.auditor = this.EditData.info.auditorId;
    },
    SelectAuditor() {
      const allinfo = JSON.stringify(this.EditData);
      /*this.$post('/backend/User/editUserQuery',{_post: allinfo}).then(()=>{
          this.EditPerson.IsAuditor = false;
        });*/
    },
    SelectCollector() {
      const allinfo = JSON.stringify(this.EditData);
      /*this.$post('/backend/User/editUserQuery',{_post: allinfo}).then(()=>{
          this.EditPerson.IsCollector = false;
        });*/
    },
    //改变页数
    ApplyChangePage(curpage) {
      this.applyPage.page = curpage;

      this.apply().then(() => {
        this.applyPage.cur = curpage;
      });
    },
    //改变显示条数
    ApplyChangeSize(size) {
      this.applyPage.size = size;
      this.apply();
      this.applyPage.cur = 1;
      this.applyPage.size = size;
    },
    txlListChangePage(curpage) {
      this.txlListPage.page = curpage;
      this.txlclick(this.txlListPage);
    },
    smsChangePage(curpage) {
      this.smsPage.page = curpage;

      this.sms(this.smsPage);
    },
    groupChangePage(curpage) {
      this.group.cur = curpage;
      this.qqgroup();
    },
    GetAvator() {
      this.$fetch("backend/User/loadUserInfo", { uid: this.ID }).then(d => {
        if (d.status === 1) {
          this.$Message.success(d.message);
          this.Avator = d.data.wx_userInfo.wx_avatar;
          this.NickName = d.data.wx_userInfo.wx_nick_name;
        } else {
          this.$Message.error("该用户已经取消关注！");
        }
      });
    },
    PassOpt() {
      this.Tips = {
        modal: true,
        status: 1
      };
    },
    //拒绝
    RejectOpt() {
      // this.Tips = {
      //   modal: true,
      //   status: 2
      // };
      // console.log("111");
      this.blackOut.modal = true;
    },
    //拒绝后加入黑名单
    blackOutOver() {
      if (this.animal == "") {
        this.$Message.error("请选择黑名单类型！");
      } else if (this.blackOut.remark == "" && this.animal != "1") {
        this.$Message.error("备注不能为空！");
      } else if (this.animal == "1") {
        this.$post("/backend/new-loan/audit-loan-order", {
          order_num: this.order_id,
          status: 2
        }).then(d => {
          if (d.status == 1) {
            this.blackOutCancel();
            this.Tips.modal = false;
            this.State = false;
            this.CloseBtn();
            this.$Message.success(d.message);
          } else {
            this.$Message.error(d.message);
          }
        });
      } else {
        this.$post("/backend/black/add", {
          type: this.animal,
          uid: this.InitId,
          remark: this.blackOut.remark
        }).then(d => {
          if (d.status == 1) {
            this.blackOutCancel();
            this.$post("/backend/new-loan/audit-loan-order", {
              order_num: this.order_id,
              status: 2
            }).then(d => {
              if (d.status == 1) {
                this.Tips.modal = false;
                this.State = false;
                this.CloseBtn();
                this.$Message.success(d.message);
              } else {
                this.$Message.error(d.message);
              }
            });
          }
        });
      }
    },
    blackOutCancel() {
      this.animal = "1";
      this.blackOut = {
        modal: false,
        remark: ""
      };
    },
    //取消
    TipsCancel() {
      this.Tips.modal = false;
    },
    //通过提交
    TipsOver() {
      var data = {
        order_num: this.order_id,
        status: 1
      };
      if (this.stage == 1) {
        data.period = 1;
      } else {
        data.period = "";
      }
      this.$post("/backend/new-loan/audit-loan-order", data).then(d => {
        if (d.status == 1) {
          this.Tips.modal = false;
          this.State = false;
          this.CloseBtn();
          this.$Message.success(d.message);
        } else {
          this.$Message.error(d.message);
        }
      });
    },
    //代扣还款
    WriteOffOpt() {
      console.log(this.is_period);

      if (this.is_period == 1) {
        this.Repayment = {
          modal: true,
          orderId: this.order_id,
          user_id: this.InitId
        };
      } else {
        this.WithholdModal.modal = true;
        this.WithholdModal.value = this.back_price;
      }
    },
    RepaymentCancel() {
      this.RefreshList();
      this.Repayment = {
        modal: false,
        orderId: "",
        user_id: ""
      };
    },
    WithholdCancel() {
      this.WithholdModal.modal = false;
    },
    WithholdOver() {
      this.$post("/backend/finance-new-loan/period-loan-order", {
        order_num: this.order_id
      }).then(d => {
        if (d.status == 1) {
          this.WithholdModal.modal = false;
          this.$Message.success("扣款成功");
        } else {
          this.$Message.error(d.message);
        }
      });
    },
    RemoveBlackCancel() {
      this.removeBlack.modal = false;
    },
    //移除黑名单
    removeBlackOver() {
      this.$post("/backend/black/del", {
        uid: this.InitId
      }).then(d => {
        // console.log(d);
        if (d.status == 1) {
          this.$Message.success("移除成功");
          this.removeBlack.modal = false;
          this.InitData(this.InitId);
        } else {
          this.$Message.error("移除失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#towardsLeft {
  display: flex;
  flex-direction: row;
}
.head-area {
  color: #333;
}
.big-head {
  font-size: 26px;
  display: flex;
  line-height: 26px;
}
.close-icon {
  margin-top: 5px;
  font-size: 26px;
  color: #333;
}
.content {
  font-size: 14px;
  height: 540px;
  overflow: hidden;
  background-color: #ffffff;
  color: #768387;
}
.footer-area {
  #towardsLeft;
  justify-content: space-between;
}
.right-box {
  height: 540px;
  overflow: auto;
  background: #ffffff;
}
.head-info {
  #towardsLeft;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  .avator {
    width: 60px;
    height: 60px;
    margin: 2px 15px 0;
    position: relative;
    cursor: pointer;
    .text {
      text-align: center;
      font-size: 12px;
    }
    .icon {
      position: absolute;
      bottom: 0;
      right: -25px;
      font-size: 25px;
      &.male {
        color: rgb(65, 177, 228);
      }
      &.female {
        color: rgb(228, 58, 141);
      }
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .third-party {
    width: 620px;
    #towardsLeft;
    justify-content: space-between;
    .res-box {
      width: 120px;
      text-align: center;
      .simple {
        width: 100%;
        padding: 8px 3px;
        margin-bottom: 5px;
        white-space: nowrap;
        color: #fff;
        border-radius: 5px;
        background-color: #919191;
        &.edit-part {
          cursor: pointer;
        }
        &.edit-auth {
          padding: 6px 3px;
        }
        &.type1 {
          background-color: #00a854;
        }
        &.type2 {
          background-color: #d73435;
        }
      }
      .title {
        width: 100%;
        padding: 8px 3px;
        color: #333;
        border-radius: 5px;
        background-color: #7ec2f3;
        &.active {
          cursor: pointer;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            transform: translateX(-50%);
            transform-origin: 0 center;
            top: -4px;
            right: -8px;
            height: 12px;
            width: 12px;
            border-radius: 100%;
            background: #ed3f14;
            z-index: 2;
            box-shadow: 0 0 0 1px #fff;
          }
        }
      }
    }
  }
}
.info-area {
  padding: 0 30px;
  border-right: 1px solid #eee;
  .single-line {
    padding-top: 10px;
    border-bottom: 1px solid #eee;
    .label {
      font-size: 18px;
      line-height: 25px;
    }
    .cross {
      display: flex;
      flex-direction: row;
    }
    .value {
      font-size: 12px;
      min-height: 45px;
      line-height: 45px;
      .line {
        line-height: 25px;
      }
      .num {
        font-size: 16px;
        color: #f74c17;
      }
      &.long {
        padding: 5px 0;
      }
    }
    .idcard-box {
      width: 100%;
      padding: 10px 0;
      img {
        max-width: 80%;
        margin-right: 10%;
      }
    }
  }
}
.record-box {
  max-height: 540px;
  overflow: auto;
}
.nav-box {
  width: 100%;
  background: #fff;
  padding: 15px 10px;
  font-size: 16px;
  #towardsLeft;
  justify-content: space-between;
  .nav-block {
    width: 100px;
    padding: 15px 0;
    text-align: center;
    background: #bfbfbf;
    color: #fff;
    border-radius: 5px;
    &.cur {
      background: #00a2ae;
    }
  }
}
.info-box {
  width: 100%;
  padding-bottom: 5px;
  font-size: 14px;
  line-height: 25px;
  #towardsLeft;
  .remark-box {
    padding-bottom: 10px;
  }
  span {
    display: inline-block;
  }
  .half {
    width: 50%;
  }
  .label {
    width: 50px;
  }
  .value {
    width: 280px;
  }
}
.textarea {
  padding-bottom: 10px;
}
.limit-input {
  padding-left: 5px;
}
.base-info {
  position: relative;
  padding: 5px 15px;
  .bot-btn {
    padding-bottom: 10px;
  }
}
.trade-record,
.opt-record {
  padding: 10px 10px 15px;
}
.urge-add {
  padding-bottom: 10px;
}
.count-box {
  border: 1px solid #666;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #fff;
  .count-line {
    border-top: 1px solid #666;
    #towardsLeft;
    .title,
    .value {
      padding: 5px 0;
      padding-left: 10px;
      width: 50%;
      text-align: left;
      display: inline-block;
      .num {
        color: #333;
        font-size: 16px;
      }
    }
    .title {
      border-right: 1px solid #666;
    }
    &:nth-child(1) {
      border: none;
    }
  }
}
.card-area {
  margin-bottom: 15px;
  overflow: auto;
  .user-title {
    padding-bottom: 10px;
  }
}
.lend-info {
  position: relative;
  .row-box,
  &.row {
    display: flex;
    flex-direction: row;
  }
  &.child {
    border-top: 1px solid #e3e3e3;
  }
  .part-title {
    font-size: 18px;
    display: block;
    padding: 6px 0;
    &.loan {
      color: #40a9ff;
    }
    &.delay {
      color: #ff4d4f;
    }
    &.repay {
      color: #47b717;
    }
  }
  .main-part {
    width: 50%;
  }
  .side-part {
    width: 50%;
    padding-left: 10px;
  }
  .yq_state {
    position: absolute;
    right: -8px;
    top: -10px;
    font-size: 20px;
    color: #f00;
  }
  .text-line {
    width: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    .status {
      font-weight: bold;
    }
    .price_num {
      color: #f00;
    }
    &.remark {
      width: 100%;
      padding-bottom: 20px;
    }
    .value {
      color: #f74c17;
      font-size: 14px;
      &.num {
        font-size: 22px;
      }
      &.state {
        color: #19be6b;
        &.nopay {
          color: #f7830c;
        }
      }
    }
  }
}
.lxr-line {
  line-height: 40px;
}
.opt-log {
  padding: 12px 0;
  border-bottom: 1px solid #e3e3e3;
  &:nth-last-child(1) {
    border: none;
  }
  .line {
    line-height: 25px;
  }
}
.inline-block {
  display: inline-block;
}
.clipBtn {
  display: none;
}
.head-input {
  width: 80px;
  border: none;
  text-align: center;
  color: #fff;
  background-color: #919191;
  &.type1 {
    background-color: #00a854;
  }
  &.type2 {
    background-color: #d73435;
  }
}
.cap-select {
  display: inline-block;
  width: 80px;
}
.czr-text {
  cursor: pointer;
}

.item_title {
  margin-left: 15px;
}

.item_body {
  height: 50px;
  line-height: 30px;
  padding: 10px 40px;
  font-size: 16px;
}
.item_icon {
  width: 25px;
  height: 25px;
  margin-top: 2px;
}
a {
  text-decoration: none;
  color: #919191;
}

.management_padding {
  // height: 540px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.transaction_body {
  font-size: 14px;
  color: #333333;
}
.transaction_top {
  padding: 26px 40px;
  background-color: #ffffff;
}
.font_num {
  font-size: 18px;
}
.transaction_top_first {
  margin-bottom: 25px;
  text-align: center;
}
.left_border {
  text-align: center;
}
.border_left {
  border-left: 1px solid #e9eaec;
  height: 540px;
  background-color: #f5f8f9;
}
.withe {
  background-color: #ffffff;
}
.transaction_main {
  background-color: #ffffff;
  font-size: 10px;
  // padding: 0 38px;
  // margin-bottom: 10px;
}
li &.cur {
  background-color: #f5f8f9;
}
.borrowing {
  color: #f39c39;
}
.green {
  color: #00a854;
}
.blue {
  color: #2db7f5;
}
.transaction_floot {
  background-color: #ffffff;
  padding: 0 38px;
}
.red {
  color: #f33855;
}
.padding_15 {
  padding: 10px 10px;
  background-color: #f8f8f8;
  margin-bottom: 12px;
  border-radius: 4px;
  text-align: center;
}
.padding_15:last-child {
  margin: 0;
}
.border_top {
  border-top: 1px solid #f5f8f9;
}
.operation_top {
  background-color: #ffffff;
  padding: 10px 35px;
  text-align: center;
}
.operation_body {
  font-size: 14px;
  color: #333333;
}
.prominent {
  font-size: 20px;
}
.operation_main {
  background-color: #ffffff;
  margin: 15px;
  // padding: 15px;
}
.opteration_time {
  text-align: center;
}
.opteration_man {
  color: #40a9ff;
}
.main_data {
  max-height: 200px;
  overflow: auto;
  margin-top: 10px;
}
.ooder_text {
  text-align: center;
  padding-top: 40px;
}
.beizhu {
  z-index: 999;
}
.m_top {
  margin-top: 10px;
  border-bottom: 1px solid #2db7f5;
}
.top_name {
  display: inline-block;
  width: 170px;
  height: 22px;
  background-color: #2db7f5;
  color: #ffffff;
  text-align: center;
}
.m_body {
  border: 2px solid #f0f6f8;
  padding: 10px;
  line-height: 24px;
  margin: 10px 0;
  box-sizing: border-box;
}
.me_body {
  border-top: 2px solid #f0f6f8;
  border-left: 2px solid #f0f6f8;
  margin: 0 10px;
  line-height: 24px;
  margin: 10px 0;
}
.m_item_top {
  padding: 10px 0;
  text-align: center;
  border-right: 2px solid #f0f6f8;
  border-bottom: 2px solid #f0f6f8;
}
.iframe {
  width: 98%;
  height: 100%;
}
.tips {
  text-align: center;
  font-size: 25px;
}
.tipsImg {
  margin-top: 40px;
  width: 100px;
  height: 100px;
}
.text_Primary {
  display: inline-block;
  color: #2d8cf0;
}
.page-box {
  padding: 20px;
  display: flex;
  flex-direction: row-reverse;
}
.heimingdan {
  z-index: 1000;
}
.transaction_card {
  margin: 10px;
}

.top {
  background-color: #e8eaec;
  // color: #fff;
  // font-weight: bold;
}
.bor_bottom {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background: rgba(234, 242, 235, 1);
  border-radius: 1px;
  vertical-align: center;
}
.record {
  height: 350px;
  overflow: auto;
}
.prominent_small {
  font-size: 14px;
}
.zt {
  width: 35px;
  height: 35px;
}
.dingdanbody {
  // height: 200px;
  overflow: auto;
  padding: 10px 40px;
}
.bode_time {
  text-align: center;
}
.bode_name {
  color: #2db7f5;
}
.btn_level {
  margin: 0 10px 5px;
  border: none;
}
.risk_yellow {
  background-color: #f6c057;
  color: #ffffff;
}
.risk_blue {
  background-color: #76c1dd;
  color: #ffffff;
}
.risk_red {
  background-color: #ec786b;
  color: #ffffff;
}
.sbpa {
  padding-top: 17px;
}
.iphone_user {
  width: 56px;
  height: 76px;
}
</style>
