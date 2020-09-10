<template>
  <div class="hundred yh-shen">
    <div v-for="(item,index) in arealist.province_list" :key="index" @click="toshi(item,index)" class="shenpage">
      {{item}}
    </div>
  </div>
</template>

<script>
import arealist from '../../store/area'
export default {
  data () {
    return {
      arealist,
      optionsshen:[],
      page: ''
    }
  },
  created () {
    this.page = this.$route.query.page
  },
  methods: {
    toshi(item,index) {
      this.$router.replace({name: 'shi',query: {page:this.page,shen: item,shenid: index}})
    },
  }
}
</script>
