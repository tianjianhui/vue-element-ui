<template>
  <div class="addRole">
       <div>
            角色名称
            <el-input size="small" v-model="role" clearable></el-input>
       </div>
       <div class="addRole-body">
           <div class="left">
               菜单权限
               <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">用户管理</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city" class="checkBox">{{city}}</el-checkbox>
                </el-checkbox-group>
               </div>
           </div>
           <div class="right">
               操作权限
               <div></div>
           </div>
       </div>
  </div>
</template>
<style scoped>
    .el-input{
    width: 150px;
    margin-right: 20px;
  }
  .addRole-body{
      display: flex;
      margin-top: 20px;
  }
  .left{
      width: 15%;
      margin-right: 30px;
      border: 2px solid lightskyblue;
      border-radius: 5px;
      box-shadow: 5px 5px 10px #cccccc;
      height: 400px;
      padding: 10px;
  }
  .right{
      width: 60%;
      border: 2px solid lightskyblue;
      border-radius: 5px;
      box-shadow: 5px 5px 10px #cccccc;
      height: 400px;
      padding: 10px;
  }
  .checkBox{
      display: block;
      margin-left: 20px;
  }
</style>
<script>
const cityOptions = ['用户列表', '员工列表', '角色列表'];
export default {
  name: 'addRole',
  data() {
        return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
        };
    },
    methods: {
        handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
}
</script>


