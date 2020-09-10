<template>
    <div class='hundred imgIframe-layout' style="overflow-x: hidden;">
      <img style="width:100%" :src="url" alt="无图">
    </div>
</template>
<script>

export default {
  data () {
    return {
      url: ''
    }
  },
  created () {
    this.url=this.$route.query.url
  },
  methods: {
    
  }
}
</script>
