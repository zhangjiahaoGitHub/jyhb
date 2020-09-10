<template>
  <div class='hundred message-layout'>
    <ul>
      <li @click="toMessageInfo(item)" v-for="item in newsList" :key="item.id">
        <div class="firstDiv">
          <em v-if="item.hasRead=='0'"></em>
          <span class="firstSpan">{{item.title}}</span> <span>{{item.effectiveFromTimeStr}}</span>
        </div>
        <p>{{item.content}}</p>
        <div class="lookDiv">
          <span>查看详情</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import copy from 'copy-to-clipboard'

export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      newsList: [],
      newsObj: {},
      dialogVisible: false,
      fullscreenLoading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.text()
  },
  mounted () {
  },
  methods: {
    toMessageInfo(item){
      this.$router.push({
        name: 'messageInfo',
        query: {
          item: JSON.stringify(item)
        }
      })
      if (item.hasRead==0) {
        this.read(item.id)
      }
    },
    read(id){
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190103',
        '21': id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.text()
          } else {
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    text () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190103',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            if (res.data[60]) {
              this.newsList = JSON.parse(res.data[60])
              console.log(this.newsList);
              
            }
          } else {
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
