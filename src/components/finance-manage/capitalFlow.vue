<template>
  <div class="capital-flow">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="enterpriseName" clearable></el-input>
            手机号码
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            交易类型
            <el-select size="small" v-model="payTypeId" clearable placeholder="请选择">
              <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            交易时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchCapitalFlow">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="enterpriseName" label="用户名" align="center"></el-table-column>
            <el-table-column prop="name" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="payType" label="交易类型" align="center" min-width="50"></el-table-column>
            <el-table-column prop="principal" label="本金" align="center"></el-table-column>
            <el-table-column prop="interest" label="利息" align="center"></el-table-column>
            <el-table-column prop="totalAccount" label="账户总额" align="center"></el-table-column>
            <el-table-column prop="availableBalance" label="可用余额" align="center"></el-table-column>
            <el-table-column prop="freezingAmount" label="冻结金额" align="center"></el-table-column>
            <el-table-column prop="amountWaitReturned" label="待还金额" align="center"></el-table-column>
            <el-table-column prop="amountWaitGet" label="待收金额" align="center"></el-table-column>
            <el-table-column prop="tradingTime" label="交易时间" align="center"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="channel" label="渠道标识" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchCapitalFlow"
          @current-change="searchCapitalFlow"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: 'capitalFlow',
  data(){
      return {
        enterpriseName: '',
        phoneNum: '',
        payTypeId: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 20,
        total: 100,
        tableData: [
          {
            enterpriseName: 'om,kl',
            name: 'lko',
            phoneNum: '157896522',
            payType: 'ppp',
            principal: 'khiu',
            interest: 'llll',
            totalAccount: 'ppopo',
            availableBalance: 'ppopo',
            freezingAmount: 'mnnmn',
            amountWaitReturned: 'bgfgg',
            amountWaitGet: 'yytyt',
            tradingTime: '2015-5-9',
            projectName: 'huuuiui',
            channel: 'rere',
            remark: 'go'
          },
          {
            enterpriseName: 'om,kl',
            name: 'lko',
            phoneNum: '157896522',
            payType: 'ppp',
            principal: 'khiu',
            interest: 'llll',
            totalAccount: 'ppopo',
            availableBalance: 'ppopo',
            freezingAmount: 'mnnmn',
            amountWaitReturned: 'bgfgg',
            amountWaitGet: 'yytyt',
            tradingTime: '2015-5-9',
            projectName: 'huuuiui',
            channel: 'rere',
            remark: 'go'
          }
        ]
      }
  },
  created (){
    this.searchCapitalFlow();
    this.$axios.post('/test/test/testToken.php', {
        
      }).then(data => {
        console.log(data)
      })
  },
  methods: {
    searchCapitalFlow(){
      this.$axios.post('/test/test/testToken.php', {
        enterpriseName: this.enterpriseName,
        phoneNum: this.phoneNum,
        payTypeId: this.payTypeId,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
    },
    output(){
      console.log('beautiful');
    }
  }
}
</script>
<style scoped>

</style>


