<template>
  <div class="withdraw-cash">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userId" clearable></el-input>
            真实姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            申请时间
            <el-date-picker v-model="createBeginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="createEndTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            确认时间
            <el-date-picker v-model="confirmBeginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="confirmEndTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            <el-button size="small" @click="elseTerm = !elseTerm">高级筛选</el-button>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchWithdrawCash">查询</el-button>
          </div>
          <div style="margin-top:10px;" v-if="elseTerm">
           <span style="display:inline-block;width:48px;">状态</span>
            <el-select size="small" v-model="state" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
          <el-button size="small" type="primary" @click="verify">批量审核</el-button>
          <el-button size="small" type="primary" @click="sure">批量确认</el-button>
      </div>
      <div style="margin-top:10px;font-size:1.5rem;">
          提现金额:<span style="color:red;">{{total}}元</span>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border  style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
            <el-table-column prop="userName" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="withdrawCashAmount" label="提现金额" align="center"></el-table-column>
            <el-table-column prop="poundage" label="手续费" align="center"></el-table-column>
            <el-table-column prop="bank" label="所属银行" align="center"></el-table-column>
            <el-table-column prop="bankId" label="卡号" align="center"></el-table-column>
            <el-table-column prop="bankOfDeposit" label="开户支行" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
            <el-table-column prop="auditingTime" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="confirmTime" label="确认时间" align="center"></el-table-column>
            <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" min-width="50">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                <el-button type="primary" size="mini" @click="handleEdit1(scope.$index, scope.row)">确认</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchWithdrawCash"
          @current-change="searchWithdrawCash"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="popBox" v-if="withdrawPopBox">
        <div class="box-body">
            <div v-if="sure">
               <p style="text-align:center;">确定通过该用户的提现?</p>
                <span class="popTitle">备注:</span>
                <el-input size="small" v-model="note" clearable></el-input><br>
                <div style="text-align:center;">
                    <el-button @click="withdrawPopBox = false;sure = false;">取消</el-button>
                    <el-button type="success" @click="agree">确定</el-button>
                </div>
            </div>
            <div v-if="verify">
                <p style="text-align:center;">确定已转账?</p>
                <span class="popTitle">备注:</span>
                <el-input size="small" v-model="note" clearable></el-input><br>
                <div style="text-align:center;">
                    <el-button @click="withdrawPopBox = false;verify = false;">拒绝</el-button>
                    <el-button type="success" @click="agree">同意</el-button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'withdrawCash',
  data(){
      return {
          userId: '',
          userName: '',
          createBeginTime: '',
          createEndTime: '',
          confirmBeginTime: '',
          confirmEndTime: '',
          state: '',
          pageNum: 1,
          pageSize: 10,
          total: 100,
          elseTerm: false,
          states: [
              {
                  label: '申请中',
                  value: '1'
              },
              {
                  label: '待确认',
                  value: '2'
              },
              {
                  label: '已转账',
                  value: '3'
              },
              {
                  label: '提现失败',
                  value: '4'
              }
          ],
          multipleSelection: [],
          sure: false,
          verify: false,
          withdrawPopBox: false,
          tableData: [
              {
                  userId: 'poopo',
                  userName: 'ioi',
                  createTime: 'klk',
                  withdrawCashAmount: 'tyy',
                  poundage: 'hnn',
                  bank: 'rer',
                  bankId: '15478441356',
                  bankOfDeposit: 'ghyyu',
                  state: 'hhhh',
                  auditingTime: '2018-5-9',
                  confirmTime: '2018-9-8',
                  note: 'kjiuhutgy'
              },
              {
                  userId: 'poopo',
                  userName: 'ioi',
                  createTime: 'klk',
                  withdrawCashAmount: 'tyy',
                  poundage: 'hnn',
                  bank: 'rer',
                  bankId: '15478441356',
                  bankOfDeposit: 'ghyyu',
                  state: 'hhhh',
                  auditingTime: '2018-5-9',
                  confirmTime: '2018-9-8',
                  note: 'kjiuhutgy'
              }
          ]
      }
  },
  methods: {
      searchWithdrawCash(){
        this.$axios.post('/test/test/testToken.php', {
        userId: this.userId,
        userName: this.userName,
        createBeginTime: this.createBeginTime,
        createEndTime: this.createEndTime,
        confirmBeginTime: this.confirmBeginTime,
        confirmEndTime: this.confirmEndTime,
        state: this.state,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      handleEdit(value1,value2){
          this.withdrawPopBox = true;
          this.verify = true;
      },
      handleEdit1(value1,value2){
          this.withdrawPopBox = true;
          this.sure = true;
      }
  }
}
</script>
<style scoped>
  .popBox .el-input{
    width: 300px;
  }
</style>


