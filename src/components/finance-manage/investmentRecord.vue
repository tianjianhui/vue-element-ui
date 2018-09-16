<template>
  <div class="investment-record">
      <div class="searchTerm">
          <div>
            用户姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            手机号码
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            投标时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            交易类型
            <el-select size="small" v-model="investmentState" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchInvestmentRecord">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div>
      <div style="margin-top:10px;font-size:1.5rem;">
          投资总额:<span class="redMoney">{{investmentAmountTotal}}元</span>
          利息金额:<span class="redMoney">{{interestAmountTotal}}元</span>
          红包金额:<span class="redMoney">{{hongbaoAmountTotal}}元</span>
          加息金额:<span class="redMoney">{{addInterestAmountTotal}}元</span>
          待收总额:<span class="redMoney">{{waitBackAmountTotal}}元</span>
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
          @size-change="searchInvestmentRecord"
          @current-change="searchInvestmentRecord"
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
  name: 'investmentRecord',
  data(){
      return {
          userName: '',
          phoneNum: '',
          beginTime: '',
          endTime: '',
          investmentState: '',
          states: [
              {
                  label: '招标中',
                  value: '1'
              },
              {
                  label: '还款中',
                  value: '2'
              },
              {
                  label: '已还清',
                  value: '3'
              }
          ],
          pageNum: 1,
          pageSize: 10,
          total: 100,
          tableData: [
              {
                 enterpriseName: 'popo',
                 name: 'klk',
                 phoneNum: 'jiu',
                 payType: 'yu',
                 principal: 'ioi',
                 interest: 'lol',
                 totalAccount: 'ere',
                 availableBalance: 'wew',
                 freezingAmount: 'tot',
                 amountWaitReturned: 'goto',
                 amountWaitGet: 'ppo',
                 tradingTime: '2018-5-9',
                 projectName: 'mmmn',
                 channel: 'enen',
                 remark: 'qqq'
              },
              {
                 enterpriseName: 'popo',
                 name: 'klk',
                 phoneNum: 'jiu',
                 payType: 'yu',
                 principal: 'ioi',
                 interest: 'lol',
                 totalAccount: 'ere',
                 availableBalance: 'wew',
                 freezingAmount: 'tot',
                 amountWaitReturned: 'goto',
                 amountWaitGet: 'ppo',
                 tradingTime: '2018-5-9',
                 projectName: 'mmmn',
                 channel: 'enen',
                 remark: 'qqq'
              }
          ]
      }
  },
  created(){

  },
  methods:{
      searchInvestmentRecord(){
      this.$axios.post('/test/test/testToken.php', {
        userName: this.userName,
        phoneNum: this.phoneNum,
        beginTime: this.beginTime,
        endTime: this.endTime,
        investmentState: this.investmentState,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
      },
      output(){
          console.log('beautiful')
      }
  }
}
</script>
<style scoped>
    /* .redMoney{
        color: red;
        margin-right: 20px;
    } */
</style>