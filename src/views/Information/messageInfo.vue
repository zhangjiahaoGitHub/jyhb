<template>
  <div class='messageInfo-layout'>
    <div>
      <img src="../../assets/lb.png" alt="">
      <p>{{item.title}}</p>
      <div>{{item.content}}</div>
      <p>{{item.effectiveFromTimeStr}}</p>
    </div>
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
    console.log(this.item);
    // this.item.formatTime = this.$moment(this.item.effectiveFromTime.time).format('MM-DD HH:mm')
    // this.item.content = this.item.content.replace(/\r\n/g,'<br/>')
  },
  methods: {
    
  }
}
</script>
