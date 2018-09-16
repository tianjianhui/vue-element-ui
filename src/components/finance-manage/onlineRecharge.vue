<template>
  <div class="online-recharge">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userId" clearable></el-input>
            姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            充值时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            状态
            <el-select size="small" v-model="state" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchOnlineRecharge">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div>
      <div style="margin-top:10px;font-size:1.5rem;">
          充值总额:<span style="color:red;">{{total}}元</span>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="rechargeAmount" label="充值的金额" align="center"></el-table-column>
            <el-table-column prop="state" label="充值状态" align="center"></el-table-column>
            <el-table-column prop="applyTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="finishTime" label="资金到帐的时间" align="center"></el-table-column>
            <el-table-column prop="note" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchOnlineRecharge"
          @current-change="searchOnlineRecharge"
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
  name: 'onlineRecharge',
  data(){
      return {
         userId: '',
         userName: '',
         beginTime: '',
         endTime: '',
         state: '',
         states: [
             {
                 label: '充值成功',
                 value: '1'
             },
             {
                 label: '充值失败',
                 value: '2'
             }
         ],
         pageNum: 1,
         pageSize: 10,
         total: 100,
         tableData: [
             {
                 userId: 'opp',
                 userName: 'keven',
                 chargeAmount: 1320,
                 chargePlatform: 'fuyou',
                 state: 'bbn',
                 number: 15,
                 note: 'hrhuuw',
                 chargeTime: '2018-8-8',
                 sureTime: '2018-10-9'
             },
             {
                 userId: 'opp',
                 userName: 'keven',
                 chargeAmount: 1320,
                 chargePlatform: 'fuyou',
                 state: 'bbn',
                 number: 15,
                 note: 'hrhuuw',
                 chargeTime: '2018-8-8',
                 sureTime: '2018-10-9'
             }
         ]
      }
  },
  created(){
      this.searchOnlineRecharge();
  },
  methods:{
      output(){
          console.log('good');
      },
      searchOnlineRecharge(){
        this.$axios.post('/test/test/testToken.php', {
        userId: this.userId,
        userName: this.userName,
        phoneNum: this.phoneNum,
        beginTime: this.beginTime,
        endTime: this.endTime,
        state: this.state,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
      }
  }
}
</script>

