import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('../views/login.vue')
  },
  {
    path: '/registered',
    name: 'registered',
    meta: {
      title: '注册',
      keepAlive: true,
    },
    component: () => import('../views/registered.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    meta: {
      title: '忘记密码',
    },
    component: () => import('../views/forget.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      // title: '首页',
      haveTitle: true,
      home: true,
      navShow: true
    },
    component: () => import('../views/home.vue')
  },
  {
    path: '/surrender',
    name: 'surrender',
    meta: {
      title: '中介代还',
      left: true
    },
    component: () => import('../views/surrender/surrender.vue')
  },
  {
    path: '/payForm',
    name: 'payForm',
    meta: {
      title: '支付',
      left: true
    },
    component: () => import('../views/payForm.vue')
  },
  {
    path: '/upgrade',
    name: 'upgrade',
    meta: {
      title: '会员中心',
      bgLeft: true
    },
    component: () => import('../views/member/upgrade.vue')
  },
  {
    path: '/shareimg',
    name: 'shareimg',
    meta: {
      title: '分享',
      navShow: true,
    },
    component: () => import('../views/share/shareimg.vue')
  },
  {
    path: '/income',
    name: 'income',
    meta: {
      title: '收益',
      income: true,
      navShow: true
    },
    component: () => import('../views/income/income.vue')
  },
  {
    path: '/billinquiry',
    name: 'billinquiry',
    meta: {
      title: '账单查询',
      bgLeft: true,
    },
    component: () => import('../views/billinquiry.vue')
  },
  {
    path: '/billinquirydetail',
    name: 'billinquirydetail',
    meta: {
      title: '',
      bgLeft: true,
    },
    component: () => import('../views/billinquirydetail.vue')
  },
  {
    path: '/partnerpage',
    name: 'partnerpage',
    meta: {
      title: '',
      navShow: true
    },
    component: () => import('../views/partnerpage.vue')
  },
  {
    path: '/incomeList',
    name: 'incomeList',
    meta: {
      title: '',
      incomeList: true,
    },
    component: () => import('../views/income/incomeList.vue')
  },
  {
    path: '/my',
    name: 'my',
    meta: {
      title: '我的',
      bgTitle: true,
      navShow: true,
    },
    component: () => import('../views/my/my.vue')
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    meta: {
      title: '关于我们',
      bgLeft: true,
    },
    component: () => import('../views/my/aboutUs.vue')
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    meta: {
      title: '我的资料',
      bgLeft: true,
    },
    component: () => import('../views/my/personalInfo.vue')
  },
  {
    path: '/editName',
    name: 'editName',
    meta: {
      title: '修改昵称',
      left: true
    },
    component: () => import('../views/my/editName.vue')
  },
  {
    path: '/real',
    name: 'real',
    meta: {
      title: '实名认证',
      bgTitle: true
    },
    component: () => import('../views/real/real.vue')
  },
  {
    path: '/medium',
    name: 'medium',
    meta: {
      title: '中介卡包',
      left: true
    },
    component: () => import('../views/real/medium.vue')
  },
  {
    path: '/team',
    name: 'team',
    meta: {
      title: '我的团队',
      bgLeft: true
    },
    component: () => import('../views/my/team.vue'),
    children: [
      {
        path: '/teamItem',
        name: 'teamItem',
        meta: {
          title: '',
          bgLeft: true
        },
        component: () => import('../views/my/teamItem.vue')
      },
    ]
  },
  {
    path: '/retreat',
    name: 'retreat',
    meta: {
      title: '提现',
      bgLeft: true,
      retreat: true,
    },
    component: () => import('../views/my/retreat.vue')
  },
  {
    path: '/sxTx',
    name: 'sxTx',
    meta: {
      title: '提现',
      bgLeft: true,
      sxTx: true,
    },
    component: () => import('../views/my/sxTx.vue')
  },
  {
    path: '/czjl',
    name: 'czjl',
    meta: {
      title: '充值记录',
      bgLeft: true,
    },
    component: () => import('../views/my/czjl.vue')
  },
  {
    path: '/hkjh',
    name: 'hkjh',
    meta: {
      title: '查看计划',
      bgLeft: true,
    },
    component: () => import('../views/my/hkjh.vue')
  },
  {
    path: '/change',
    name: 'change',
    meta: {
      title: '更换储蓄卡',
      bgLeft: true
    },
    component: () => import('../views/my/change.vue')
  },
  {
    path: '/transactionRecord',
    name: 'transactionRecord',
    meta: {
      title: '交易记录',
      bgLeft: true
    },
    component: () => import('../views/my/transactionRecord.vue'),
  },
  {
    path: '/sqs',
    name: 'sqs',
    meta: {
      title: '授权证书',
      bgLeft: true
    },
    component: () => import('../views/my/sqs.vue'),
  },
  {
    path: '/inComeList',
    name: 'inComeList',
    meta: {
      title: '收益中心',
      bgLeft: true
    },
    component: () => import('../views/my/inComeList.vue'),
  },
  {
    path: '/emptyCardCredit',
    name: 'emptyCardCredit',
    meta: {
      title: '空卡授信',
      bgLeft: true
    },
    component: () => import('../views/my/emptyCardCredit.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    meta: {
      title: '客服',
      bgLeft: true
    },
    component: () => import('../views/my/customer.vue')
  },
  {
    path: '/onlineCustomer',
    name: 'onlineCustomer',
    meta: {
      title: '在线客服',
      bgLeft: true
    },
    component: () => import('../views/my/onlineCustomer.vue')
  },
  {
    path: '/czsp',
    name: 'czsp',
    meta: {
      title: '操作视频',
      bgLeft: true
    },
    component: () => import('../views/my/czsp.vue')
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    meta: {
      title: '帮助中心',
      bgLeft: true
    },
    component: () => import('../views/my/helpCenter.vue')
  },
  {
    path: '/helpCenterInfo',
    name: 'helpCenterInfo',
    meta: {
      title: '',
      bgLeft: true
    },
    component: () => import('../views/my/helpCenterInfo.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      bgLeft: true,
    },
    component: () => import('../views/my/setting.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    meta: {
      title: '',
      bgLeft: true
    },
    component: () => import('../views/collection.vue')
  },
  {
    path: '/selectChannel',
    name: 'selectChannel',
    meta: {
      title: '选择通道',
      bgLeft: true
    },
    component: () => import('../views/collection/selectChannel.vue')
  },
  {
    path: '/withdrawRecord',
    name: 'withdrawRecord',
    meta: {
      title: '提现记录',
      bgLeft: true
    },
    component: () => import('../views/my/withdrawRecord.vue')
  },
  {
    path: '/select',
    name: 'select',
    meta: {
      title: '快捷收款',
      bgLeft: true,
    },
    component: () => import('../views/collection/select.vue')
  },
  {
    path: '/aisle',
    name: 'aisle',
    meta: {
      title: '制定计划',
      bgLeft: true,
      keepAlive: true
    },
    component: () => import('../views/collection/aisle.vue')
  },
  {
    path: '/moreAisle',
    name: 'moreAisle',
    meta: {
      title: '制定计划',
      bgLeft: true,
      keepAlive: true
    },
    component: () => import('../views/repayment/moreAisle.vue')
  },
  {
    path: '/oneCardDh',
    name: 'oneCardDh',
    meta: {
      title: '一卡多还',
      bgBlue: true,
      oneCardDh: true,
    },
    component: () => import('../views/repayment/oneCardDh.vue')
  },
  {
    path: '/planInfo',
    name: 'planInfo',
    meta: {
      title: '计划详情',
      bgLeft: true,
    },
    component: () => import('../views/repayment/planInfo.vue')
  },
  {
    path: '/addPlan',
    name: 'addPlan',
    meta: {
      title: '制定计划',
      bgBlue: true,
    },
    component: () => import('../views/repayment/addPlan.vue'),
    children: [
    ]
  },
  {
    path: '/choseCard',
    name: 'choseCard',
    meta: {
      title: '选择卡片',
      bgBlue: true,
      select: true,
    },
    component: () => import('../views/repayment/choseCard.vue')
  },
  {
    path: '/choseChannel',
    name: 'choseChannel',
    meta: {
      title: '选择通道',
      bgBlue: true,
      // keepAlive: true,
    },
    component: () => import('../views/repayment/choseChannel.vue')
  },
  {
    path: '/oneMoreLookPlan',
    name: 'oneMoreLookPlan',
    meta: {
      title: '预览计划',
      bgBlue: true,
      preview: true,
    },
    component: () => import('../views/repayment/oneMoreLookPlan.vue')
  },
  {
    path: '/cardadmin',
    name: 'cardadmin',
    meta: {
      title: '卡片管理',
      aisleLeft: true
    },
    component: () => import('../views/real/cardadmin.vue')
  },
  {
    path: '/selectcard',
    name: 'selectcard',
    meta: {
      title: '智能还款',
      bgLeft: true,
    },
    component: () => import('../views/real/selectcard.vue')
  },
  {
    path: '/cool',
    name: 'cool',
    meta: {
      title: '朋友圈',
      bgLeft: true
    },
    component: () => import('../views/Information/cool.vue')
  },
  {
    path: '/ifarme',
    name: 'ifarme',
    meta: {
      title: '协议',
      bgBlue: true,
      bgLeft: true
    },
    component: () => import('../views/ifarme.vue')
  },
  {
    path: '/intermediaryagency',
    name: 'intermediaryagency',
    meta: {
      title: '中介代还',
      bgBlue: true
    },
    component: () => import('../views/my/intermediaryagency.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    meta: {
      title: '提交计划',
      bgLeft: true
    },
    component: () => import('../views/plan/submit.vue')
  },
  {
    path: '/exhaustive',
    name: 'exhaustive',
    meta: {
      title: '查看计划',
      bgLeft: true
    },
    component: () => import('../views/plan/exhaustive.vue')
  },
  {
    path: '/particular',
    name: 'particular',
    meta: {
      title: '计划详情',
      bgLeft: true
    },
    component: () => import('../views/plan/particular.vue')
  },
  {
    path: '/matter',
    name: 'matter',
    meta: {
      title: '查看资料',
      bgLeft: true
    },
    component: () => import('../views/plan/matter.vue')
  },
  {
    path: '/addcard',
    name: 'addcard',
    meta: {
      title: '添加信用卡',
      bgLeft: true
    },
    component: () => import('../views/plan/addcard.vue')
  },
  {
    path: '/cardinfo',
    name: 'cardinfo',
    meta: {
      title: '修改卡信息',
      bgLeft: true
    },
    component: () => import('../views/plan/cardinfo.vue')
  },
  {
    path: '/tiedcard',
    name: 'tiedcard',
    meta: {
      title: '通道绑卡',
      bgLeft: true
    },
    component: () => import('../views/plan/tiedcard.vue')
  },
  {
    path: '/code',
    name: 'code',
    meta: {
      title: '支付',
      bgLeft: true
    },
    component: () => import('../views/code.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    meta: {
      title: '预览计划',
      bgLeft: true,
      preview: true,
    },
    component: () => import('../views/plan/preview.vue')
  },
  {
    path: '/hdzq',
    name: 'hdzq',
    meta: {
      title: '活动专区',
      bgLeft: true,
    },
    component: () => import('../views/hdzq.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      title: '公告',
      bgLeft: true
    },
    component: () => import('../views/Information/message.vue'),
    children: [
      {
        path: '/messageInfo',
        name: 'messageInfo',
        meta: {
          title: '公告详情',
          bgLeft: true
        },
        component: () => import('../views/Information/messageInfo.vue')
      },
    ]
  },
  {
    path: '/cardlist',
    name: 'cardlist',
    meta: {
      title: '银行卡管理',
      bgLeft: true
    },
    component: () => import('../views/my/cardlist.vue')
  },
  {
    path: '/changepaw',
    name: 'changepaw',
    meta: {
      title: '修改密码',
      bgLeft: true
    },
    component: () => import('../views/changepaw.vue')
  },
  {
    path: '/zhgl',
    name: 'zhgl',
    meta: {
      title: '账号管理',
      bgLeft: true
    },
    component: () => import('../views/my/zhgl.vue')
  },
  {
    path: '/addZh',
    name: 'addZh',
    meta: {
      title: '添加账号',
      bgLeft: true
    },
    component: () => import('../views/my/addZh.vue')
  },
  {
    path: '/editPhone',
    name: 'editPhone',
    meta: {
      title: '修改手机号',
      bgLeft: true
    },
    component: () => import('../views/my/editPhone.vue')
  },
  {
    path: '/imgIframe',
    name: 'imgIframe',
    meta: {
      title: '',
      bgLeft: true
    },
    component: () => import('../views/imgIframe.vue')
  },
  {
    path: '/htmlIframe',
    name: 'htmlIframe',
    meta: {
      title: '',
      left: true
    },
    component: () => import('../views/htmlIframe.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
