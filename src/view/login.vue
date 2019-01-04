<template>
  <div class="all">
    <img src="../static/title.png" alt="" >
    <el-form :model="ruleForm2" :rules="rules2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <el-form-item>
        <el-input type="text" v-model="ruleForm2.userNo" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item> 
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>  
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="login">登录</el-button>
      </el-form-item>   
    </el-form>    
  </div>
</template>
<script type="text/javascript"> 
  import { requestLogin } from '../service/getData';
  import md5  from 'js-md5';
  export default {
    data(){
      return{
        ruleForm2: {
         // "userNo": "80000004@1.com", 
         // "password":"80000004@.com" 
          "userNo": "qihu@1.com", 
          "password":"qihu@.com"           
         //  "userNo": "", 
         // "password":""         
        },
        rules2: {
            "userNo": [
              { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            "password": [
              { required: true, message: '请输入密码', trigger: 'blur' },
            ]
          },      
        checked: true
      }
    },
    methods:{
        login () {
          var _this = this;
          var loginData = {
            "userNo":this.ruleForm2.userNo , 
            "password":md5(this.ruleForm2.password)
          };
          requestLogin(loginData).then(data=>{
            if (data.code=="N01") {
                  sessionStorage.setItem('sessionId',data.contents.sessionId);
                  sessionStorage.setItem('companySid',data.contents.companySid);     
                  this.$router.push({ path: '/companyInfo' });      
            }          
          })           
        }
    }
  }
</script>

<style lang="scss" scoped>
.all{
     width: 100%;
    height: 100vh;
    background-image: url('../static/bg.jpg');
    background-repeat: no-repeat;
    background-size:cover;
    background-position: bottom;
    background-attachment: fixed;
    padding-top: 18vh; 
    text-align: center;
}
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 60px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin-right:80%;
      margin-bottom:20px;
    }
  }
</style>