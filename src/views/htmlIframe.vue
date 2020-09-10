<template>
    <div class="hundred htmlIframe-layout" v-html="html">
        
    </div>
</template>
<script>
export default {
  data () {
    return {
      html: ''
    }
  },
  mounted () {
    this.html = this.$route.query.html
  }
}
</script>
