<template>
  <div class='messageInfo-layout'>
    <p>{{item.title}}</p>
    <span>{{item.formatTime}}</span>
    <div v-html="item.content"></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.item = JSON.parse(this.$route.query.item)
    this.item.formatTime = this.$moment(this.item.effectiveFromTime.time).format('MM-DD HH:mm')
    this.item.content = this.item.content.replace(/\r\n/g,'<br/>')
  },
  methods: {
    
  }
}
</script>
