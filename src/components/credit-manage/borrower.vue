<template>
  <div class="borrower">
    <div class="searchTerm">
        <div>
            用户名
            <el-input size="small" v-model="enterpriseName" clearable></el-input>
            真实姓名
            <el-input size="small" v-model="realName" clearable></el-input>
            手机号码
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            借款类型
            <el-select size="small" v-model="bidType" clearable placeholder="请选择">
                <el-option v-for="item in bidTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchUser">查询</el-button>
        </div>
    </div>
    <div style="margin-top:10px;">
        <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="openAdd">新增</el-button>
        <el-button size="small" type="primary" icon="el-icon-download">导出</el-button>
    </div>
    <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;">
            <el-table-column prop="enterpriseName" label="用户名" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center"></el-table-column>
            <el-table-column prop="credentialsNum" label="证件号码" align="center"></el-table-column>
            <el-table-column prop="ticketId" label="票号" align="center"></el-table-column>
            <el-table-column prop="bidId" label="借款类型" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
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
    <div class="popBox" v-if="borrowerPopBox">
    <div class="box-body">
        <p style="text-align:center;">新增借款人</p>
        <span class="popTitle">用户名:</span>
        <el-input size="small" v-model="enterpriseName1" clearable></el-input><br>
        <span class="popTitle">真实姓名:</span>
        <el-input size="small" v-model="realName1" clearable></el-input><br>
        <span class="popTitle">性别:</span>
        <el-select size="small" v-model="sex" clearable placeholder="请选择">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
        </el-select><br>
        <span class="popTitle">证件号码:</span>
        <el-input size="small" v-model="credentialsNum1" clearable></el-input><br>
        <span class="popTitle">票号:</span>
        <el-input size="small" v-model="ticketId" clearable></el-input><br>
        <span class="popTitle">借款类型:</span>
        <div v-if="addBorrower" style="display:inline-block;">
            <el-select size="small" v-model="bidType1" clearable placeholder="请选择">
                <el-option v-for="item in bidTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div v-else style="display:inline-block;">
            {{keven}}
        </div>
        <div style="text-align:center;">
        <el-button @click="borrowerPopBox = false;addBorrower = false;">取消</el-button>
        <el-button type="success" @click="submit">保存</el-button>
        </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'borrower',
  data () {
      return {
          enterpriseName: '',
          realName: '',
          phoneNum: '',
          bidType: '',
          pageNum: 1,
          total: 100,
          enterpriseName1: '',
          realName1: '',
          sex: '',
          credentialsNum1: '',
          ticketId: '',
          bidType1: '',
          borrowerPopBox: false,
          addBorrower: false,
          bidTypes: [
              {
                label: '月盈宝',
                value: '1'
              },
              {
                label: '票兑宝',
                value: '2'
              },
              {
                label: '多利宝',
                value: '3'
              }
          ],
          tableData: [
              {
                  enterpriseName: 'errr',
                  name: 'jkk',
                  sex: 'male',
                  credentialsNum: '1557899999',
                  ticketId: '6954771122',
                  bidId: 'yyb',
                  createTime: '2018-6-3'
              },
              {
                  enterpriseName: 'errr',
                  name: 'jkk',
                  sex: 'male',
                  credentialsNum: '1557899999',
                  ticketId: '6954771122',
                  bidId: 'yyb',
                  createTime: '2018-6-3'
              }
          ]
      }
  },
  methods: {
      openAdd () {
          this.borrowerPopBox = true;
          this.addBorrower = true;
          this.enterpriseName1 = '';
          this.realName1 = '';
          this.sex = '';
          this.credentialsNum1 = '';
          this.ticketId = '';
          this.bidType1 = '';
      },
      submit () {
        this.$axios.post('/test/test/testToken.php', {
        enterpriseName1: this.enterpriseName1,
        realName1: this.realName1,
        sex: this.sex,
        credentialsNum1: this.credentialsNum1,
        ticketId: this.ticketId,
        bidType1: this.bidType1,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
      },
      handleEdit (value1,value2) {
          this.borrowerPopBox = true;
          this.addBorrower = false;
      }
  }
}
</script>
<style scoped>
    .popBox .el-input{
    width: 300px;
  }
  .popBox .el-select{
    width: 300px;
  }
</style>


