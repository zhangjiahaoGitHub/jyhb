<template>
  <div class="hundred yh-shen">
    <div v-for="(item,index) in qulist" :key="index" @click="setadress(item.value,item.lable)" class="shenpage">
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
      shi: '',
      quid: '',
      qulist:[],
      page: ''
    }
  },
  created () {
    this.shen = this.$route.query.shen
    this.shi = this.$route.query.shi
    this.shiid = this.$route.query.shiid
    this.page = this.$route.query.page
    this.shiid = this.shiid.substring(0,4)
    for (let i in arealist.county_list) {
      if (i.substring(0,4) == this.shiid) {
        this.qulist.push({
          value: this.arealist.county_list[i],
          lable: i
        })
      }
    }
  },
  methods: {
    setadress(item,index) {

      sessionStorage.setItem('shenming',this.shen)
      sessionStorage.setItem('shiming',this.shi)
      sessionStorage.setItem('quming',item)
      if (this.page == 'edit') {
        this.$router.replace({name: 'editadress'})
      }else{
        this.$router.replace({name: 'addadress'})
      }
      
    },
  }
}
</script>
