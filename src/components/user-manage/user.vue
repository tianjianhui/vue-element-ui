<template>
  <div class="user">
      <div class="searchTerm">
          <div>
            手机号码
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            证件号码
            <el-input size="small" v-model="credentialsNum" clearable></el-input>
            注册渠道
            <el-input size="small" v-model="channel" clearable></el-input>
            注册时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            <el-button size="small" @click="elseTerm = !elseTerm">高级筛选</el-button>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchUser">查询</el-button>
          </div>
          <div style="margin-top:10px;" v-if="elseTerm">
              认证状态
              <el-select size="small" v-model="isAuthentication" clearable placeholder="请选择">
                <el-option v-for="item in authenticationStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              马甲标识
              <el-select size="small" v-model="vestState" clearable placeholder="请选择">
                <el-option v-for="item in vestStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="userName" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="vestState" label="马甲标识" align="center" min-width="50"></el-table-column>
            <el-table-column prop="credentialsNum" label="证件号码" align="center"></el-table-column>
            <el-table-column prop="bank" label="所属银行" align="center"></el-table-column>
            <el-table-column prop="bankId" label="银行卡号" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center" min-width="30"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center" min-width="30"></el-table-column>
            <el-table-column prop="registTime" label="注册时间" align="center"></el-table-column>
            <el-table-column prop="authenticationTime" label="认证时间" align="center"></el-table-column>
            <el-table-column prop="channel" label="注册渠道" align="center"></el-table-column>
            <el-table-column prop="isAuthentication" label="认证状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="50">
              <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchUser"
          @current-change="searchUser"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="popBox" v-if="userPopBox">
        <div class="box-body">
          <div v-if="addUser">
            <p style="text-align:center;">新增用户</p>
            <span class="popTitle">马甲标识: </span>
            <el-select size="small" v-model="vestState1" clearable placeholder="请选择">
              <el-option v-for="item in vestStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select><br>
            <span class="popTitle">用户姓名:</span>
            <el-input size="small" v-model="userName" clearable></el-input><br>
            <span class="popTitle">手机号码:</span>
            <el-input size="small" v-model="phoneNum1" clearable></el-input><br>
            <div v-if="vestState1==0">
              <span class="popTitle">证件号码:</span>
              <el-input size="small" v-model="credentialsNum1" clearable></el-input><br>
              <span class="popTitle">所属银行:</span>
              <el-select v-model="bank" filterable>
                <el-option
                  v-for="item in banks"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select><br>
              <span class="popTitle">银行卡号:</span>
              <el-input size="small" v-model="bankId" clearable></el-input><br>
              <span class="popTitle">性别:</span>
              <el-select size="small" v-model="sex" clearable placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
              </el-select><br>
              <span class="popTitle">年龄:</span>
              <el-input size="small" v-model="age" clearable></el-input><br>
            </div>
            <span class="popTitle">安全验证码:</span>
            <el-input placeholder="请输入验证码" v-model="vcode">
              <el-button slot="append">获取验证码</el-button>
            </el-input><br>
            <div style="text-align:center;">
            <el-button @click="userPopBox = false;addUser = false;">取消</el-button>
            <el-button type="success" @click="addUser">保存</el-button>
            </div>
          </div>
          <div v-if="modifyUser">
            <p style="text-align:center;">修改用户</p>
            <span class="popTitle">用户姓名:</span>
            <span class="el-input">{{ userName }}</span><br>
            <span class="popTitle">手机号码:</span>
            <el-input size="small" v-model="phoneNum1" clearable></el-input><br>
            <span class="popTitle">马甲标识: </span>
            <span class="el-input">{{ vestState1 }}</span><br>
            <span class="popTitle">证件号码:</span>
            <el-input size="small" v-model="credentialsNum1" clearable></el-input><br>
            <span class="popTitle">所属银行:</span>
            <el-select v-model="bank" filterable>
              <el-option
                v-for="item in banks"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select><br>
            <span class="popTitle">银行卡号:</span>
            <el-input size="small" v-model="bankId" clearable></el-input><br>
            <span class="popTitle">性别:</span>
            <span class="el-input">{{ sex }}</span><br>
            <span class="popTitle">年龄:</span>
            <span class="el-input">{{ age }}</span><br>
            <span class="popTitle">注册时间:</span>
            <span class="el-input">{{ time }}</span><br>
            <span class="popTitle">注册渠道:</span>
            <span class="el-input">{{ chanel }}</span><br>
            <span class="popTitle">安全验证码:</span>
            <el-input placeholder="请输入验证码" v-model="vcode">
              <el-button slot="append">获取验证码</el-button>
            </el-input><br>
            <div style="text-align:center;">
            <el-button @click="userPopBox = false;modifyUser = false;">取消</el-button>
            <el-button type="success" @click="modifyUser">保存</el-button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      authenticationStates: [{
          value: '1',
          label: '已认证'
        }, {
          value: '2',
          label: '未认证'
      }],
      vestStates: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
      }],
      phoneNum: '',
      credentialsNum: '',
      channel: '',
      beginTime: '',
      endTime: '',
      isAuthentication: '',
      vestState: '',
      pageNum: 1,
      pageSize: 10,
      total: 100,
      elseTerm: false,
      userPopBox: false,
      vestState1: '',
      userName: '',
      phoneNum1: '',
      credentialsNum1: '',
      bank: '',
      bankId: '',
      sex: '',
      age: '',
      vcode: '',
      addUser: false,
      modifyUser: false,
      banks: [
        {
          value: '中国工商银行',
          label: '中国工商银行'
        },
        {
          value: '中国农业银行',
          label: '中国农业银行'
        },
        {
          value: '中国银行',
          label: '中国银行'
        },
        {
          value: '中国建设银行',
          label: '中国建设银行'
        },
        {
          value: '中信银行',
          label: '中信银行'
        },
        {
          value: '兴业银行',
          label: '兴业银行'
        },
        {
          value: '华夏银行',
          label: '华夏银行'
        },
         {
          value: '招商银行',
          label: '招商银行'
        },
         {
          value: '浦发银行',
          label: '浦发银行'
        },
         {
          value: '中国邮政储蓄银行',
          label: '中国邮政储蓄银行'
        },
        {
          value: '中国平安银行',
          label: '中国平安银行'
        },
        {
          value: '中国光大银行',
          label: '中国光大银行'
        },
        {
          value: '中国广发银行',
          label: '中国广发银行'
        },
        {
          value: '交通银行',
          label: '交通银行'
        },
        {
          value: '上海银行',
          label: '上海银行'
        },
      ],
      tableData: [{
        registTime: '2016-05-02',
        userName: '王小虎',
        phoneNum: '134567879009',
        vestState: '是',
        credentialsNum: '8655654659899',
        bank: '花旗银行',
        bankId: '877656546878990909',
        gender: '男',
        age: '18',
        channel: 'appStore',
        isAuthentication: '已认证',
        authenticationTime: '2018-5-8'
      }, {
        registTime: '2016-05-02',
        userName: '王小虎',
        phoneNum: '134567879009',
        vestState: '是',
        credentialsNum: '8655654659899',
        bank: '花旗银行',
        bankId: '877656546878990909',
        gender: '男',
        age: '18',
        channel: 'appStore',
        isAuthentication: '已认证',
        authenticationTime: '2018-5-9'
      }]
    }
  },
  methods: {
    searchUser () {
      this.$axios.post('/test/test/testToken.php', {
        phoneNum: this.phoneNum, 
        credentialsNum: this.credentialsNum, 
        channel: this.channel,
        beginTime: this.beginTime,
        endTime: this.endTime,
        isAuthentication: this.isAuthentication,
        vestState: this.vestState,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
    },
    openAdd () {
      this.userPopBox = true;
      this.addUser = true;
      this.vestState1 = '';
      this.userName = '';
      this.phoneNum1 = '';
      this.credentialsNum1 = '';
      this.bank = '';
      this.bankId = '';
      this.sex = '';
      this.age = '';
      this.vcode = '';
    },
    addUser () {
      let user
      if(vestState1==1){
        this.user = {
          vestState: this.vestState1,
          userName: this.userName,
          phoneNum: this.phoneNum1,
          credentialsNum: this.credentialsNum1,
          bank: this.bank,
          bankNum: this.bankId,
          gender: this.sex,
          age: this.age,
          vcode: this.vcode
        }
      }
      else{
        this.user = {
          vestState: this.vestState1,
          userName: this.userName,
          phoneNum: this.phoneNum1,
          vcode: this.vcode
        }
      }
      this.$axios.post('/test/test/testToken.php', user).then(data => {
        console.log(data)
      })
    },
    handleEdit (value1,value2) {
      this.userPopBox = true;
      this.modifyUser = true;
    }
  }
}
</script>
<style scoped>
  /* .el-input{
    width: 150px;
    margin-right: 20px;
  }
  .el-select{
    width: 150px;
    margin-right: 20px;
  } */
  .popBox .el-input{
    width: 300px;
  }
  .popBox .el-select{
    width: 300px;
  }
  /* .popTitle{
    display: inline-block;
    width: 100px;
  } */
</style>


