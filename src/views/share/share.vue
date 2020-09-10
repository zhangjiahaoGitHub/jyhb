<template>
  <div>
    <div class='sharePadd'>
      <div class='share'>
        <p class='shareTitle'>
          推广服务
        </p>
        <p>
          自用省钱，推广赚钱
        </p>
        <div class='allFlex'>
            <router-link :to="{name: 'reg'}" tag='div' class='half textCenter'>
                <img src='../../assets/share/reg.png'  class='imageTwo' />
                <p>面对面注册</p>
            </router-link>
            <router-link :to="{name: 'shareimg'}" tag='div' class='half textCenter'>
                <img src='../../assets/share/code.png'  class='imageTwo' />
                <p>分享二维码</p>
            </router-link>
            <router-link :to="{name: 'upgrade'}" tag='div' class='half textCenter'>
                <img src='../../assets/share/upgrade.png'  class='imageTwo' />
                <p>我要升级</p>
            </router-link>
            <router-link :to="{name: 'cool'}" tag='div' class='half textCenter'>
                <img src='../../assets/share/copywriting.png'  class='imageTwo' />
                <p>朋友圈文案</p>
            </router-link>
        </div>
      </div>
    </div>
    <div class='homeTutorial noMarp'>
        <div>
          <div class='tutorialImg'>
              <img src='../../assets/share/banner.png'>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
