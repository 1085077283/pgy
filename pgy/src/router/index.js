import Vue from 'vue'
import Router from 'vue-router'
import { getLocal, saveLocal } from '@/util/util'
import store from '@/store'
import axios from 'axios'

//通用模块
import AdminFrame from '@/components/AdminFrame'
import NoContent from '@/components/NoContent'
import NotFind from '@/components/NotFind'
import OperateRes from '@/components/phoneView/OperateRes'
import WorkliuMobile from '@/components/phoneView/WorkliuMobile'
import TaobaoReport from '@/components/reportTable/TaobaoReport'
import CarrierReport from '@/components/reportTable/CarrierReport'
import Report from '@/components/reportTable/Report'

//登录模块
import Login from '@/views/login/Login'

//权限模块
import listRole from '@/views/auth/listRole'
import listUser from '@/views/auth/listUser'
import listDepartment from '@/views/auth/listDepartment'
import listAuth from '@/views/auth/listAuth'

//用户管理
import consumerList from '@/views/user/consumerList'
import blackList from '@/views/user/BlackList'
import riskControl from '@/views/user/RiskControl'
import CustomeFeedback from '@/views/user/CustomeFeedback'


//交易记录
//import bindApply from '@/views/loan/bindApply'
//import bindList from '@/views/loan/bindList'
//import loanApply from '@/views/loan/loanApply'
import orderList from '@/views/loan/orderList'
import loanList from '@/views/loan/loanList'
import InstallmentPlan from '@/views/loan/InstallmentPlan'
import RepaymentPlan from '@/views/loan/RepaymentPlan'
//import delayApply from '@/views/loan/delayApply'
import delayList from '@/views/loan/delayList'
//import repayApply from '@/views/loan/repayApply'
import repayList from '@/views/loan/repayList'
import orderPay from '@/views/loan/orderPay'
import contractList from '@/views/loan/contractList'
import contractInfo from '@/views/loan/contract/contractInfo'

//催收管理
import urgeList from '@/views/urge/urgeList'
import badDebtList from '@/views/urge/badDebtList'
import repayConfirm from '@/views/urge/repayConfirm'

//工作流平台
import workliuList from '@/views/workliu/workliuList'
import workCommission from '@/views/workliu/workCommission'
import reviewPanel from '@/views/workliu/reviewPanel'
import loanPanel from '@/views/workliu/loanPanel'

//推送管理
import autoPost from '@/views/post/autoPost'
import templateEdit from '@/views/post/templateEdit'

//配置管理
import userConfig from '@/views/config/userConfig'
import MerchantConfig from '@/views/config/MerchantConfig'
import formulaConfig from '@/views/config/formulaConfig'
import versionConfig from '@/views/config/versionConfig'
import unifiedConfig from '@/views/config/unifiedConfig'
import payConfig from '@/views/config/payConfig'
import commissionFormula from '@/views/config/commissionFormula'
import reviewConfig from '@/views/config/reviewConfig'
import urgeConfig from '@/views/config/urgeConfig'
import dingList from '@/views/config/dingList'
import diversion from '@/views/config/diversion'
import smsConfig from '@/views/config/smsConfig'
import riskConfig from '@/views/config/riskConfig'
import systemConfiguration from '@/views/config/systemConfiguration'

//定时任务
import taskList from '@/views/task/taskList'
import taskLog from '@/views/task/taskLog'

//充值
import rechargeIndex from '@/views/recharge/rechargeIndex'
import rechargeList from '@/views/recharge/rechargeList'

//推广管理
import generalizeConfig from '@/views/generalize/generalizeConfig'
import generalizeList from '@/views/generalize/generalizeList'
import generalizeDetail from '@/views/generalize/generalizeDetail'
import generalizeCount from '@/views/generalize/generalizeCount'
import Extend from '@/views/generalize/Extend'
import Registered from '@/views/generalize/Registered'

//统计
import statistiIndex from '@/views/statistical/statistiIndex'
import realTimeStatistics from '@/views/statistical/realTimeStatistics'
import statiTrading from '@/views/statistical/statiTrading'
import statistiDetails from '@/views/statistical/statistiDetails'
import userAnalysis from '@/views/statistical/userAnalysis'


