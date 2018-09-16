<template>
  <div class="role">
    <div class="searchTerm">
        <div>
        角色名称
        <el-input size="small" v-model="roleName" clearable></el-input>
        <el-button size="small" icon="el-icon-search" type="success" @click="searchRole">查询</el-button>
        </div>
        <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增</el-button>
        </div>
    </div>
    <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="role" label="角色名称" align="center"></el-table-column>
            <el-table-column prop="authority" label="所属权限" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="100">
              <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="primary" size="mini" @click="forbidden(scope.$index, scope.row)">禁用</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="popBox" v-if="rolePopBox">
        <div class="box-body">
            <div v-if="resetPassword" style="text-align:center;">
              <p>重置密码</p>
            <el-input placeholder="请输入验证码" v-model="vcode">
                <el-button slot="append" @click="getVcode">获取验证码</el-button>
            </el-input>
            <div style="text-align:center;">
            <el-button @click="rolePopBox = false;resetPassword = false;">取消</el-button>
            <el-button type="success" @click="sureVcode">确定</el-button>
            </div>
          </div>
        </div>
        <div v-if="addRole"></div>
    </div>
    <div class="popBox" v-if="addRole">
      <div class="box-body addRole">
        <div>
            角色名称
            <el-input size="small" v-model="role" clearable></el-input>
        </div>
        <div class="addRole-body">
            <div class="left">
                菜单权限
                <div>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">用户管理</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city" class="checkBox">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="right">
                操作权限
                <div></div>
            </div>
        </div>
        <div style="text-align:center;margin-top:20px;">
            <el-button @click="addRole=false">取消</el-button>
            <el-button type="success" @click="sureVcode">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const cityOptions = ['用户列表', '员工列表', '角色列表'];
export default {
  name: 'role',
  data () {
      return {
          roleName: '',
          vcode: '',
          rolePopBox: false,
          resetPassword: false,
          addRole: false,
          checkAll: false,
          checkedCities: [],
          cities: cityOptions,
          isIndeterminate: true,
          tableData: [
              {
                  role: 'yanfa',
                  authority: '12555',
                  state: 'jinyong'
              },
              {
                  role: 'yanfa',
                  authority: '12555',
                  state: 'jinyong'
              }
          ],
      }
  },
  created () {
      this.searchRole();
  },
  methods: {
      searchRole () {
          this.$axios.post('/test/test/testToken.php', {
            roleName: this.roleName
      }).then(data => {
        console.log(data)
      })
      },
      openAdd () {
          this.rolePopBox = true;
          this.resetPassword = true;
      },
      handleEdit (value1,value2) {
          this.rolePopBox = true;
          this.resetPassword = true;
          console.log(value1);
          console.log(value2);
      },
      forbidden () {
          this.rolePopBox = true;
          this.resetPassword = true;
      },
      getVcode () {
        this.$axios.post('/test/test/testToken.php', {
        phone: '',
        type: '0'
      }).then(data => {
        console.log(data)
      })
      },
      sureVcode () {
          this.addRole = true;
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
  .left{
      width: 15%;
      margin-right: 30px;
      border: 2px solid lightskyblue;
      border-radius: 5px;
      box-shadow: 5px 5px 10px #cccccc;
      padding: 10px;
  }
  .right{
      width: 60%;
      border: 2px solid lightskyblue;
      border-radius: 5px;
      box-shadow: 5px 5px 10px #cccccc;
      padding: 10px;
  }
  .checkBox{
      display: block;
      margin-left: 20px;
  }
  .addRole{
      width: 60%;
  }
  .addRole-body{
      display: flex;
  }
</style>


