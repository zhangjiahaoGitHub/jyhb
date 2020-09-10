<template>
  <div>
    <ul v-infinite-scroll='load' infinite-scroll-disabled='disabled' infinite-scroll-delay='1000' style="overflow:auto">
      <li class='allFlex newpadd justifyBetween' @click="problem(item.shareUrl, item.title)" v-for='(item, index) in itemList' :key='index'>
        <div class='allFlex'>
          <p class='whiteColor' :class="index < 4 ? 'orangeFf' : 'wgaryColor'">{{index < 4 ? `TOP${index+1}`: `00${index+1}`}}</p>
          <div class='paddLeft'>
            <p class='elip fontPadd'>{{item.title}}</p>
            <p class='gary'>{{$moment().diff($moment(item.createTime.time), 'day')}}天前</p>
          </div>
        </div>
        <img :src='item.imageUrl' class='imageUrl'/>
      </li>
    </ul>
    <div class='bottomLong' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'></div>
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
      fullscreenLoading: false
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
    problem (url, title) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: title } })
    },
    load () {
      let vm = this
      vm.loading = true
      vm.fullscreenLoading = true
      setTimeout(async () => {
        vm.loading = false
        vm.fullscreenLoading = false
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
        '3': '390008',
        '10': vm.page,
        '11': 10,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.itemList = vm.itemList.concat(JSON.parse(res.data[57]))
            vm.count = JSON.parse(res.data[57]).length
            console.log(vm.itemList)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
