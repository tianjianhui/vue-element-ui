<template>
   <div class="repayment">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userId" clearable></el-input>
            真实姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            手机号
            <el-input size="small" v-model="phoneNum" clearable></el-input>
            应还款时间
            <el-date-picker v-model="shouldRepaymentBeginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="shouldRepaymentEndTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            <el-button size="small" @click="elseTerm = !elseTerm">高级筛选</el-button>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchRepayment">查询</el-button>
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
      </div>
      <div style="margin-top:10px;font-size:1.5rem;">
         应还款总额:<span class="redMoney">{{totalShouldRepaymentAmount}}元</span>
         应还本金:<span class="redMoney">{{totalShouldRepaymentPrincipal}}元</span>
         应还利息:<span class="redMoney">{{totalShouldRepaymentInterest}}元</span>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
            <el-table-column prop="userName" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="phoneNum" label="手机号码" align="center"></el-table-column>
            <el-table-column prop="bidName" label="标的名称" align="center"></el-table-column>
            <el-table-column prop="shouldRepaymentTime" label="应还款时间" align="center"></el-table-column>
            <el-table-column prop="exactRepaymentTime" label="实际还款时间" align="center"></el-table-column>
            <el-table-column prop="totalAccount" label="账户总额" align="center"></el-table-column>
            <el-table-column prop="shouldRepaymentAmount" label="应还款总额" align="center"></el-table-column>
            <el-table-column prop="shouldRepaymentPrincipal" label="应还款本金" align="center"></el-table-column>
            <el-table-column prop="shouldRepaymentInterest" label="应还款利息" align="center"></el-table-column>
            <el-table-column prop="addInterest" label="加息利息" align="center"></el-table-column>
            <el-table-column prop="alreadyRepayment" label="已还金额" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchRepayment"
          @current-change="searchRepayment"
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
  name: 'repayment',
  data () {
      return {
        userId: '',
        userName: '',
        phoneNum: '',
        shouldRepaymentBeginTime: '',
        shouldRepaymentEndTime: '',
        elseTerm: false,
        state: '',
        states: [
            {
                label: '已还款',
                value: '1'
            },
            {
                label: '未还款',
                value: '2'
            }
        ],
        pageNum: 1,
        pageSize: 10,
        total: 100,
        tableData: [
            {
                userId: 'uii',
                userName: 'kjkk',
                phoneNum: '1569873544',
                bidName: 'nmmnn',
                shouldRepaymentTime: '2018-5-9',
                exactRepaymentTime: '2019-4-18',
                totalAccount: 159,
                shouldRepaymentAmount: 560,
                shouldRepaymentPrincipal: 240,
                shouldRepaymentInterest: 12,
                addInterest: 12,
                alreadyRepayment: 145,
                state: 'oop'
            },
            {
                userId: 'uii',
                userName: 'kjkk',
                phoneNum: '1569873544',
                bidName: 'nmmnn',
                shouldRepaymentTime: '2018-5-9',
                exactRepaymentTime: '2019-4-18',
                totalAccount: 159,
                shouldRepaymentAmount: 560,
                shouldRepaymentPrincipal: 240,
                shouldRepaymentInterest: 12,
                addInterest: 12,
                alreadyRepayment: 145,
                state: 'oop'
            }
        ]
      }
  },
  methods: {
      searchRepayment(){
        this.$axios.post('/test/test/testToken.php', {
            userId: this.userId,
            userName: this.userName,
            phoneNum: this.phoneNum,
            shouldRepaymentBeginTime: this.shouldRepaymentBeginTime,
            shouldRepaymentEndTime: this.shouldRepaymentEndTime,
            state: this.state,
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

