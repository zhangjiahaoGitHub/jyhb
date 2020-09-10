<template>
  <div class='hundred server-layout'>
    <div class="contentDiv">
      <el-input type="textarea" :rows="10" class="inp-set" placeholder="非常感谢您的意见，您的反馈信息我们将认真研究" v-model="textarea">
      </el-input>
      <p>上传图片:<span>（最多8张）</span></p>
      <el-upload
        :action='actionsUrl'
        list-type="picture-card"
        name="10"
        :limit='8'
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="successFile"
        class="upload-up">
        <img src="../../assets/my/addphoto.png" alt="">
      </el-upload>
      <p>请选择您的反馈类型</p>
      <ul>
        <li><span @click="type=1" :class="type==1 ? 'aSpan':''">程序bug</span></li>
        <li><span @click="type=2" :class="type==2 ? 'aSpan':''">功能建议</span></li>
        <li><span @click="type=3" :class="type==3 ? 'aSpan':''">内容意见</span></li>
        <li><span @click="type=4" :class="type==4 ? 'aSpan':''">网络问题</span></li>
        <li><span @click="type=5" :class="type==5 ? 'aSpan':''">其他</span></li>
      </ul>
      <input type="text" placeholder="电子邮箱（非必填）" v-model="email">
      <div @click="submit" class="btnDiv"><div>提交</div></div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrlArr" alt="">
    </el-dialog>
  </div>
</template>
<script>

export default {
  data () {
    return {
      textarea: '',
      email: '',
      dialogImageUrl: '',
      dialogVisible: false,
      type: '',
      actionsUrl: '',
      fileList: [],
      imgUrlArr: [],
      codephone: '',
      merchantNo: '',
      version: '',
    }
  },
  created () {
    this.version = this.$stact.state.version
    this.merchantNo = JSON.parse(this.$stact.state.token)[0].merchantNo
    if (process.env.NODE_ENV === 'production') {
      this.actionsUrl=`http://yunlingshenghuo.llyzf.cn:6442/lly-posp-proxy/images.app?0=0700&3=790029&42=${JSON.parse(this.$stact.state.token)[0].merchantNo}&59=${this.$stact.state.version}&64=${this.$md5('0700'+'790029'+JSON.parse(this.$stact.state.token)[0].merchantNo+this.$stact.state.version+'21E4ACD4CD5D4619B063F40C5A454F7D')}`
    }else{
      this.actionsUrl=`/apis/images.app?0=0700&3=790029&42=${JSON.parse(this.$stact.state.token)[0].merchantNo}&59=${this.$stact.state.version}&64=${this.$md5('0700'+'790029'+JSON.parse(this.$stact.state.token)[0].merchantNo+this.$stact.state.version+'21E4ACD4CD5D4619B063F40C5A454F7D')}`
    }
    // this.getcode()
  },
  mounted () {
  },
  methods: {
    getcode() {
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '190112',
        '42': vm.merchantNo,
        '59': vm.version
      }
      let url = vm.$utils.queryParams(vm.$mdata.mdGet(parmas))
      vm.$http.get(`request.app${url}`)
        .then(res => {
          if (res.data[39] === '00') {
            vm.codephone = res.data[6] 
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit(){
      if (this.textarea=='') {
        this.$message({
          message: '请填写反馈意见',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.type=='') {
        this.$message({
          message: '请选择反馈类型',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'warning'
        })
        return
      }
      if (this.email!='') {
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.email)) {
          this.$message({
            message: '邮箱格式错误',
            center: true,
            offset: 30,
            duration: 2500,
            type: 'warning'
          })
          return
        }
      }
      let imageData = []
      this.imgUrlArr.forEach(item => {
        imageData.push("{ imageUrl='"+item+"'}")
      });
      let vm = this
      let parmas = {
        '0': '0700',
        '3': '792007',
        '23': this.textarea,
        '24': this.email,
        '41': this.type,
        '42': JSON.parse(this.$stact.state.token)[0].merchantNo,
        '43': `[${imageData.toString()}]`,
        '59': this.$stact.state.version
      }
      let url = vm.$mdata.mdGet(parmas)
      vm.$http.post(`request.app`,url)
        .then(res => {
          if (res.data[39] === '00') {
            vm.$message({
              message: '提交成功',
              center: true,
              offset: 30,
              duration: 2500,
              type: 'success'
            })
            // this.dialogImageUrl=''
            // this.imgUrlArr=[]
            // this.textarea=''
            // this.email=''
            // this.type=''
            // document.querySelector('.el-upload-list').innerHTML=''
            this.$router.back()
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
        })
    },
    handleRemove(file, fileList) {
      this.imgUrlArr=[]
      fileList.forEach(item => {
        this.imgUrlArr.push(item.response[57])
      });
    },
    handlePictureCardPreview(file) {
      this.imgUrlArr = file.url;
      this.dialogVisible = true;
    },
    successFile(response, file, fileList){
      if (response[39] === '00') {
        this.$message({
          message: '上传成功',
          center: true,
          offset: 30,
          duration: 2500,
          type: 'success'
        })
        this.imgUrlArr.push(response[57])
      }
    }
  }
}
</script>