import outLogin from '@/views/extension/outLogin'
//整合所有的模块集合，用于动态路由
const componentList = {
  AdminFrame,
  listRole,
  listUser,
  listDepartment,
  listAuth,

  consumerList,
  blackList,
  orderList,
  riskControl,
  loanList,
  delayList,
  orderPay,
  repayList,
  contractList,
  CustomeFeedback,
  InstallmentPlan,
  RepaymentPlan,

  urgeList,
  badDebtList,
  repayConfirm,

  workliuList,
  reviewPanel,
  loanPanel,
  workCommission,

  taskList,
  taskLog,

  rechargeIndex,
  rechargeList,

  autoPost,
  templateEdit,

  userConfig,
  MerchantConfig,
  formulaConfig,
  versionConfig,
  unifiedConfig,
  payConfig,
  commissionFormula,
  reviewConfig,
  urgeConfig,
  dingList,
  diversion,
  smsConfig,
  riskConfig,
  systemConfiguration,

  generalizeConfig,
  generalizeList,

  statistiIndex,
  statiTrading,
  statistiDetails,
  realTimeStatistics,
  userAnalysis,

  outLogin
};
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: { path: '/login' }
  }, {
    path: '/login',
    name: '登录',
    component: Login
  }, {
    path: '/contractInfo',
    name: '合同详细信息',
    component: contractInfo
  }, {
    path: '/taobaoReport',
    name: '淘宝报表',
    component: TaobaoReport
  }, {
    path: '/report',
    name: '风控报告',
    component: Report
  }, {
    path: '/carrierReport',
    name: '运营商报表',
    component: CarrierReport
  }, {
    path: '/extend',
    name: '推广H5页面',
    component: Extend,
    meta: {
      IsOpen: true
    }
  }, {
    path: '/registered',
    name: '注册完后引导页',
    component: Registered,
    meta: {
      IsOpen: true
    }
  },
  {
    path: '/outLogin',
    name: '外部渠道统计页',
    component: outLogin,
    meta: {
      IsOpen: true
    }
  }, {
    path: '/checkover',
    name: '钉钉按钮结果',
    component: OperateRes,
    meta: {
      IsOpen: true
    }
  }, {
    path: '/workliumob',
    name: '工作流手机版',
    component: WorkliuMobile,
    meta: {
      IsOpen: true
    }
  }
  , {
    path: '/statistical',
    name: '统计中心',
    component: AdminFrame,
    children: [
      {
        path: 'statistiDetails',
        name: '统计详情',
        component: statistiDetails
      }
    ]
  }, {
    path: '/generalize',
    name: '推广管理',
    component: AdminFrame,
    children: [
      {
        path: 'generalizeDetail',
        name: '渠道详情',
        component: generalizeDetail
      }, {
        path: 'generalizeCount',
        name: '渠道统计',
        component: generalizeCount
      }
    ]
  }
  , {
    path: '/notfind',
    name: '页面不存在',
    component: NotFind
  }
]

const router = new Router({
  routes
});

//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
  //推广链接
  if (to.meta.IsOpen) {
    next();
    return;
  }
  const token = getLocal('token');
  if (token) {
    store.dispatch('setView').then(() => {
      let permission = JSON.stringify(store.getters.permission);
      let perdep = JSON.parse(permission);
      perdep.forEach((val) => {
        val.component = componentList[val.component];
        if ('children' in val) {
          val.children.forEach((vval) => {
            if (vval.component in componentList) {
              vval.component = componentList[vval.component];
            } else {
              vval.component = NoContent;
            }
          })
        }
      });
      router.addRoutes(perdep);
    });
    if (to.query.admin_url) {
      next();
      return;
    }
    saveLocal('path', to.path);
    if (to.meta.id) {
      saveLocal('auth_id', to.meta.id);
    }
    if (to.path === '/login') {
      next({ path: getLocal('firstview') });
    }

    next();

  } else {

    saveLocal('path', '/login');
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});


export default router;
