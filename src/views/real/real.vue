<template>
  <div>
    <div class='verifiedImage'>
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
            <img :src="url?url:require('../../assets/real/positive.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        点击上传 <span class='blueColor'>人像面</span>
    </div>
    <div class='verifiedImage'>
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
            <img :src="urlTwo?urlTwo:require('../../assets/real/negative.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        点击上传 <span class='blueColor'>国徽面</span>
    </div>
    <div class='verifiedImage'>
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
            <img :src="urlThree?urlThree:require('../../assets/real/card.png')" class='iDcard'/>
        </el-upload>
    </div>
    <div class='verifiedName'>
        点击上传 <span class='blueColor'>手持身份证照</span>
    </div>
    <div class='realTitle'>请核对您的身份信息</div>
    <div class='verifiedContent'>
        <div class='allFlex setInput'>
            <div class='setName'>身份证</div>
            <input class='setEntryLong' type='text'  v-model='card' oninput="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" onafterpaste="this.value=this.value.replace(/[\u4e00-\u9fa5]/ig,'')" placeholder='请输入您的身份证号码' />
        </div>
        <div class='allFlex setInput'>
            <div class='setName'>姓名</div>
            <input class='setEntryLong' type='text'  v-model='name' placeholder='请输入您的身份证名字' />
        </div>
        <!-- <div class='allFlex setInput selectAddress'>
            <div class='setName'>地区</div>
            <el-cascader v-model="address" :options="addressList" :props="props"></el-cascader>
        </div> -->
    </div>
    <div class='transferConfirm' @click='uploadImg()' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock='fullscreenLoading'>
        下一步
    </div>
    <div class='bottomLong'></div>
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
            '3': '999999',
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
      addressList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      fileTwo: [],
      fileThree: [],
      imgUrlBase64: {},
      url: '',
      urlTwo: '',
      urlThree: '',
      card: '',
      name: '',
      fullscreenLoading: false,
      phone: '',
      merchantId: '',
      token: '',
      tokenId: ''
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getAddress(0)
  },
  mounted () {
    this.$inputLen.inputJs()
  },
  methods: {
    // 获取省市区f
    getAddress (id) {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '999999',
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
    real () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190937',
        '21': vm.merchantNo,
        '22': vm.tokenId,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
          }
        })
        .catch(err => {
          console.log(err)
        })
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
          var b64 = vm.compressImg(300, 210 / scale, img);
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
    uploadImg () {
      let vm = this
      if (this.fileList.length < 1) {
        this.$message({
          message: '必须上传一张身份证人像面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileTwo.length < 1) {
        this.$message({
          message: '必须上传一张身份证国徽面',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.fileThree.length < 1) {
        this.$message({
          message: '必须上传一张手持身份证照',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.card.match(/^[ ]*$/)) {
        this.$message({
          message: '您的身份证号必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regIdNo.test(vm.card)) {
        this.$message({
          message: '您的身份证号填写有误',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      if (this.name.match(/^[ ]*$/)) {
        this.$message({
          message: '您的姓名必须填写',
          center: true,
          offset: 30,
          duration: 2000,
          type: 'warning'
        })
        return
      }
      // if (this.address.length < 3) {
      //   this.$message({
      //     message: '请选择地区',
      //     center: true,
      //     offset: 30,
      //     duration: 2000,
      //     type: 'warning'
      //   })
      //   return
      // }
      vm.$router.push({ name: 'realcard', query: { card: vm.card, name: vm.name,address: JSON.stringify(vm.address) } })
    }
  }
}
</script>
