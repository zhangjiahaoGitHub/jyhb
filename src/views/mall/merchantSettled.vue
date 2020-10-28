<template>
  <div class='hundred merchantSettled-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <!-- <i @click="syb" class="el-icon-arrow-left"></i>
    <div class="headDiv">
      <img :src="require(`../../assets/real/step${step}.png`)" alt="">
    </div>
    <div v-show="step==1" class="contentOne">
      <div class="pzDiv">
        <div>
          <el-upload
              class='upload-demo'
              action='#'
              ref='upload'
              :show-file-list='false'
              :multiple='true'
              accept='image/*'
              :on-change='handleChange'
              :on-exceed='handleChangeMax'
              :http-request='none'
              :file-list='fileList'
              :auto-upload='true'
              :limit='5'
              list-type='picture-card'>
              <img :src="url?url:require('../../assets/real/sfztxm.png')" class='iDcard'/>
          </el-upload>
          <p>身份证头像面</p>
        </div>
        <div>
          <el-upload
              class='upload-demo'
              action='#'
              ref='upload'
              :show-file-list='false'
              :multiple='true'
              accept='image/*'
              :on-change='handleTwo'
              :on-exceed='handleChangeMax'
              :http-request='none'
              :file-list='fileTwo'
              :auto-upload='true'
              :limit='5'
              list-type='picture-card'>
              <img :src="urlTwo?urlTwo:require('../../assets/real/sfzghm.png')" class='iDcard'/>
          </el-upload>
          <p>身份证国徽面</p>
        </div>
      </div>
      <ul>
        <li>
          <span>姓名：</span>
          <input type='text'  v-model='name' placeholder='请输入姓名' />
        </li>
        <li>
          <span>身份证：</span>
          <input type='text'  v-model='idCard' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" placeholder='请输入身份证号' />
        </li>
        <li>
          <span>请选择注册地区：</span>
          <el-cascader placeholder="请选择地区" size="mini" v-model="address" :options="addressList" :props="props"></el-cascader>
        </li>
      </ul>
      <p>您的身份信息将被加密处理，请放心拍摄</p>
      <div @click="sfzpz" class="btnDiv">下一步</div>
    </div>
    <div v-show="step==2" class="contentTwo">
      <div class="pzDiv">
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleFour'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileFour'
            :auto-upload='true'
            :limit='5'
            list-type='picture-card'>
            <img :src="urlFour?urlFour:require('../../assets/real/cxkzm.png')" class='iDcard'/>
        </el-upload>
        <p>储蓄卡正面</p>
      </div>
      <ul>
        <li>
          <span>储蓄卡号：</span>
          <input type='text' v-model='card' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" placeholder='请输入您的储蓄卡号' />
        </li>
        <li>
          <span>银行信息：</span>
          <input type="text" readonly v-model="cardhead.shortCnName" placeholder="输入卡号自动识别">
        </li>
        <li>
          <span>预留电话：</span>
          <input type='text'  v-model='phone' placeholder='请输入手机号码' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" />
        </li>
      </ul>
      <p>您的身份信息将被加密处理，请放心拍摄</p>
      <div @click="jsktx" class="btnDiv">下一步</div>
    </div>
    <div v-show="step==3" class="contentThree">
      <div class="pzDiv">
        <el-upload
            class='upload-demo'
            action='#'
            ref='upload'
            :show-file-list='false'
            :multiple='true'
            accept='image/*'
            :on-change='handleThree'
            :on-exceed='handleChangeMax'
            :http-request='none'
            :file-list='fileThree'
            :auto-upload='true'
            :limit='5'
            list-type='picture-card'>
            <img :src="urlThree?urlThree:require('../../assets/real/scsfz.png')" class='iDcard'/>
        </el-upload>
        <p>手持身份证拍照(点击图片拍照)</p>
      </div>
      <div class="tipDiv">
        <span>温馨提示：</span>
        <p>1.免冠，露出五官并清晰可见</p>
        <p>2.请露出手臂</p>
        <p>3.照片请勿作任何修饰或软件处理</p>
        <p>4.身份证全部信息需清晰无遮挡，否则无法通过认证</p>
      </div>
      <div @click="submit" class="btnDiv">提交</div>
    </div>
    <div class='bottomLong'></div> -->
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    let vm = this
    return {
      address: '',
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
      step: 1,
      addressList: [],
      fileList: [],
      fileTwo: [],
      fileFour: [],
      fileThree: [],
      imgUrlBase64: {},
      url: '',
      urlTwo: '',
      urlFour: '',
      urlThree: '',
      idCard: '',
      name: '',
      cardhead: {},
      card: '',
      phone:'',
      fullscreenLoading: false,
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.phone = JSON.parse(this.$stact.state.token)[0].phone
    this.getAddress(0)
  },
  watch: {
    card (n, o) {
      if (this.card.length >= 13 && this.card.length <= 19) {
        this.cardName()
      }
    }
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    submit () {
      let vm = this
      if (this.fileThree.length < 1) {
        this.$message({
          message: '请上传手持身份证照',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let parmas = {
        '0': '0700',
        '1': vm.phone,
        '2': JSON.parse(this.$stact.state.token)[0].id,
        '3': '190938',
        '5': vm.name,
        '6': vm.idCard,
        '7': vm.card,
        '8': vm.address[0],
        '9': vm.address[1],
        '10': vm.address[2],
        '43': vm.cardhead.bankCode,
        '59': vm.version
      }
      vm.fullscreenLoading = true
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$message({
              message: '实名成功,需要一定时间审核。请您耐心等待',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            vm.$stact.dispatch('SetReal', 'realSb')
            setTimeout(() => {
              vm.fullscreenLoading = false
              vm.$router.push({ name: 'my' })
            }, 3500)
          } else {
            vm.fullscreenLoading = false
            vm.$message({
              message: res.data[39],
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    cardName () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '690013',
        '15': vm.card,
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.cardhead = JSON.parse(res.data[16])
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    syb(){
      if (this.step>1) {
        this.step--
      }else{
        this.$router.back()
      }
    },
    jsktx(){
      let vm = this
      if (this.fileFour.length < 1) {
        this.$message({
          message: '请上传储蓄卡正面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.card.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入储蓄卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (!this.cardhead.bankCode) {
        this.$message({
          message: '请输入正确储蓄卡号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.phone.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入预留电话',
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
      this.step++
    },
    sfzpz(){
      let vm = this
      if (this.fileList.length < 1) {
        this.$message({
          message: '请上传身份证头像面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileTwo.length < 1) {
        this.$message({
          message: '请上传身份证国徽面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入姓名',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.idCard.match(/^[ ]*$/)) {
        this.$message({
          message: '请输入身份证号',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regIdNo.test(vm.idCard)) {
        this.$message({
          message: '您的身份证号填写有误',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.address.length < 3) {
        this.$message({
          message: '请选择地区',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      this.step++
    },
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
    async handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList
        this.url = fileList[fileList.length - 1].url
        await this.chageBase('10E', fileList[fileList.length - 1])
      }
      return false
    },
    async handleTwo (file, fileList) {
      if (fileList.length > 0) {
        this.fileTwo = fileList
        this.urlTwo = fileList[fileList.length - 1].url
        await this.chageBase('10F', fileList[fileList.length - 1])
      }
      return false
    },
    async handleFour (file, fileList) {
      if (fileList.length > 0) {
        this.fileFour = fileList
        this.urlFour = fileList[fileList.length - 1].url
        await this.chageBase('10K', fileList[fileList.length - 1])
      }
      return false
    },
    async handleThree (file, fileList) {
      if (fileList.length > 0) {
        this.fileThree = fileList
        this.urlThree = fileList[fileList.length - 1].url
        await this.chageBase('10M', fileList[fileList.length - 1])
      }
      return false
    },
    async handleChangeMax (file, fileList) {
      vm.$message({
        message: '上传图片次数过多，请勿重复',
        center: true,
        offset: 30,
        duration: 2500,
        type: 'success'
      })
    },
    none () {
      console.log(1)
    },
    compressImg(width, height, img) {
        var canvas = document.createElement('canvas'), c = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        c.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width, height);
        return canvas.toDataURL('image/png');
    },
    chageBase (type, fileList) {
      let vm = this
      let file = fileList.raw
      // 将文件以Data URL形式读入页面
      let reader = new FileReader()
      this.imgUrlBase64 = reader.readAsDataURL(file)
      reader.onload = function () {
        var img = new Image();
        img.src = reader.result;
        img.onload = function () {
          var w = this.width,
          h = this.height,
          scale = w / h;
          //压缩图片
          var b64 = vm.compressImg(300, 300 / scale, img);
          b64 = b64.split(',')[1]
          let parmas = {
            '0': '0700',
            '3': '190948',
            '9': type,
            '40': b64,
            '42': vm.merchantNo,
            '59': vm.version
          }
          parmas = vm.$mdata.mdGet(parmas)
          vm.fullscreenLoading = true
          const root = process.env.NODE_ENV === 'production' ? 'http://jyhbban.llyzf.cn/lly-posp-proxy/' : '/apis'
          vm.$http.post(`/uploadImage.app`, parmas)
            .then(res => {
              vm.fullscreenLoading = false
              this.fileList = []
              if (res.data[39] === '00') {
                vm.$message({
                  message: '上传成功',
                  center: true,
                  offset: 30,
                  duration: 2500,
                  type: 'success'
                })
              } else {
                vm.$message({
                  message: res.data[39],
                  center: true,
                  offset: 30,
                  duration: 2500,
                  type: 'success'
                })
              }
            })
            .catch(err => {
              console.log(err)
              vm.fullscreenLoading = false
            })
        }
      }
    },
  }
}
</script>
