<template>
  <div class="hundred yh-shen">
    <div v-for="(item,index) in shilist" :key="index" @click="toqu(item.value,item.lable)" class="shenpage">
      {{item.value}}
    </div>
  </div>
</template>

<script>
import arealist from '../../store/area'
export default {
  data () {
    return {
      arealist,
      shen: '',
      shenid: '',
      shilist:[],
      page: ''
    }
  },
  created () {
    this.shenid = this.$route.query.shenid
    this.shen = this.$route.query.shen
    this.page = this.$route.query.page
    this.shenid = this.shenid.substring(0,2)
    for (let i in arealist.city_list) {
      if (i.substring(0,2) == this.shenid) {
        this.shilist.push({
          value: this.arealist.city_list[i],
          lable: i
        })
      }
    }
  },
  methods: {
    toqu(item,index) {
      this.$router.replace({name: 'qu',query: {page:this.page,shen: this.shen,shi: item,shiid: index}})
    },
  }
}
</script>
