<template>
  <div id="app">
    <el-container style="min-height: 100vh;">
      <el-header>
        <div class="topBar">
          <div class="logo">
            <img src="./assets/logo.png" alt="图片不见" @click="isCollapse = !isCollapse" style="display:inline-block;margin-top:10px;">
          </div>
          <span class="theme-title">纵和金融后台系统</span>
          <span class="right-title">{{user}}-{{role}}<span class="icon" @click="showPopBox = true"><icon name="unlock-alt"></icon></span><span class="icon" @click="loginOut"><icon name="power-off"></icon></span></span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <div class="slideBar">
            <el-menu :default-active="$route.path" background-color="#3b404f" text-color="#fff" router class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
              <el-submenu index="/user">
                <template slot="title">
                  <icon name="address-book" style="margin-right:10px;color:gray;"></icon>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user">用户列表</el-menu-item>
                  <el-menu-item index="/staff">员工列表</el-menu-item>
                  <!-- <el-menu-item index="/role">角色列表</el-menu-item> -->
                  <el-submenu index="/role">
                    <template slot="title">
                      <span slot="title">角色列表</span>
                    </template>
                     <el-menu-item-group>
                        <el-menu-item index="/role">角色列表</el-menu-item>
                        <el-menu-item index="/addRole">新增角色</el-menu-item>
                     </el-menu-item-group>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/borrower">
                <template slot="title">
                  <icon name="credit-card" style="margin-right:10px;color:gray;"></icon>
                  <span slot="title">借贷管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/borrower">借款人列表</el-menu-item>
                  <el-submenu index="/bidTable">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span slot="title">标的</span>
                    </template>
                     <el-menu-item-group>
                        <el-menu-item index="/bidTable">标的列表</el-menu-item>
                        <el-menu-item index="2-2-1">详情页</el-menu-item>
                        <el-menu-item index="2-2-2">标的预览</el-menu-item>
                        <el-menu-item index="2-2-3">审核页</el-menu-item>
                     </el-menu-item-group>
                  </el-submenu>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/capitalFlow">
                <template slot="title">
                  <icon name="calculator" style="margin-right:10px;color:gray;"></icon>
                  <span slot="title">财务管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/capitalFlow">资金流水</el-menu-item>
                  <el-menu-item index="/investmentRecord">投资记录</el-menu-item>
                  <el-menu-item index="/offlineRecharge">线下充值列表</el-menu-item>
                  <el-menu-item index="/onlineRecharge">在线充值列表</el-menu-item>
                  <el-menu-item index="/withdrawCash">提现列表</el-menu-item>
                  <el-menu-item index="/repayment">还款列表</el-menu-item>
                  <el-menu-item index="/gathering">收款列表</el-menu-item>
                  <el-menu-item index="/userAssets">用户资产</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="/content">
                <template slot="title">
                  <icon name="briefcase" style="margin-right:10px;color:gray;"></icon>
                  <span slot="title">内容管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/content">内容列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
               <el-menu-item index="/book">
                <icon name="book" style="margin-right:10px;color:gray;"></icon>
                <span slot="title">名词解释</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <!-- <el-tabs v-model="openRouter" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in openRouter" :key="item.name" :label="item.title" :name="item.name">
              <router-view class="body"></router-view>
            </el-tab-pane>
          </el-tabs> -->
          <router-view class="body"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div class="popBox" v-if="showPopBox">
      <div class="box-body">
        <p style="text-align:center;">修改密码</p>
        <el-input placeholder="请输入验证码" v-model="vcode">
          <el-button slot="append" @click="getVcode">获取验证码</el-button>
        </el-input>
        <el-input
          placeholder="请输入新密码"
          v-model="newPassword"
          clearable>
        </el-input>
        <el-input
          placeholder="请再次输入新密码"
          v-model="newPassword1"
          clearable>
        </el-input>
        <div style="text-align:center;">
          <el-button @click="showPopBox = false">取消</el-button>
          <el-button type="success">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isCollapse: false,
      showPopBox: false,
      vcode: '',
      newPassword: '',
      newPassword1: '',
      user: 'keven',
      role: '运营',
      activeName: '/user',
      openRouter:[
        {
          title: '用户列表',
          name: '/user'
        }
      ]
    }
  },
  mounted () {
    // this.$router.push('/');
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getVcode () {
      this.$axios.post('/test/test/testToken.php', {
        phone: '',
        type: '1'
      }).then(data => {
        console.log(data)
      })
    },
    loginOut () {
      window.location.href="/";
      localStorage.removeItem('cat')
    },
    removeTab(targetName){
      let tabs = this.openRouter;
      let activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      
      this.activeName = activeName;
      this.openRouter = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  position: relative;
}
div{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: white;
}
/* .slideBar{
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #3b404f;
  color: white;
  padding-top: 60px;
} */
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.topBar{
  width: 100%;
  height: 60px;
  background: #3b404f;
  color: white;
  /* display: flex; */
  line-height: 60px;
}
.logo{
  background-color: #ec5b55;
  height: 60px;
  width: 200px;
  text-align: center;
  cursor: pointer;
  float: left;
}
.theme-title{
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 1rem;
  float: left;
  letter-spacing: 0.2rem;
}
.right-title{
  float: right;
  margin-right: 2rem;
}
.icon{
  margin-left: 1rem;
  cursor: pointer;
}
.popBox{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(80, 80, 80, .5);
  z-index: 1000;
}
.box-body{
  background-color: white;
  border-radius: 10px;
  width: 500px;
  min-height: 200px;
  padding: 2rem;
  /* height: 500px; */
  margin: auto;
  margin-top: 10%;
  position: relative;
}
.box-body .el-input{
  margin-bottom: 1rem;
}
.el-aside{
  background-color: #3b404f;
}
.el-header{
  padding: 0;
}
.searchTerm .el-input{
  width: 150px;
  margin-right: 20px;
}
.searchTerm .el-select{
  width: 150px;
  margin-right: 20px;
}
.popTitle{
  display: inline-block;
  width: 100px;
}
.redMoney{
      color: red;
      margin-right: 20px;
  }
</style>
