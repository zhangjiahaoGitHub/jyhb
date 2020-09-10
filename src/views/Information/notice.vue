<template>
  <div class='hundred'>
    <ul class='allFlex textCenter blue whiteColor'>
      <li class='half'>
          <router-link :to="{name: 'message'}" tag='span' class='contPadd buleBottom'>公告</router-link>
      </li>
      <li class='half'>
          <router-link :to="{name: 'notice'}" tag='span' class='contPadd'>消息</router-link>
      </li>
    </ul>
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' infinite-scroll-delay='1000' style="overflow:auto">
      <li class='homeTutorial messAll nolr' v-for='(item, index) in itemList' :key='index' @click="tosystemnotice(JSON.stringify(item))">
        <div class='allFlex justifyBetween borderBottom lr pt'>
          <div>{{item.title}}</div>
          <div :class="Number(item.hasRead)=== 0 ? 'redColor' : 'gary'">{{Number(item.hasRead)=== 0 ? '未读' : '已读'}}</div>
        </div>
        <div class='gary aisleJust messPadding lr'>
          {{item.content}}
        </div>
        <div class='gary textRight paddTop lr'>
          誠方印 {{$moment(item.createTime.time).format('YYYY-MM-DD HH:mm:ss')}}
        </div>
      </li>
      <li v-if="loading" style='padding: 0.2rem 0;text-align: center'>加载中...</li>
      <li v-if="noMore && !loading" class='gary' style='padding: 0.5rem 0;text-align: center'>没有更多了</li>
    </ul>
    <div class='bottomLong'></div>
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
      page: 0,
      count: 10,
      itemList: [],
      loading: false
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
  },
  mounted () {
  },
  computed: {
    noMore () {
      return this.count < 10
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    tosystemnotice (item) {
      this.$router.push({ name: 'systemnotice', query: { item: item, notice: 1 } })
    },
    load () {
      let vm = this
      vm.loading = true
      setTimeout(async () => {
        vm.loading = false
        if (vm.count >= 10) {
          vm.page++
          await vm.list()
        }
      }, 1000)
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690027',
        '42': vm.merchantNo,
        '43': vm.page,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.itemList = vm.itemList.concat(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
