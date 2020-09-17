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
    path: '/dragonlist',
    name: 'dragonlist',
    meta: {
      title: '龙虎榜',
      bgBlue: true
    },
    component: () => import('../views/dragonlist.vue')
  },
  {
    path: '/pay',
    name: 'pay',
    meta: {
      title: '会员升级',
      left: true
    },
    component: () => import('../views/member/pay.vue')
  },
  {
    path: '/paycopy',
    name: 'paycopy',
    meta: {
      title: '支付',
      left: true
    },
    component: () => import('../views/member/paycopy.vue')
  },
  {
    path: '/share',
    name: 'share',
    meta: {
      title: '邀请分享',
      left: true
    },
    component: () => import('../views/share/share.vue')
  },
  {
    path: '/invite',
    name: 'invite',
    meta: {
      title: '推广',
      haveTitle: true,
      navShow: true
    },
    component: () => import('../views/share/invite.vue')
  },
  {
    path: '/faceToface',
    name: 'faceToface',
    meta: {
      title: '面对面注册',
      bgBlue: true,
      keepAlive: true,
    },
    component: () => import('../views/share/registered.vue')
  },
  {
    path: '/shareimg',
    name: 'shareimg',
    meta: {
      title: '分享',
      bgBlue: true,
    },
    component: () => import('../views/share/shareimg.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    meta: {
      title: '面对面注册',
      left: true,
    },
    component: () => import('../views/share/reg.vue')
  },
  {
    path: '/income',
    name: 'income',
    meta: {
      title: '收益',
      haveTitle: true,
      navShow: true
    },
    component: () => import('../views/income/income.vue')
  },
  {
    path: '/incomeList',
    name: 'incomeList',
    meta: {
      title: '',
      bgBlue: true,
    },
    component: () => import('../views/income/incomeList.vue')
  },
  {
    path: '/microMarketing',
    name: 'microMarketing',
    meta: {
      title: '微营销',
      noLeft: true,
      navShow: true
    },
    component: () => import('../views/Information/microMarketing.vue')
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
    path: '/deposit',
    name: 'deposit',
    meta: {
      title: '实名认证',
      left: true
    },
    component: () => import('../views/real/deposit.vue')
  },
  {
    path: '/leaderBoard',
    name: 'leaderBoard',
    meta: {
      title: '排行榜',
      bgBlue: true
    },
    component: () => import('../views/my/leaderBoard.vue')
  },
  {
    path: '/team',
    name: 'team',
    meta: {
      title: '我的团队',
      bgBlue: true
    },
    component: () => import('../views/my/team.vue'),
    children: [
      {
        path: '/teamItem',
        name: 'teamItem',
        meta: {
          title: '',
          bgBlue: true
        },
        component: () => import('../views/my/teamItem.vue')
      },
    ]
  },
  {
    path: '/loopList',
    name: 'loopList',
    meta: {
      title: '朋友圈数据',
      left: true
    },
    component: () => import('../views/my/loopList.vue')
  },
  {
    path: '/integraldetails',
    name: 'integraldetails',
    meta: {
      title: '我的积分',
      bgBlue: true,
      integraldetails: true,
    },
    component: () => import('../views/my/integraldetails.vue')
  },
  {
    path: '/integralList',
    name: 'integralList',
    meta: {
      title: '积分明细',
      left: true
    },
    component: () => import('../views/my/integralList.vue')
  },
  {
    path: '/deductionRecords',
    name: 'deductionRecords',
    meta: {
      title: '扣费记录',
      left: true
    },
    component: () => import('../views/my/deductionRecords.vue')
  },
  {
    path: '/kfjl',
    name: 'kfjl',
    meta: {
      title: '扣费记录',
      left: true
    },
    component: () => import('../views/my/kfjl.vue')
  },
  {
    path: '/marginDeposit',
    name: 'marginDeposit',
    meta: {
      title: '保证金充值',
      left: true
    },
    component: () => import('../views/my/marginDeposit.vue')
  },
  {
    path: '/marginDepositZj',
    name: 'marginDepositZj',
    meta: {
      title: '保证金充值',
      left: true
    },
    component: () => import('../views/my/marginDepositZj.vue')
  },
  {
    path: '/incomedetails',
    name: 'incomedetails',
    meta: {
      title: '积分记录',
      bgBlue: true
    },
    component: () => import('../views/my/incomedetails.vue')
  },
  {
    path: '/straight',
    name: 'straight',
    meta: {
      title: '我的直推',
      left: true
    },
    component: () => import('../views/my/straight.vue')
  },
  {
    path: '/between',
    name: 'between',
    meta: {
      title: '我的间推',
      left: true
    },
    component: () => import('../views/my/between.vue')
  },
  {
    path: '/unnamed',
    name: 'unnamed',
    meta: {
      title: '未实名用户',
      left: true
    },
    component: () => import('../views/my/unnamed.vue')
  },
  {
    path: '/wallet',
    name: 'wallet',
    meta: {
      title: '我的钱包',
      bgBlue: true
    },
    component: () => import('../views/my/wallet.vue')
  },
  {
    path: '/renew',
    name: 'renew',
    meta: {
      title: '绑定信息',
      left: true
    },
    component: () => import('../views/real/renew.vue')
  },
  {
    path: '/today',
    name: 'today',
    meta: {
      title: '今日收入',
      left: true
    },
    component: () => import('../views/my/today.vue')
  },
  {
    path: '/mouth',
    name: 'mouth',
    meta: {
      title: '当月收益',
      left: true
    },
    component: () => import('../views/my/mouth.vue')
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      title: '详情',
      left: true
    },
    component: () => import('../views/my/details.vue')
  },
  {
    path: '/cumulative',
    name: 'cumulative',
    meta: {
      title: '详情',
      left: true
    },
    component: () => import('../views/my/cumulative.vue')
  },
  {
    path: '/retreat',
    name: 'retreat',
    meta: {
      title: '佣金提现',
      left: true,
      withdraw: true
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
    path: '/coupon',
    name: 'coupon',
    meta: {
      title: '优惠券',
      left: true
    },
    component: () => import('../views/my/coupon.vue')
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
    path: '/emptyCardCredit',
    name: 'emptyCardCredit',
    meta: {
      title: '空卡授信',
      bgLeft: true
    },
    component: () => import('../views/my/emptyCardCredit.vue')
  },
  {
    path: '/activityAward',
    name: 'activityAward',
    meta: {
      title: '活动奖励',
      left: true
    },
    component: () => import('../views/my/activityAward.vue')
  },
  {
    path: '/activityAwardInfo',
    name: 'activityAwardInfo',
    meta: {
      title: '活动奖励',
      left: true
    },
    component: () => import('../views/my/activityAwardInfo.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    meta: {
      title: '客服',
      bgBlue: true
    },
    component: () => import('../views/my/customer.vue')
  },
  {
    path: '/signIn',
    name: 'signIn',
    meta: {
      title: '签到',
      bgBlue: true
    },
    component: () => import('../views/signIn.vue')
  },
  {
    path: '/server',
    name: 'server',
    meta: {
      title: '我要反馈',
      bgBlue: true
    },
    component: () => import('../views/my/server.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      title: '设置',
      bgBlue: true,
    },
    component: () => import('../views/my/setting.vue')
  },
  {
    path: '/collection',
    name: 'collection',
    meta: {
      title: '收款',
      bgBlue: true
    },
    component: () => import('../views/collection.vue')
  },
  {
    path: '/selectChannel',
    name: 'selectChannel',
    meta: {
      title: '选择通道',
      bgBlue: true
    },
    component: () => import('../views/collection/selectChannel.vue')
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta: {
      title: '提现',
      withdraw: true,
      bgBlue: true
    },
    component: () => import('../views/my/withdraw.vue')
  },
  {
    path: '/withdrawRecord',
    name: 'withdrawRecord',
    meta: {
      title: '提现记录',
      bgBlue: true
    },
    component: () => import('../views/my/withdrawRecord.vue')
  },
  {
    path: '/select',
    name: 'select',
    meta: {
      title: '快捷收款',
      bgBlue: true,
      select: true,
    },
    component: () => import('../views/collection/select.vue')
  },
  {
    path: '/aisle',
    name: 'aisle',
    meta: {
      title: '制定计划',
      bgBlue: true,
      keepAlive: true
    },
    component: () => import('../views/collection/aisle.vue')
  },
  {
    path: '/moreAisle',
    name: 'moreAisle',
    meta: {
      title: '制定计划',
      bgBlue: true,
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
    path: '/JYKAisle',
    name: 'JYKAisle',
    meta: {
      title: '制定计划',
      bgBlue: true,
      keepAlive: true
    },
    component: () => import('../views/repayment/JYKAisle.vue')
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
      title: '选择卡片',
      bgBlue: true,
      select: true
    },
    component: () => import('../views/real/selectcard.vue')
  },
  {
    path: '/commerce',
    name: 'commerce',
    meta: {
      title: '商学院',
      bgBlue: true
    },
    component: () => import('../views/Information/commerce.vue')
  },
  {
    path: '/cool',
    name: 'cool',
    meta: {
      title: '酷友圈',
      bgBlue: true
    },
    component: () => import('../views/Information/cool.vue')
  },
  {
    path: '/lookImg',
    name: 'lookImg',
    meta: {
      title: '查看图片',
      left: true
    },
    component: () => import('../views/Information/lookImg.vue')
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
    path: '/repayment',
    name: 'repayment',
    meta: {
      title: '智能代还',
      left: true
    },
    component: () => import('../views/repayment.vue')
  },
  {
    path: '/useCoupon',
    name: 'useCoupon',
    meta: {
      title: '优惠券',
      left: true
    },
    component: () => import('../views/useCoupon.vue')
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
    path: '/emptyrepayment',
    name: 'emptyrepayment',
    meta: {
      title: '空卡还款',
      left: true
    },
    component: () => import('../views/emptyrepayment.vue')
  },
  {
    path: '/make',
    name: 'make',
    meta: {
      title: '制定计划',
      left: true,
      keepAlive: true
    },
    component: () => import('../views/plan/make.vue')
  },
  {
    path: '/fast',
    name: 'fast',
    meta: {
      title: '制定计划',
      left: true
    },
    component: () => import('../views/plan/fast.vue')
  },
  {
    path: '/realname',
    name: 'realname',
    meta: {
      title: '企业还款',
      left: true
    },
    component: () => import('../views/real/realname.vue')
  },
  {
    path: '/qyhkIntroduction',
    name: 'qyhkIntroduction',
    meta: {
      title: '企业还款',
      left: true
    },
    component: () => import('../views/real/qyhkIntroduction.vue')
  },
  {
    path: '/agent',
    name: 'agent',
    meta: {
      title: '中介卡包',
      left: true
    },
    component: () => import('../views/real/agent.vue')
  },
  {
    path: '/open',
    name: 'open',
    meta: {
      title: '申请开通企业还款',
      left: true
    },
    component: () => import('../views/real/open.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    meta: {
      title: '提交计划',
      bgBlue: true
    },
    component: () => import('../views/plan/submit.vue')
  },
  {
    path: '/exhaustive',
    name: 'exhaustive',
    meta: {
      title: '查看计划',
      bgBlue: true
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
      title: '银行卡详情',
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
    path: '/adduser',
    name: 'adduser',
    meta: {
      title: '添加用户',
      left: true
    },
    component: () => import('../views/real/adduser.vue')
  },
  {
    path: '/adduserreal',
    name: 'adduserreal',
    meta: {
      title: '添加客户',
      left: true
    },
    component: () => import('../views/real/adduserreal.vue')
  },
  {
    path: '/makeplan',
    name: 'makeplan',
    meta: {
      title: '制定计划',
      left: true
    },
    component: () => import('../views/real/makeplan.vue')
  },
  {
    path: '/checkplan',
    name: 'checkplan',
    meta: {
      title: '查看计划',
      left: true
    },
    component: () => import('../views/real/checkplan.vue')
  },
  {
    path: '/lookPlan',
    name: 'lookPlan',
    meta: {
      title: '查看计划',
      left: true
    },
    component: () => import('../views/real/lookPlan.vue')
  },
  {
    path: '/addposition',
    name: 'addposition',
    meta: {
      title: '增加卡位',
      addposition: true
    },
    component: () => import('../views/real/addposition.vue')
  },
  {
    path: '/tiedcard',
    name: 'tiedcard',
    meta: {
      title: '通道绑卡',
      bgBlue: true
    },
    component: () => import('../views/plan/tiedcard.vue')
  },
  {
    path: '/code',
    name: 'code',
    meta: {
      title: '扫码支付',
      left: true
    },
    component: () => import('../views/member/code.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    meta: {
      title: '预览计划',
      bgBlue: true,
      preview: true,
    },
    component: () => import('../views/plan/preview.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      title: '公告',
      bgBlue: true
    },
    component: () => import('../views/Information/message.vue'),
    children: [
      {
        path: '/messageInfo',
        name: 'messageInfo',
        meta: {
          title: '公告详情',
          bgBlue: true
        },
        component: () => import('../views/Information/messageInfo.vue')
      },
    ]
  },
  {
    path: '/news',
    name: 'news',
    meta: {
      title: '资讯列表',
      noLeft: true,
      navShow: true
    },
    component: () => import('../views/Information/news.vue')
  },
  {
    path: '/realcard',
    name: 'realcard',
    meta: {
      title: '实名认证',
      bgBlue: true
    },
    component: () => import('../views/real/realcard.vue')
  },
  {
    path: '/allwith',
    name: 'allwith',
    meta: {
      title: '累计收益',
      left: true
    },
    component: () => import('../views/my/allwith.vue')
  },
  {
    path: '/strcont',
    name: 'strcont',
    meta: {
      title: '我的直推',
      left: true
    },
    component: () => import('../views/my/strcont.vue')
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
    path: '/systemnotice',
    name: 'systemnotice',
    meta: {
      title: '详情',
      left: true
    },
    component: () => import('../views/Information/systemnotice.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    meta: {
      title: '消息通知',
      left: true
    },
    component: () => import('../views/Information/notice.vue')
  },
  {
    path: '/imgcode',
    name: 'imgcode',
    meta: {
      title: '邀请',
      left: true
    },
    component: () => import('../views/share/imgcode.vue')
  },
  {
    path: '/info',
    name: 'info',
    meta: {
      title: '更改资料',
      left: true
    },
    component: () => import('../views/Information/info.vue')
  },
  {
    path: '/changepaw',
    name: 'changepaw',
    meta: {
      title: '修改密码',
      bgBlue: true
    },
    component: () => import('../views/changepaw.vue')
  },
  {
    path: '/editPhone',
    name: 'editPhone',
    meta: {
      title: '修改手机号',
      bgBlue: true
    },
    component: () => import('../views/my/editPhone.vue')
  },
  {
    path: '/credence',
    name: 'credence',
    meta: {
      title: '大数据查询',
      left: true,
      credence: true
    },
    component: () => import('../views/measure/credence.vue')
  },
  {
    path: '/credit',
    name: 'credit',
    meta: {
      title: '卡测评',
      bgBlue: true,
      credit: true
    },
    component: () => import('../views/measure/credit.vue')
  },
  {
    path: '/creditlist',
    name: 'creditlist',
    meta: {
      title: '查询记录',
      bgBlue: true
    },
    component: () => import('../views/measure/creditlist.vue')
  },
  {
    path: '/imgIframe',
    name: 'imgIframe',
    meta: {
      title: '',
      bgBlue: true
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
  {
    path: '/credenlist',
    name: 'credenlist',
    meta: {
      title: '查询记录',
      left: true
    },
    component: () => import('../views/measure/credenlist.vue')
  },
  {
    path: '/onlineshop',
    name: 'onlineshop',
    meta: {
      title: '雲领商城',
      bgBlue: true
    },
    component: () => import('../views/shop/onlineshop.vue')
  },
  {
    path: '/myorder',
    name: 'myorder',
    meta: {
      title: '我的订单',
      bgBlue: true,
    },
    component: () => import('../views/shop/myorder.vue')
  },
  {
    path: '/mydetail',
    name: 'mydetail',
    meta: {
      title: '我的地址',
      bgBlue: true,
    },
    component: () => import('../views/shop/mydetail.vue')
  },
  {
    path: '/editadress',
    name: 'editadress',
    meta: {
      title: '修改地址',
      bgBlue: true,
    },
    component: () => import('../views/shop/editadress.vue')
  },
  {
    path: '/shen',
    name: 'shen',
    meta: {
      title: '选择省',
      bgBlue: true,
    },
    component: () => import('../views/shop/shen.vue')
  },
  {
    path: '/shi',
    name: 'shi',
    meta: {
      title: '选择市',
      bgBlue: true,
    },
    component: () => import('../views/shop/shi.vue')
  },
  {
    path: '/qu',
    name: 'qu',
    meta: {
      title: '选择地区',
      bgBlue: true,
    },
    component: () => import('../views/shop/qu.vue')
  },
  {
    path: '/addadress',
    name: 'addadress',
    meta: {
      title: '新建地址',
      bgBlue: true,
    },
    component: () => import('../views/shop/addadress.vue')
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    meta: {
      title: '订单详情',
      bgBlue: true,
    },
    component: () => import('../views/shop/orderdetail.vue')
  },
  {
    path: '/paydetail',
    name: 'paydetail',
    meta: {
      title: '付款详情',
      bgBlue: true,
    },
    component: () => import('../views/shop/paydetail.vue')
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    meta: {
      title: '商品详情',
      bgBlue: true,
    },
    component: () => import('../views/shop/shopdetail.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '订单填写',
      bgBlue: true,
    },
    component: () => import('../views/shop/order.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
