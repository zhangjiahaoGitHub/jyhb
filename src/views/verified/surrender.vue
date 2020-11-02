<template>
  <div class='hundred'>
    <div @click="$router.push({name:'userManagement'})" class='surrender'>
        <img src='../../assets/realname.png' />
    </div>
    <div @click="$router.push({name: 'friendsManagement'})" class='surrender'>
        <img src='../../assets/makeplan.png' />
    </div>
    <div @click="$router.push({name: 'makingPlans'})" class='surrender'>
        <img src='../../assets/management.png' />
    </div>
    <div @click="$router.push({name: 'viewPlan'})" class='surrender'>
        <img src='../../assets/viewplan.png' />
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
