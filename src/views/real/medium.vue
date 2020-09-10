<template>
  <div class="realname hundred">
    <div class='medium'>
       <ul class='allFlex justifyBetween medMarg'>
          <li :class="money === 20 && 'checkMed'" @click='setMoney(10 * moneyCard)'>
            10
          </li>
          <li :class="money === 40 && 'checkMed'" @click='setMoney(20 * moneyCard)'>
            20
          </li>
      </ul>
      <ul class='allFlex justifyBetween'>
          <li :class="money === 100 && 'checkMed'" @click='setMoney(50 * moneyCard)'>
            50
          </li>
          <li :class="money === 200 && 'checkMed'" @click='setMoney(100 * moneyCard)'>
            100
          </li>
      </ul>
      <div class='textCenter medMoney'>￥{{money.toFixed(2)}}元</div>
      <div class='allFlex justifyCenter'>
        <router-link :to="{name: 'pay', query:{money: money, isType: 'S'} }" tag='div' class='immadd'>购买</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      money: 20,
      moneyCard: 0
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.moneyCard = Number(this.$stact.state.teamMoney[23])
  },
  methods: {
    setMoney (money) {
      this.money = money
    }
  }
}
</script>
