<template>
    <div class='hundred personalInfo-layout' element-loading-background="rgba(0, 0, 0, 0.7)" v-loading.fullscreen.lock="fullscreenLoading">
        <ul>
          <li>
            <span>头像</span>
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
          </li>
          <li @click="()=>{this.$router.push({name:'editName'})}">
            <span>昵称</span>
            <p>
              {{nc}}
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li>
            <span>绑定手机号</span>
            <p>
              {{phone}}
            </p>
          </li>
          <!-- <li>
            <span>系统编号</span>
            <p>
              1508412051084804110A
            </p>
          </li> -->
          <li>
            <span>注册时间</span>
            <p>
              {{createTime}}
            </p>
          </li>
          <li>
            <span>当前等级</span>
            <p>
              {{levelArr[dqdj]}}
            </p>
          </li>
          <li>
            <span>当前身份</span>
            <p>
              {{levelArr[dqdj]}}
            </p>
          </li>
          <li>
            <span>实名状态</span>
            <p>
              {{smmj[freezeStatus]}}
            </p>
          </li>
        </ul>
        <ol>
          <li>
            <span>费率</span>
            <div>
              <p>快捷：{{fl.wkInfo}}</p>
              <p>智还：{{fl.ykInfo}}</p>
              <p>空卡：{{fl.qykInfo}}</p>
            </div>
          </li>
          <li @click="notYetOpen">
            <span>我的收获地址</span>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ol>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      imageUrl: '',
      nc: '',
      phone: '',
      createTime: '',
      dqdj: '',
      dqsf: '',
      fl: '',
      freezeStatus: '',
      fullscreenLoading: false,
      levelArr:{
        '1':'普通用户',
        '2':'VIP1',
        '3':'VIP2',
        '4':'VIP3',
        '5':'VIP4',
        '6':'VIP5',
      },
      smmj:{
        '10A':'未实名',
        '10B':'已实名',
        '10C':'认证拒绝',
        '10D':'请重新实名',
        '10E':'实名未通过'
      },
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.agentNo = this.$stact.state.agentNo
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    this.message()
    this.getFl()
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
        this.url = fileList[fileList.length - 1].url
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
    chageBase (fileList) {
      let vm = this
      let file = fileList.raw
      console.log(file)
      // 将文件以Data URL形式读入页面
      let reader = new FileReader()
      this.imgUrlBase64 = reader.readAsDataURL(file)
      reader.onload = function () {
        let parmas = {
          '0': '0700',
          '3': '190949',
          '40': url,
          '43': JSON.parse(vm.$stact.state.token)[0].id,
          '59': vm.version
        }
        let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
        vm.fullscreenLoading = true
        var param = new FormData()
        param.append('10', file)
        const root = process.env.NODE_ENV === 'production' ? 'http://yunlingshenghuo.llyzf.cn:6442/lly-posp-proxy/' : '/apis'
        axios.post(root + `/uploadImage.app${url}`, param)
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
              vm.imageUrl=res.data[57]
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
    },
    getFl () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '520128',
        '21': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            console.log(res.data);
            this.fl = JSON.parse(res.data[51])
          }
        })
        .catch(err => {
          vm.fullscreenLoading = false
          console.log(err)
        })
    },
    message () {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.fullscreenLoading = true
      vm.$http.get(`request.app${url}`)
        .then(res => {
          vm.fullscreenLoading = false
          if (res.data[39] === '00') {
            vm.$stact.dispatch('SetToken', res.data[57]) // 存token
            vm.imageUrl = res.data[48]
            vm.freezeStatus = JSON.parse(this.$stact.state.token)[0].freezeStatus
            vm.nc = JSON.parse(this.$stact.state.token)[0].merchantEnName
            vm.phone = JSON.parse(this.$stact.state.token)[0].phone
            vm.dqdj = JSON.parse(this.$stact.state.token)[0].level
            vm.createTime = this.$moment(JSON.parse(this.$stact.state.token)[0].createTime.time).format('YYYY-MM-DD')
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
