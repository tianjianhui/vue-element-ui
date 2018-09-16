<template>
  <div class="staff">
      <div class="searchTerm">
          <div>
            工号
            <el-input size="small" v-model="staffNum" clearable></el-input>
            手机号码
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchStaff">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="staffNum" label="工号" align="center"></el-table-column>
            <el-table-column prop="staffName" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="roleId" label="所属角色" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
              <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="openRest(scope.$index, scope.row)">重置密码</el-button>
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="primary" size="mini" @click="forbidden(scope.$index, scope.row)">禁用</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchStaff"
          @current-change="searchStaff"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="popBox" v-if="staffPopBox">
        <div class="box-body">
          <div v-if="addStaff">
            <p style="text-align:center;" v-if="addStaff">新增员工</p>
            <p style="text-align:center;" v-if="modifyStaff">修改员工</p>
            <span class="popTitle">员工姓名:</span>
            <el-input size="small" v-model="staffName1" clearable></el-input><br>
            <span class="popTitle">手机号码:</span>
            <el-input size="small" v-model="phoneNum1" clearable></el-input><br>
            <span class="popTitle">所属角色: </span>
            <el-select size="small" v-model="roleId" clearable placeholder="请选择">
              <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleId">
              </el-option>
            </el-select><br>
            <div style="text-align:center;">
            <el-button @click="staffPopBox = false;addStaff = false;">取消</el-button>
            <el-button type="success" @click="addStaff">保存</el-button>
            </div>
          </div>
          <div v-if="resetPassword" style="text-align:center;">
              <p>重置密码</p>
            <el-input placeholder="请输入验证码" v-model="vcode">
                <el-button slot="append" @click="getVcode">获取验证码</el-button>
            </el-input>
            <div style="text-align:center;">
            <el-button @click="staffPopBox = false;resetPassword = false;">取消</el-button>
            <el-button type="success" @click="addStaff">确定</el-button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
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
<script>
export default {
  name: 'staff',
  data () {
      return {
        staffNum: '',
        phoneNum: '',
        pageNum: 1,
        pageSize: 10,
        total: 100,
        staffPopBox: false,
        addStaff: false,
        modifyStaff: false,
        staffName1: '',
        phoneNum1: '',
        roleId: '',
        roles: [],
        resetPassword: false,
        vcode: '',
        tableData: [
            {
                staffNum: '23444544',
                staffName: 'keven',
                phoneNum: '15701245137',
                roleId: 'yunying',
                state: '1',
                createTime: '2018-5-1',
            },
            {
                staffNum: '23444544',
                staffName: 'keven',
                phoneNum: '15701245137',
                roleId: 'yunying',
                state: '1',
                createTime: '2018-5-1',
            }
        ]
      }
  },
  created () {
    this.$axios.post('/test/test/testToken.php', {
    }).then(data => {
    console.log(data)
    });
    this.searchStaff();
  },
  methods: {
      searchStaff () {
        this.$axios.post('/test/test/testToken.php', {
            staffNum: this.staffNum,
            phoneNum: this.phoneNum,
            pageNum: this.pageNum,
            pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
      },
      addStaff () {
         this.$axios.post('/test/test/testToken.php', {
            staffNum: this.staffNum,
            phoneNum: this.phoneNum,
            roleId: this.roleId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      }) 
      },
      openAdd () {
          this.addStaff = true;
          this.staffPopBox = true;
          this.staffName1 = '';
          this.phoneNum1 = '';
          this.roleId = '';
      },
      openRest (value1,value2) {
          console.log(value1,value2);
          this.staffPopBox = true;
          this.resetPassword = true
      },
      getVcode () {
      this.$axios.post('/test/test/testToken.php', {
        phone: '',
        type: '0'
      }).then(data => {
        console.log(data)
      })
    },
    forbidden (value1,value2) {
        this.$axios.post('/test/test/testToken.php', {
        staffId: '',
        state: ''
        }).then(data => {
            console.log(data)
        })
    },
    handleEdit (value1,value2) {
        this.staffPopBox = true;
        this.addStaff = true;
        // this.modifyStaff = true;
        this.$axios.post('/test/test/testToken.php', {
            staffId: '',
            staffNum: this.staffNum,
            phoneNum: this.phoneNum,
            roleId: ''
      }).then(data => {
        console.log(data)
      }) 
    }
  }
}
</script>


