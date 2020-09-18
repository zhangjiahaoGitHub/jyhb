<template>
    <div class='hundred teamItem-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
      <div class="head">
        <p @click="searchList(1)" :class="activeName==1 ? 'aP':''">已实名</p>
        <p @click="searchList(2)" :class="activeName==2 ? 'aP':''">未实名</p>
      </div>
      <div class="search">
        <div>
          <i class="el-icon-search"></i>
          <input type="number" v-model="phone" placeholder="请输入手机号">
        </div>
        <p @click="searchList()">搜索</p>
      </div>
      <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        infinite-scroll-distance='20'>
        <div v-if="level<10">
          <li v-for="item in listArr" :key="item.linkPhone">
            <p>{{item.merchantCnName}}</p>
            <div>
              <img :src="item.status==1 ? require('../../assets/my/myTeam/l10.png'):require('../../assets/my/myTeam/l11.png')" alt="">
              <span>{{item.status==1 ? '直推会员':'间推会员'}}</span>
              <p class="phoneP">{{item.status==1 ? `${item.linkPhone}`:`${item.linkPhone.substring(0,3)}****${item.linkPhone.substring(item.linkPhone.length-4,item.linkPhone.length)}`}}</p>
              <div>
                <img v-if="item.status==1" @click="call(item.linkPhone)" src="../../assets/my/myTeam/phone.png" alt="">
              </div>
              <p class="timeP">{{item.createTime}}</p>
            </div>
          </li>
        </div>
        <div v-else>
          <li v-for="item in listArr" :key="item.linkPhone">
            <p>{{item.merchantCnName}}</p>
            <div>
              <img :src="require(`../../assets/my/myTeam/l${item.level}.png`)" alt="">
              <span>{{levelObj[item.level]}}</span>
              <p class="phoneP">{{level==10 ? `${item.linkPhone}`:`${item.linkPhone.substring(0,3)}****${item.linkPhone.substring(item.linkPhone.length-4,item.linkPhone.length)}`}}</p>
              <div>
                <img v-if="level==10" @click="call(item.linkPhone)" src="../../assets/my/myTeam/phone.png" alt="">
              </div>
              <p class="timeP">{{item.createTime}}</p>
            </div>
          </li>
        </div>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul>
    </div>
</template>
<script>

export default {
  data () {
    return {
      level: '',
      type: '',
      phone: '',
      activeName: '1',
      count: 20,
      loading: false,
      fullscreenLoading: false,
      listArr: [],
      pageCount: 1,
      levelObj: {
        '1': '普通用户',
        '2': '经纪人',
        '3': '服务商',
        '4': '运营商',
        '5': '合伙人',
        '6': '达标队长',
        '7': '一星团队长',
        '8': '二星团队长',
        '9': '三星团队长',
      },
    }
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.level = this.$route.query.level
  },
  methods: {
    call(phone){
      window.location.href = `tel://${phone}`
    },
    searchList (type) {
      if (type) {
        this.activeName = type
      }
      this.count = 20
      this.pageCount = 1
      this.listArr = []
      this.load()
    },
    load () {
      this.loading = true
      this.list()
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190115',
        '42': vm.merchantNo,
        '43': vm.pageCount,
        '44': vm.level,
        '45': vm.activeName,
        '46': vm.phone,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          this.loading=false
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            vm.count = JSON.parse(res.data[57]).length
            let getList = JSON.parse(res.data[57])
            getList.forEach(item => {
              item.createTime = item.createTime.substring(0,10)
              this.listArr.push(item)
            });
            console.log(this.listArr);
            
            this.pageCount++
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    }
  }
}
</script>
