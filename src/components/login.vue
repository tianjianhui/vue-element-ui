<template>
  <div class="login">
      <div class="bar"><img/><span style="font-size:1.2rem;font-weight:bold;">纵和金融</span><br>后台管理系统</div>
      <div class="loginBox">
          <span style="font-size:1.2rem;font-weight:bold;">登录</span>
        <el-input
            placeholder="请输入手机号"
            suffix-icon="el-icon-user"
            v-model="phoneNum"
            clearable>
        </el-input>
        <el-input
            type="password"
            placeholder="请输入密码"
            suffix-icon="el-icon-lock"
            v-model="password"
            v-on:keyup.enter.native="submit"
            clearable>
        </el-input>
        <div style="height:50px;margin-top:20px;"><span style="float:right;cursor:pointer;" v-on:click="giveBack">忘记密码?</span></div>
        <el-button style="width:100px;" type="primary" v-on:click="submit"><router-link to='/user'>登录</router-link></el-button>
      </div>
  </div>
</template>
<style scoped>
    div{
        box-sizing: border-box;
    }
    .login{
        height: 100vh;
        width: 100vw;
        background-image: url(../assets/login.jpg);
        background-size: 100% 100%;
        position: relative;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
    }
    .bar{
        height: 60px;
        background-color: lightskyblue;
        padding: 10px 20px;
    }
    .loginBox{
        position: absolute;
        width: 400px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 1rem;
        background: white;
        border: 2px solid black;
        border-radius: 10px;
    }
    .el-input{
        margin-top: 20px;
    }
</style>
<script>
export default {
  data () {
    return {
      phoneNum: '',
      password: ''
    }
  },
  created () {
    this.$axios.post('/test/test/testToken.php', {phoneNum: this.phoneNum, password: this.password}).then(data => {
      console.log(data)
    })
  },
  methods: {
    submit () {
      this.$axios.post('/test/test/testToken.php', {phoneNum: this.phoneNum, password: this.password}).then(data => {
        console.log(data)
      });
      localStorage.setItem('cat','Tommy');
      console.log(localStorage.getItem('cat'));
    },
    giveBack () {
      this.$message({
        message: '重置密码请联系后台管理员',
        type: 'warning'
      })
    }
  }
}
</script>
