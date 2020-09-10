<template>
  <div class="systemnotice-systemnotice">
    <div class="notice-box">
      <div class="title">
        <p>{{item.title}}</p>
      </div>
      <p class="time gary">{{Number(this.notice) === 1 ? $moment(item.createTime.time).format('MM-DD HH:mm:ss') : $moment(item.updateDate.time).format('MM-DD HH:mm:ss')}}</p>
      <div class="notic-content gary">
        {{item.content}}
      </div>
    </div>
  </div>
</template>
<script>
import copy from 'copy-to-clipboard'
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      noticecon: '',
      itemList: '',
      msgindex: Number,
      item: {},
      time: '',
      notice: 0
    }
  },
  created () {
    this.more()
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo // 获取商户号
    this.item = JSON.parse(this.$route.query.item)
    console.log()
    this.notice = this.$route.query.notice
    if (Number(this.notice) === 1) {
      this.read()
    } else {
      this.write()
    }
  },
  methods: {
    more () {
      window.scrollTo(0, 0) // 回到顶部
    },
    write () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190103',
        '21': vm.item.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    read () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690028',
        '21': vm.item.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
