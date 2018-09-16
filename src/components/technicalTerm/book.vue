<template>
  <div class="book">
     <div class="searchTerm">
          <div>
            名称
            <el-input size="small" v-model="term" clearable></el-input>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchBook">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addTerm">新增</el-button>
          <el-button size="small" type="primary" icon="el-icon-download" @click="output">导出</el-button>
      </div> 
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column type="index" align="center" width="50"></el-table-column>
            <el-table-column prop="term" label="名称" align="center"></el-table-column>
            <el-table-column prop="annotate" label="注解" align="center" min-width="50"></el-table-column>
            <el-table-column label="操作" align="center" min-width="50">
              <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination background 
          @size-change="searchBook"
          @current-change="searchBook"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
       <div class="popBox" v-if="bookPopBox">
        <div class="box-body">
            <p v-if="addBox" style="text-align:center;">新增名词</p>
            <p v-else style="text-align:center;">修改名词</p>
            <span class="popTitle">名称:</span>
            <el-input size="small" v-model="term1" clearable></el-input><br>
            <span class="popTitle">解释:</span>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="annotate" clearable></el-input>
            <div style="text-align:center;margin-top:10px;">
                <el-button @click="bookPopBox = false;addBox = false;">取消</el-button>
                <el-button type="success" @click="addBook">保存</el-button>
            </div>
        </div>
       </div>
  </div>
</template>
<script>
export default {
  name: 'book',
  data () {
      return {
          term: '',
          pageNum: 1,
          pageSize: 10,
          total: 100,
          bookPopBox: false,
          term1: '',
          annotate: '',
          addBox: false,
          tableData: [
              {
                  term: 'lklkk',
                  annotate: 'kjiuuguyguguyuyfuyfuyffufyuyfu'
              },
              {
                  term: 'lklkk',
                  annotate: 'kjiuuguyguguyuyfuyfuyffufyuyfu'
              }
          ]
      }
  },
  methods: {
     searchBook(){
         this.$axios.post('/test/test/testToken.php', {
            term: this.term,
            pageNum: this.pageNum,
            pageSize: this.pageSize 
        }).then(data => {
            console.log(data)
        })
     },
     output(){

     },
     addTerm(){
         this.bookPopBox = true;
         this.term1 = '';
         this.annotate = '';
         this.addBox = true;
     },
     handleEdit(value1,value2){
         this.bookPopBox = true;
         console.log(value1);
         console.log(value2.term);
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
  }
</style>


