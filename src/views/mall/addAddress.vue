<template>
  <div class='hundred addAddress-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <ul>
      <li>
        <span>收货人</span>
        <input v-model="name" type="text" name="" placeholder="请输入收货人姓名" id="">
      </li>
      <li>
        <span>联系电话</span>
        <input v-model="phone" type="number" placeholder="请输入联系电话" name="" id="">
      </li>
      <li style="padding:0.16rem 0.4rem;align-items: center;">
        <span>省市区</span>
        <el-cascader placeholder="请选择省市区" size="mini" v-model="address" :options="addressList" :props="props"></el-cascader>
      </li>
      <li>
        <span>详细地址</span>
        <el-input
          type="textarea"
          :rows="5"
          size="mini"
          placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"
          v-model="textarea">
        </el-input>
      </li>
    </ul>
    <el-checkbox v-model="checked">设为默认地址</el-checkbox>
    <div @click="type=='edit'?edit():save()" class="btnDiv">保存地址</div>
  </div>
</template>
<script>
export default {
  data () {
    let vm = this
    return {
      version: '',
      agentNo: '',
      merchantNo: '',
      fullscreenLoading: false,
      type: '',
      textarea: '',
      name: '',
      phone: '',
      checked: false,
      listArr: [],
      address: [],
      addressList: [],
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level,value } = node;
          console.log(node,resolve);
          let parmas = {
            '0': '0700',
            '3': '393004',
            '43': value,
            '59': vm.version
          }
          let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
          vm.$http.get(`request.app${url}`)
            .then(res => {
              if (res.data[39] === '00') {
                let dataList = JSON.parse(res.data[57])
                console.log(dataList);
                const nodes = dataList
                .map(item => ({
                  value: item.id,
                  label: item.divisionName,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getAddress(0)
  },
  mounted () {
    this.type = this.$route.query.type
    if (this.type) {
      let item = JSON.parse(this.$route.query.item)
      console.log(item);
      this.name = item.name
      this.phone = item.phone
      document.querySelector('.el-cascader input').value = item.address.split(' ')[0]
      this.textarea = item.address.split(' ')[1]
      if (item.status==1) {
        this.checked = true
      }else{
        this.checked = false
      }
    }
    
  },
  methods: {
    // 获取省市区f
    getAddress (id) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '393004',
        '43': id,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            let dataList = JSON.parse(res.data[57])
            console.log(dataList);
            if (id == 0) {
              dataList.map((x, i) => {
                vm.addressList.push({
                  value: x.id,
                  label: x.divisionName,
                  children: []
                })
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    edit () {
      let vm = this
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入收货人姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入联系电话',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!document.querySelector('.el-cascader input').value) {
        this.$message({
          message: '请选择省市区',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.textarea.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入详细地址',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let allAddress = (document.querySelector('.el-cascader input').value).replace(new RegExp(' / ','gi'),'-')+' '+(this.textarea).replace(/\s/g,"")
      let defaultAddress = 0
      if (this.checked) {
        defaultAddress = 1
      }
      let parmas = {
        '0': '0700',
        '3': '590016',
        '8': this.name,
        '9': JSON.parse(this.$stact.state.token)[0].id,
        '10': this.phone,
        '11': allAddress,
        '12': defaultAddress,
        '13': JSON.parse(this.$route.query.item).id,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$message({
              message: '修改成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.$router.back()
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
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    save () {
      let vm = this
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入收货人姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入联系电话',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!(/^1[1-9]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号码有误，请重填',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.address.length<3) {
        this.$message({
          message: '请选择省市区',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.textarea.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入详细地址',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let allAddress = (document.querySelector('.el-cascader input').value).replace(new RegExp(' / ','gi'),'-')+' '+(this.textarea).replace(/\s/g,"")
      let defaultAddress = 0
      if (this.checked) {
        defaultAddress = 1
      }
      let parmas = {
        '0': '0700',
        '3': '590011',
        '8': this.name,
        '9': JSON.parse(this.$stact.state.token)[0].id,
        '10': this.phone,
        '11': allAddress,
        '12': defaultAddress,
        '59': vm.version
      }
      this.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.$message({
              message: '添加成功',
              center: true,
              offset: 30,
              duration: 2000,
              type: 'success'
            })
            this.$router.back()
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
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
  }
}
</script>
