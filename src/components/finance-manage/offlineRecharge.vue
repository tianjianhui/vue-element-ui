<template>
  <div class="offline-recharge">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userId" clearable></el-input>
            姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            申请时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            状态
            <el-select size="small" v-model="state" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchOfflineRecharge">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" @click="offlinePopBox=true;charge=true;">充值</el-button>
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
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
            <el-table-column label="操作" align="center" min-width="50">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchOfflineRecharge"
          @current-change="searchOfflineRecharge"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div class="popBox" v-if="offlinePopBox">
        <div class="box-body">
            <div v-if="charge">
               <p style="text-align:center;">充值</p>
               <span class="popTitle">充值金额:</span>
               <el-input size="small" v-model="chargeMoney" clearable></el-input>元<br>
               <span class="popTitle">用户名:</span>
               <el-input size="small" v-model="userName1" clearable></el-input><br>
               <span class="popTitle">备注:</span>
               <el-input size="small" v-model="note" clearable></el-input>
               <div style="text-align:center;">
                <el-button @click="offlinePopBox = false;charge = false;">取消</el-button>
                <el-button type="success" @click="goCharge">提交</el-button>
               </div>
            </div>
            <div v-if="verify">
                <span class="popTitle">用户名:</span>{{value2.userId}}<br>
                <span class="popTitle">姓名:</span>{{value2.userName}}<br>
                <span class="popTitle">申请时间:</span>{{value2.applyTime}}<br>
                <span class="popTitle">充值金额:</span>{{value2.rechargeAmount}}<br>
                <span class="popTitle">备注:</span>{{value2.note}}<br>
                <span class="popTitle">审核备注:</span>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="note1">
                </el-input><br>
                <span class="popTitle">安全验证码:</span>
                <el-input placeholder="请输入验证码" v-model="vcode">
                    <el-button slot="append" @click="getVcode">获取验证码</el-button>
                </el-input><br>
                <div style="text-align:center;">
                    <el-button @click="offlinePopBox = false;verify = false;">拒绝</el-button>
                    <el-button type="success" @click="agree">同意</el-button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'offlineRecharge',
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
              },
              {
                  label: '待审核',
                  value: '3'
              },
              {
                  label: '已拒绝',
                  value: '4'
              }
          ],
          pageNum: 1,
          pageSize: 10,
          total: 100,
          offlinePopBox: false,
          charge: false,
          verify: false,
          chargeMoney: '',
          userName1: '',
          note: '',
          note1: '',
          vcode: '',
          value1: '',
          value2: '',
          tableData: [
              {
                 userId: 'yyyy',
                 userName: 'jun',
                 rechargeAmount: 'koko',
                 state: 'zhuangtai',
                 applyTime: '2018-9-8',
                 finishTime: '2018-9-9',
                 note: 'you are right'
              },
              {
                 userId: 'yyyy',
                 userName: 'jun',
                 rechargeAmount: 'koko',
                 state: 'zhuangtai',
                 applyTime: '2018-9-8',
                 finishTime: '2018-9-9',
                 note: 'you are right'
              }
          ]
      }
  },
  created(){
      this.searchOfflineRecharge();
  },
  methods:{
      searchOfflineRecharge(){
          console.log(this.state);
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
      },
      output(){
          console.log('good')
      },
      goCharge(){
          console.log('good')
      },
      handleEdit(value1,value2){
          this.offlinePopBox = true;
          this.verify = true;
          this.value1 = value1;
          this.value2 = value2;
      },
      agree(){

      },
      getVcode(){
        this.$axios.post('/test/test/testToken.php', {
         phone: '',
         type: '0'
      }).then(data => {
        console.log(data)
      }) 
      }
  }
}
</script>
<style scoped>
  .popBox .el-input{
    width: 300px;
  }
  .popBox .el-textarea{
      width: 300px;
      vertical-align: middle;
      margin-bottom: 10px;
  }
  .popTitle{
      margin-bottom: 10px;
  }
</style>


