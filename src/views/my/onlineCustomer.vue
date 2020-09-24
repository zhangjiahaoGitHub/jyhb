<template>
  <div class='hundred onlineCustomer-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      
    }
  },
  created () {
    
  },
  mounted () {
    (function(a, b, c, d, e, j, s) {
        a[d] = a[d] || function() {
            (a[d].a = a[d].a || []).push(arguments)
        };
        j = b.createElement(c),
            s = b.getElementsByTagName(c)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = 'https://static.meiqia.com/widget/loader.js';
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '_MEIQIA');
    _MEIQIA('entId', 149921);
  },
  beforeDestroy () {
    
  },
  methods: {
    
  }
}
</script>
