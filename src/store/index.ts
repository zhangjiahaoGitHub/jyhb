import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCheck: true,
    show: true,
    version: 'JYHB-W-1.0.0', // 版本号
    agentNo: '1800001', // 代理机构号
    active: 0,
    token: [],
    password: '',
    imgArray: [],
    level: {
      1: '普通用户',
      2: '黄金会员',
      3: '铂金会员',
      4: '白金会员',
      5: '黄金联营',
      6: '铂金联营',
      7: '白金联营'
    },
    upgrade: {
      1: '升级银卡',
      2: '升级金卡'
    },
    moneyLimit: {},
    openId: '',
    phone: false,
    real: '',
    cardMoney: 0,
    teamMoney: {},
    allSb: {},
    planItem: [],
    // 一卡多还
    cardOne:{},
    cardTwo:{},
    cardThree:{},
    planOne:{},
    planTwo:{},
    planThree:{},
    finaArr: '',
  },
  mutations: {
    // 一卡多还
    setCardOne (state, cardOne) {
      state.cardOne = cardOne
    },
    setCardTwo (state, cardTwo) {
      state.cardTwo = cardTwo
    },
    setCardThree (state, cardThree) {
      state.cardThree = cardThree
    },
    setPlanOne (state, planOne) {
      state.planOne = planOne
    },
    setPlanTwo (state, planTwo) {
      state.planTwo = planTwo
    },
    setPlanThree (state, planThree) {
      state.planThree = planThree
    },
    setFinaArr (state, finaArr) {
      state.finaArr = finaArr
    },
    SET_USERCHECK (state, code) {
      state.userCheck = code
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_IMG (state, imgArray) {
      state.imgArray = imgArray
    },
    Change_Password (state, code) {
      state.password = code
    },
    Change_Limit (state, code) {
      state.moneyLimit = code
    },
    SET_OPENID (state, code) {
      state.openId = code
    },
    IS_PHONE (state, code) {
      state.phone = code
    },
    SET_REAL (state, code) {
      state.real = code
    },
    SET_CARDM (state, code) {
      state.cardMoney = code
    },
    SET_TEAMM (state, code) {
      state.teamMoney = code
    },
    SET_SB (state, code) {
      state.allSb = code
    },
    SET_PLAN (state, code) {
      state.planItem = code
    }
  },
  actions: {
    SetUserCheck ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_USERCHECK', code)
      })
    },
    SetToken ({ // 存token
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', code)
      })
    },
    SetReal ({ // 存token
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_REAL', code)
      })
    },
    SetPassword ({ // 存密码
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('Change_Password', code)
      })
    },
    setMoney ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('Change_Limit', code)
      })
    },
    setOpenid ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_OPENID', code)
      })
    },
    setPhone ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('IS_PHONE', code)
      })
    },
    setCardm ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CARDM', code)
      })
    },
    setTeamm ({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_TEAMM', code)
      })
    }
  },
  plugins: [createPersistedState({
    storage: window.localStorage
  })]

})
