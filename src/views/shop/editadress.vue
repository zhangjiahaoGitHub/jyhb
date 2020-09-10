<template>
  <div class="hundred yh-addadress">
    <div class="add-box">
      <div class="inp-row">
        <span>收货人</span>
        <input type="text" v-model="name" placeholder="请输入收货人姓名" oninput="this.value=this.value.replace(/\s+/g,'')">
      </div>
      <div class="inp-row">
        <span>联系电话</span>
        <input type="text" v-model="phone" placeholder="请输入联系电话" @input='IsMoney'>
      </div>
      <div class="inp-row" @click="toshen">
        <span>省市区</span>
        <input type="text" class="ssq" v-model="city" readonly placeholder="请选择省市区">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="inp-row-adress">
        <span>详细地址</span>
        <textarea class="texarea" v-model="area" rows="" cols="" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"></textarea>
      </div>
    </div>
    <div class="flagmoren" @click="setmoren">
      <span :class="flagadress ? 'select':'selected'">
        <i class="el-icon-check"></i>
      </span>
      设为默认地址
    </div>
    <div class="btn-color" @click="message">保存地址</div>
  </div>
</template>

<script>
import arealist from '../../store/area'
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      flagadress: true,
      name: '',
      phone: '',
      cityshen: '',
      cityshi: '',
      cityqu: '',
      area: '',
      moren: '0',
      item: '',
      shen: '',
      shi: '',
      qu: '',
      city: '',
      arealist,
      optionsshen: [],
      optionsshi: [],
      optionsqu: [],
      value: '',
      lableshen: '',
      lablesshi: '',
      id:'',
      cityarea: ''
    }
  },
  components: {
  },
  watch: {
  },
  beforeCreate () {
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.parentphone = JSON.parse(this.$stact.state.token)[0].parentPhone
    this.merchantid = JSON.parse(this.$stact.state.token)[0].id
    if (sessionStorage.getItem('shenming')) {
      let newadress = JSON.parse(sessionStorage.getItem('adressmes'))
      this.name = newadress.name
      this.phone = newadress.phone
      this.id= newadress.id
      this.shen = sessionStorage.getItem('shenming')
      this.shi = sessionStorage.getItem('shiming')
      this.qu = sessionStorage.getItem('quming')
      this.city = this.shen+'-'+this.shi+'-'+this.qu
      this.area = newadress.area
    }else {
      this.item = JSON.parse(this.$route.query.item)
      console.log(this.item);
      this.name = this.item.name
      this.phone = this.item.phone
      this.id = this.item.id
      this.cityarea = this.item.address
      let index = this.cityarea.lastIndexOf(' ',this.cityarea.length)
      this.city = this.cityarea.substring(0,index+1,this.cityarea.length)   
      this.area = this.cityarea.substring(index+1,)   
      let adressmes = {
        name: this.name,
        phone: this.phone,
        area: this.area,
        id: this.item.id
      }
      sessionStorage.setItem('adressmes',JSON.stringify(adressmes))
    }
    let aaa= this.cityarea.lastIndexOf(' ',this.city.length)
    console.log(aaa);

    
    
    // for(let i in this.arealist.province_list) {
    //   this.optionsshen.push({
    //     value: this.arealist.province_list[i],
    //     lable: i
    //   })
    // }
    
  },
  mounted () {
  },
  methods: {
    toshen() {
      if (this.name == '') {
        this.$message({
          message: '请填写收货人姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone == '') {
        this.$message({
          message: '请填写联系电话',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      this.$router.push({name: 'shen',query:{page: 'edit'}})
    },
    IsMoney () { // 限制
      let vm = this
      vm.phone = vm.phone.replace(/[^\d]/g, '')
      if (vm.phone.length > 11 ) {
        vm.phone = vm.phone.substring(0,11)
      }
      console.log(1212);
    },
    setmoren() {
      this.flagadress = !this.flagadress
      if (this.flagadress) {
        this.moren = '0'
      }else {
        this.moren = '1'
      }
    },
    message () {
      let vm = this
      if (vm.name == '') {
        this.$message({
          message: '请填写收货人姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (vm.phone == '') {
        this.$message({
          message: '请填写联系电话',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (vm.phone.length != 11) {
        this.$message({
          message: '请输入正确的手机号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // if (vm.cityshen == '') {
      //   this.$message({
      //     message: '请选择省',
      //     center: true,
      //     offset: 30,
      //     duration: 2000,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (vm.cityshi == '') {
      //   this.$message({
      //     message: '请选择市',
      //     center: true,
      //     offset: 30,
      //     duration: 2000,
      //     type: 'warning'
      //   })
      //   return
      // }
      // if (vm.cityqu == '') {
      //   this.$message({
      //     message: '请选择区',
      //     center: true,
      //     offset: 30,
      //     duration: 2000,
      //     type: 'warning'
      //   })
      //   return
      // }
      if (vm.city == '') {
        this.$message({
          message: '请选择省市区',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (vm.area == '') {
        this.$message({
          message: '请填写详细地址',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // vm.city = vm.cityshen + vm.cityshi + vm.cityqu
      let parmas = {
        '0': '0700',
        '3': '590016',
        '8': vm.name,
        '9': vm.merchantid,
        '10': vm.phone,
        '11': vm.city+' '+vm.area,
        '12': vm.moren,
        '13': vm.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.$message({
              message: '修改成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.$router.replace({name: 'mydetail',query:{chooseadress: true}})
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
