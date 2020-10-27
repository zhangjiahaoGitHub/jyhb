<template>
  <div class='hundred myAddress-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li v-for="item in listArr" :key="item.id">
        <p><span>{{item.name}}</span>{{item.phone}}<span v-if="item.status==1" class="aspan">默认</span></p>
        <p>{{item.address}}</p>
        <div>
          <i @click="edit(item)" class="el-icon-edit-outline">编辑</i>
          <i @click="del(item)" class="el-icon-delete">删除</i>
        </div>
      </li>
    </ul>
    <div @click="$router.push({name: 'addAddress'})" class="btnDiv"><i class="el-icon-plus"></i>新建地址</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fullscreenLoading: false,
      listArr: [],
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.list()
  },
  methods: {
    del(item){
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let vm = this
        let parmas = {
          '0': '0700',
          '3': '590018',
          '9': item.id,
          '10': JSON.parse(this.$stact.state.token)[0].id,
          '59': vm.version
        }
        this.fullscreenLoading = true
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.$http.get(`request.app${url}`)
          .then(res => {
            vm.fullscreenLoading = false
            if (res.data[39] === '00') {
              vm.$message({
                message: '删除成功',
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
              this.list()
            }else{
              vm.$message({
                message: res.data[39],
                center: true,
                offset: 30,
                duration: 2000,
                type: 'success'
              })
            }
          })
          .catch(err => {
            this.fullscreenLoading = false
            console.log(err)
          })
      }).catch(() => {
      });
    },
    edit(item){
      this.$router.push({
        name: 'addAddress',
        query: {
          item: JSON.stringify(item),
          type: 'edit'
        }
      })
    },
    list () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '590012',
        '9': JSON.parse(this.$stact.state.token)[0].id,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            this.$set(this,'listArr',JSON.parse(res.data[40]))
            console.log(this.listArr);
          }else{
            this.$set(this,'listArr',[])
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>
