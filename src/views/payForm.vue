<template>
    <div class="hundred payForm-layout">
      
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: ''
    }
  },
  mounted () {
    this.form = this.$route.query.form
    document.querySelector('body').innerHTML = this.form;
    const div = document.createElement('div') // 创建div
    div.innerHTML = this.form // 将返回的form 放入div
    document.body.appendChild(div)
    document.forms[0].submit()

  }
}
</script>
