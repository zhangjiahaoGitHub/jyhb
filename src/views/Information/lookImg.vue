<template>
  <div class='hundred' style="box-sizing: border-box;background:#000;">
    <swiper :options="swiperOption" ref="mySwper">
        <swiper-slide style="padding:1.4rem;box-sizing:border-box;" v-for='(item, index) in imgArr' :key='index'>
          <img style="width:100%" :src="item" alt="">
        </swiper-slide>
      </swiper>
  </div>
</template>
<script>
export default {
  data () {
    return {
     imgArr: [],
     swiperOption: {
        slidesPerView: '1',
        spaceBetween: 0,//slide之间的距离（单位px）。
        centeredSlides: true,//设定为true时，活动块会居中，而不是默认状态下的居左。
        loop : true,//复制多份循环(这里就是让轮播看起来是循环的，去掉这个就恢复了默认的swiper轮播)
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        on: {
          slideChangeTransitionEnd: function() {
            // document.querySelector('#qrcodeImg').src=document.querySelector('.swiper-slide-active img').src
          }
        }
      },
    }
  },
  created () {
    this.imgArr = this.$route.query.imgArr.split(',')
    console.log(this.imgArr);
    
  },
  mounted () {
  },
  methods: {
    
  }
}
</script>
