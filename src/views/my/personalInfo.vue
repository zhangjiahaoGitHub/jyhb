<template>
  <div class='hundred personalInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="bgDiv"></div>
    <div class="content">
      <div class="infoDiv">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action='#'
          :before-upload="beforeAvatarUpload"
          :http-request='none'
          :on-change='handleChange'
          :on-exceed='handleChangeMax'>
          <img :src="imageUrl ? imageUrl : require('../../assets/head.png')" class="avatar">
        </el-upload>
        <div>
          <p>{{nc}} <img :src="require(`../../assets/my/level${dqdj}.png`)" alt=""></p>
          <span v-if="idCardNumber">身份证号：{{idCardNumber.substring(0,6)}}********{{idCardNumber.substring(idCardNumber.length-4,idCardNumber.length)}}</span>
          <span>手机号：{{phone.substring(0,3)}}****{{phone.substring(phone.length-4,phone.length)}}</span>
        </div>
      </div>
      <p>会员档案</p>
      <ul>
        <li>
          <p><img src="../../assets/my/set_sm.png" alt="">实名认证</p>
          <span>{{freezeStatus}}</span>
        </li>
        <li>
          <p><img src="../../assets/my/set_time.png" alt="">注册时间</p>
          <span>{{createTime}}</span>
        </li>
        <li>
          <p><img src="../../assets/my/set_bk.png" alt="">绑定信用卡</p>
          <span>{{xykCount}}张</span>
        </li>
        <li>
          <p><img src="../../assets/my/set_wk.png" alt="">本月无卡总交易</p>
          <span>{{wk}}元</span>
        </li>
        <li>
          <p><img src="../../assets/my/set_zh.png" alt="">本月智还总交易</p>
          <span>{{zh}}元</span>
        </li>
        <li>
          <p><img src="../../assets/my/set_tj.png" alt="">推荐人</p>
          <span>{{tjr}}</span>
        </li>
        <li @click="callService(tjrPhone)">
          <p><img src="../../assets/my/set_sj.png" alt="">推荐人手机号</p>
          <span>{{tjrPhone.substring(0,3)}}****{{tjrPhone.substring(tjrPhone.length-4,tjrPhone.length)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      nc: '',
      phone: '',
      createTime: '',
      dqdj: '1',
      xykCount: 0,
      idCardNumber: '',
      freezeStatus: '',
      fullscreenLoading: false,
      wk: 0,
      zh: 0,
      tjr: '',
      tjrPhone: '',
      levelObj: {
        '1': '普通用户',
        '2': '经济人',
        '3': '城市服务商',
        '4': '城市运营商',
        '5': '高级合伙人',
        '6': '达标团队长',
        '7': '一星团队长',
        '8': '二星团队长',
        '9': '三星团队长',
      },
      smmj:{
        '10A':'未实名',
        '10B':'已实名',
        '10C':'认证拒绝',
        '10D':'请重新实名',
        '10E':'实名未通过',
        '10F':'审核中',
      },
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.getInfo()
  },
  methods: {
    beforeAvatarUpload(file) {
      
    },
    notYetOpen () {
      this.$router.push({name:'shopAddress', query: {my: true} })
    },
    async handleChange (file, fileList) {
      console.log(fileList)
      if (fileList.length > 0) {
        this.fullscreenLoading = true
        this.fileList = fileList
        console.log(fileList[fileList.length - 1])
        await this.chageBase(fileList[fileList.length - 1])
      }
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
    chageBase (fileList) {
      let vm = this
      let file = fileList.raw
      // 将文件以Data URL形式读入页面
      let reader = new FileReader()
      this.imgUrlBase64 = reader.readAsDataURL(file)
      reader.onload = function () {
        // let url = reader.result.split(',')[1]
        var img = new Image();
        img.src = reader.result;
        img.onload = function () {
          var w = this.width,
          h = this.height,
          scale = w / h;
          //压缩图片
          var b64 = vm.compressImg(100, 100 / scale, img);
          let b64Img = b64.split(',')[1]
          let parmas = {
            '0': '0700',
            '3': '190949',
            // '9': '10P',
            '40': b64Img,
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
                vm.imageUrl = res.data[57]
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
    getInfo () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190122',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.wk = res.data[35]
            this.zh = res.data[36]
            this.tjr = res.data[31]
            this.tjrPhone = res.data[32]
            this.createTime = res.data[47]
            this.freezeStatus = res.data[46]
            this.idCardNumber = res.data[38]
            this.phone = res.data[50]
            this.nc = res.data[49]
            this.imageUrl = res.data[48]
            this.xykCount = res.data[37]
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    callService(phone){
      const h = this.$createElement;
      this.$msgbox({
          // title: '提示',
          message: h('p', null, [
            h('p', { style: 'text-align: center' },'拨打电话'),
            h('p', { style: 'text-align: center' }, phone)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'callPhone',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              window.location.href= 'tel:'+localStorage.phone
            } else {
              done();
            }
          }
        }).then(action => {
          
        });
    },
  }
}
</script>
