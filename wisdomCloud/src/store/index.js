import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex);

const state = {
  username: '',
  currentpath: '',
  authView: [],
  firstview: '',
  chargeType: {
    // 1:'电商报告认证费',
    // 2:'短信验证码费用',
    // 3:'人脸识别费用'
    // 1: '充值', 2: '人脸', 3: '淘宝', 4: '运营商', 5: 'QQ', 6: '机审扣费', 7: '注册验证码', 8: '更换密码验证码', 9: '风控报告扣费', 10: '更新风控报告', 11: '续借机审扣费'
    1: '充值', 2: '人脸识别', 3: '淘宝授权', 4: '运营商授权', 5: 'QQ授权', 6: '机审', 7: '注册验证码', 8: '更换密码验证码', 9: '风控报告', 10: '更新风控报告', 11: '续借机审',12:"通知短信",13:'催收短信',14:'推广注册短信'
  },
  riskLevel:[
  {num:'0',name:'多头借贷',title:'真实借款平台数>3',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'2',name:'羊毛党',title:'用户在多家互联网理财平台进行投资且投资额度较小',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'5',name:'作弊软件',title:'有盾设备指纹技术识别到该用户曾经使用的某个设备中安装了作弊软件',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'8',name:'关联过多',title:'同设备使用用户数>=5／同用户使用设备数>=10／同用户关联银行卡数>=10／同用户关联手机数>=5',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'10',name:'曾使用可疑设备',title:'有盾设备指纹技术识别到该用户曾经使用的某个设备修改过关键信息',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'11',name:'安装极多借贷app',title:'用户使用的设备中含有一个设备安装的借贷app数量>=10',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'23',name:'网贷不良',title:'命中有盾网贷不良黑名单，逾期天数为30～90天',cls:'risk_yellow',time:'',class:'risk_yellow'},
  {num:'24',name:'短期逾期',title:'命中有盾短期逾期黑名单，逾期天数为0～30天',cls:'risk_blue',time:'',class:'risk_blue'},
  {num:'6',name:'法院失信',title:'命中法院失信名单',cls:'risk_red',time:'',class:'risk_red'},
  {num:'7',name:'网贷失信',title:'命中有盾网贷失信黑名单，逾期天数为90天以上',cls:'risk_red',time:'',class:'risk_red'},
    {num:'13',name:'身份信息疑似泄漏',title:'用户信息存在被盗用的嫌疑',cls:'risk_red',time:'',class:'risk_red'},
    {num:'17',name:'活体攻击设备',title:'该用户使用的某个设备曾今有过活体攻击行为。活体攻击行为是指通过照片、面具模拟及屏幕翻拍等非真人活体操作的情况',cls:'risk_red',time:'',class:'risk_red'},
    {num:'18',name:'活体攻击行为',title:'有盾云慧眼系统识别出该用户有过活体攻击行为。活体攻击行为是指通过照片、面具模拟及屏幕翻拍等非真人活体操作的情况',cls:'risk_red',time:'',class:'risk_red'},
    {num:'21',name:'疑似欺诈团伙',title:'命中有盾疑似团伙欺诈名单库；疑似欺诈团伙黑名单是有盾将表面看起来没有关联性的成员通过共用相同的属性（设备、电话、银行卡等）而集中在一起并有欺诈嫌疑行为的用户群体',cls:'risk_red',time:'',class:'risk_red'},
    
],
  status: {
    1: '启用',
    2: '禁用'
  },
  orderStatus: {
    // 1:'订单生成',
    // 2:'审核通过',
    // 3:'财务通过',
    // 4:'放款成功',
    // 5:'用户完成',
    // 6:'后台完成',
    // 8:'运营审核不通过',
    // 9:'财务审核不通过'
    1: '待审核',
    2: '待放款',
    3: '放款中',
    4: '已放款',
    5: '用户主动还款',
    6: '系统自动扣款',
    8: '审核员拒绝',
    9: '财务拒绝',
    10: '线下销账'
  },
  payType: {
    //1表示放款，2表示线上还款，3表示线下还款
    1: '放款',
    2: '线上还款',
    3: '线下还款',
    4: '消帐还款'
  }
};

const getters = {
  permission: state => {
    return state.authView;
  },
  chargeType: state => state.chargeType,
  status: state => state.status,
  orderStatus: state => state.orderStatus,
  riskLevel: state => state.riskLevel,
  payType: state => state.payType,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
