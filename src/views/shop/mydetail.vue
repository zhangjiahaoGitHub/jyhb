<template>
  <div class="hundred yh-mydetail">
    <div class="adress-box" v-for="(item,index) in adresslist" :key="index" @click="chooseadr(index)">
      <div class="name">{{item.name}} {{item.phone}} <span v-show="item.status == 1">默认</span> </div>
      <div class="adress-diqu">{{item.address}}</div>
      <div class="caozuo">
        <div @click.stop="delItem(item.id)"><i class="el-icon-delete"></i>删除</div>
        <div @click.stop="toedit(item)"><i class="el-icon-edit-outline"></i>编辑</div>
      </div>
    </div>
    <router-link tag="div" :to="{name: 'addadress'}" class="addadress">
      + 新建地址
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: '',
      merchantNo: '',
      parentphone: '',
      id: '',
      adresslist:[],
      choose: Boolean
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
    this.id = JSON.parse(this.$stact.state.token)[0].id
    this.choose = this.$route.query.chooseadress
    sessionStorage.clear()
    this.message()
  },
  mounted () {
  },
  methods: {
    toedit(item) {
      this.$router.push({name:'editadress',query: {item: JSON.stringify(item)}})
    },
    chooseadr (index) {
      if (this.choose) {
        sessionStorage.setItem('choooseindex',index)
        this.$router.go(-1)
      }else {
        return
      }
    },
    delItem(id){
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deladress(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    deladress(id) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590018',
        '9': id,
        '10': vm.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            this.message()
            this.$message({
              message: '删除成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590012',
        '9': vm.id,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.adresslist = JSON.parse(res.data[40])
          }else {
            vm.adresslist = []
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
