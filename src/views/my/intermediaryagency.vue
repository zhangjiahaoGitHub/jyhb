<template>
  <div class="hundred intermediaryagency-layout">
      <img :src="imgUrl" alt="" srcset="">
      <!-- <div class="intermediarybox">
        <router-link tag="div" :to="{ name:'realname' }" class="imgbox">
            <img src="../../assets/realname.png" alt="">
        </router-link>
        <router-link tag="div" :to="{ name:'makeplan' }" class="imgbox">
            <img src="../../assets/makeplan.png" alt="">
        </router-link>
        <router-link tag="div" :to="{ name:'cardadmin', query: { type: '1' } }" class="imgbox">
            <img src="../../assets/management.png" alt="">
        </router-link>
        <router-link tag="div" :to="{ name:'checkplan' }" class="imgbox">
            <img src="../../assets/viewplan.png" alt="">
        </router-link>
      </div> -->
  </div>
</template>
<script>

export default {
  data () {
    return {
      agentNo: '',
      version: '',
      merchantNo: '',
      imgUrl: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getData()
  },
  methods: {
    getData () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '390006',
        '42': vm.merchantNo,
        '43': '10T',
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
              console.log(res.data);
              this.imgUrl = JSON.parse(res.data[57])[0]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
