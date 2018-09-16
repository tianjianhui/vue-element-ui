<template>
   <div class="gathering">
      <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="enterpriseName" clearable></el-input>
            状态
            <el-select size="small" v-model="state" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            应收款时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchGathering">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div>
      <div style="margin-top:10px;font-size:1.5rem;">
         应收款总额:<span class="redMoney">{{totalShouldReceivableAmount}}元</span>
         应收款本金:<span class="redMoney">{{totalShouldReceivablePrincipal}}元</span>
         应收款利息:<span class="redMoney">{{totalShouldReceivableInterest}}元</span>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="enterpriseName" label="用户名" align="center"></el-table-column>
            <el-table-column prop="bidName" label="标的名称" align="center"></el-table-column>
            <el-table-column prop="shouldReceivableTime" label="应收款时间" align="center"></el-table-column>
            <el-table-column prop="exactReceivableTime" label="实际收款时间" align="center"></el-table-column>
            <el-table-column prop="shouldReceivableAmount" label="应收款总额" align="center"></el-table-column>
            <el-table-column prop="shouldReceivablePrincipal" label="应收本金" align="center"></el-table-column>
            <el-table-column prop="shouldReceivableInterest" label="应收利息" align="center"></el-table-column>
            <el-table-column prop="alreadyReceivableAmount" label="已收款金额" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchGathering"
          @current-change="searchGathering"
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
  name: 'gathering',
  data () {
      return {
          enterpriseName: '',
          state: '',
          beginTime: '',
          endTime: '',
          pageNum: 1,
          pageSize: 10,
          total: 100,
          states: [
              {
                  label: '已收款',
                  value: '1'
              },
              {
                  label: '未收款',
                  value: '2'
              }
          ],
          tableData: [
              {
                  enterpriseName: 'oppop',
                  bidName: 'momn',
                  shouldReceivableTime: '2018-5-10',
                  exactReceivableTime: '2017-5-9',
                  shouldReceivableAmount: 566,
                  shouldReceivablePrincipal: 123,
                  shouldReceivableInterest: 12,
                  alreadyReceivableAmount: 775,
                  state: 'go'
              },
              {
                  enterpriseName: 'oppop',
                  bidName: 'momn',
                  shouldReceivableTime: '2018-5-10',
                  exactReceivableTime: '2017-5-9',
                  shouldReceivableAmount: 566,
                  shouldReceivablePrincipal: 123,
                  shouldReceivableInterest: 12,
                  alreadyReceivableAmount: 775,
                  state: 'go'
              }
          ]
      }
  },
  methods: {
      searchGathering(){
          this.$axios.post('/test/test/testToken.php', {
            enterpriseName: this.enterpriseName,
            state: this.state,
            beginTime: this.beginTime,
            endTime: this.endTime,
            pageNum: this.pageNum,
            pageSize: this.pageSize 
        }).then(data => {
            console.log(data)
        })
      },
      output(){
          
      }
  }
}
</script>

