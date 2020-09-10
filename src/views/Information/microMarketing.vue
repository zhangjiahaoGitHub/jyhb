<template>
  <div class='hundred microMarketing-layout'>
    <ul>
      <li @click="()=>{this.$router.push({name:'commerce'})}">
        <img src="http://120.79.26.219/image/business.png" alt="">
        <p>商学院</p>
      </li>
      <li @click="toIframe(item.url,item.name)" v-for="item in afterImg" :key="item.id">
        <img :src="item.pictureUrl" alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  data () {
    return {
      afterImg:[]
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
  },
  mounted () {
  },
  methods: {
    toIframe (url,name) {
      this.$router.push({ name: 'ifarme', query: { url: url, title: name } })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190940',
        '42': this.merchantNo,
        '48': '3',
        '59': this.$stact.state.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.afterImg = JSON.parse(res.data[38])
            console.log(this.afterImg);
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
</script>
