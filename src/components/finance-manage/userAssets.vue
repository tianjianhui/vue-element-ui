<template>
   <div class="gathering">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userId" clearable></el-input>
            真实姓名
            <el-input size="small" v-model="userName" clearable></el-input>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchUserAssets">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
            <el-table-column prop="userName" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="generalAssets" label="资产总额" align="center"></el-table-column>
            <el-table-column prop="availableBalance" label="可用余额" align="center"></el-table-column>
            <el-table-column prop="totalReceiptsPending" label="待收总额" align="center"></el-table-column>
            <el-table-column prop="frozenFund" label="冻结资金" align="center"></el-table-column>
            <el-table-column prop="cumulative" label="累计收益" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchUserAssets"
          @current-change="searchUserAssets"
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
  name: 'userAssets',
  data(){
      return {
          userId: '',
          userName: '',
          pageNum: 1,
          pageSize: 10,
          total: 100,
          tableData: [
              {
                  userId: 'uiii',
                  userName: 'ioio',
                  generalAssets: 456,
                  availableBalance: 156,
                  totalReceiptsPending: 560,
                  frozenFund: 150,
                  cumulative: 120,
              },
              {
                  userId: 'uiii',
                  userName: 'ioio',
                  generalAssets: 456,
                  availableBalance: 156,
                  totalReceiptsPending: 560,
                  frozenFund: 150,
                  cumulative: 120,
              }
          ]
      }
  },
  methods: {
      searchUserAssets(){
        //   this.$axios.post('/test/test/testToken.php', {
        //     userId: this.userId,
        //     userName: this.userName,
        //     pageNum: this.pageNum,
        //     pageSize: this.pageSize 
        // }).then(data => {
        //     console.log(data)
        // })
      },
      output(){
      }
  }
}
</script>

