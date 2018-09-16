<template>
  <div class="content">
      <div class="searchTerm">
          <div>
            类型
            <el-select size="small" v-model="state" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchContent">查询</el-button>
          </div>
      </div>
      <div style="margin-top:10px;">
          <el-button size="small" type="primary" icon="el-icon-download" @click="addContent">新增</el-button>
      </div>
      <div class="table" style="margin-top:10px;">
        <el-table :data="tableData" border style="width:100%;" highlight-current-row>
            <el-table-column prop="noticeName" label="标题" align="center"></el-table-column>
            <el-table-column prop="noticeType" label="类型" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center"></el-table-column>
            <el-table-column prop="summary" label="摘要" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.summary }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.summary }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center" min-width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="showDetail(scope.$index, scope.row)">详情</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button type="primary" size="mini" @click="contentPopBox=true;undo=true;">撤销</el-button>
                <el-button type="primary" size="mini" @click="contentPopBox=true;trash=true;">删除</el-button>
              </template>
            </el-table-column>
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
      <div class="popBox" v-if="contentPopBox">
        <div class="box-body" v-bind:class="{'newWidth': operation }">
            <div v-if="trash||undo">
                <p style="text-align:center;">提示</p>
                <p v-if="trash" style="text-align:center;"><span style="color:red;"><icon name="trash"></icon></span>确定删除该条记录?</p>
                <p v-if="undo" style="text-align:center;"><span style="color:red;"><icon name="undo"></icon></span>确定撤销该条记录?</p>
                <div style="text-align:center;">
                    <el-button @click="contentPopBox = false;">取消</el-button>
                    <el-button type="success" @click="sure">确定</el-button>
                </div>
            </div>
            <div v-if="operation==1">
                <span style="float:right;cursor:pointer;color:#409eff;" @click="contentPopBox=false;"><icon name="times-circle"></icon></span>
                <span class="leftTitle">类型:</span>
                <el-select size="small" v-model="type" clearable placeholder="请选择">
                    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
              <span class="leftTitle" style="margin-left:40px;">展示端:</span>
              <el-select size="small" v-model="device" clearable placeholder="请选择">
                    <el-option v-for="item in devices" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
              </el-select><br>
              <span class="leftTitle">App名称:</span>
              <el-select size="small" v-model="bag" clearable placeholder="请选择">
                <el-option v-for="item in bags" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <span class="leftTitle" style="margin-left:40px;">标题:</span>
              <el-input size="small" v-model="title" clearable></el-input><br>
              <span class="leftTitle">摘要:</span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="summary"></el-input><br>
              <span class="leftTitle">图片:</span>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload><br>
             <span class="leftTitle">内容:</span>
             <vue-editor id="editor" useCustomImageHandler  @imageAdded="handleImageAdded" v-model="content"></vue-editor>
             <div style="text-align:center;margin-top:10px;">
                <el-button @click="contentPopBox = false;">保存</el-button>
                <el-button type="success" @click="sure">预览</el-button>
             </div>
            </div>
            <div v-if="operation==2">
                <span style="float:right;cursor:pointer;color:#409eff;" @click="contentPopBox=false;"><icon name="times-circle"></icon></span>
                <span class="leftTitle">类型:</span>{{type}}
                <span class="leftTitle" style="margin-left:40px;">展示端:</span>{{device}}<br>
                <span class="leftTitle">App名称:</span>{{bag}}
                <span class="leftTitle" style="margin-left:40px;">标题:</span>{{title}}
                <span class="leftTitle">摘要:</span><div style="display:inline-block;width:500px;vertical-align:middle;">{{summary}}</div><br>
                <span class="leftTitle">图片:</span><img :src="imageUrl"/><br>
                <span class="leftTitle">内容:</span><div style="display:inline-block;width:500px;vertical-align:middle;">{{content}}</div><br>
                <div style="text-align:center;margin-top:10px;">
                    <el-button @click="contentPopBox = false;">关闭</el-button>
                    <el-button type="success" @click="sure">修改</el-button>
                </div> 
            </div>
            <div v-if="operation==3">
                <span style="cursor:pointer;color:#409eff;position:absolute;right:20px;top:20px;" @click="contentPopBox=false;"><icon name="times-circle"></icon></span>
                <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="列表展示" name="first">
                        <div style="display:flex;background-color:rgba(0,0,0,0.5);padding:30px;">
                            <div style="width:30%;height:600px;">
                                <div style="background-color:white;height:100%;width:90%;padding:40px 10px;border-radius:5px;">
                                    <div style="border: 1px solid black;height:100%;">
                                        <img :src="imageUrl" alt="图片不见了">
                                        <p>{{title}}</p>
                                        <p>{{summary}}</p>
                                    </div>
                                </div>
                            </div>
                            <div style="width:70%;">
                                <div style="margin-top:100px;margin-left:100px;">
                                    <div style="height:300px;background-color:white;padding:10px;border-radius:5px;">
                                        <p>{{type}}</p>
                                        <div style="border:1px solid black;">
                                            <p>{{title}}</p>
                                            <p>{{summary}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center;margin-top:10px;"><el-button type="success">发布</el-button></div>
                    </el-tab-pane>
                    <el-tab-pane label="正文展示" name="second">
                        <div style="display:flex;background-color:rgba(0,0,0,0.5);padding:30px;">
                            <div style="width:30%;height:600px;">
                                <div style="background-color:white;height:100%;width:90%;padding:40px 10px;border-radius:5px;">
                                    <div style="border: 1px solid black;height:100%;">
                                        <p>{{title}}</p>
                                        <span>2018-5-8</span><span style="float:right;">来源:纵合金融</span>
                                        <p>{{summary}}</p>
                                        <img :src="imageUrl" alt="图片不见了"/>
                                        <p id="content"></p>
                                    </div>
                                </div>
                            </div>
                            <div style="width:70%;">
                                <div style="margin-top:100px;margin-left:100px;">
                                    <div style="height:300px;background-color:white;padding:10px;border-radius:5px;">
                                        <div style="border:1px solid black;">
                                            <p style="text-align:center;">{{title}}</p>
                                            <span>来源:纵合金融</span><span style="float:right;">发布时间:2018-5-8</span>
                                            <img :src="imageUrl" alt="图片不见了"/>
                                            <p>{{summary}}</p>
                                            <p id="content1"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align:center;margin-top:10px;"><el-button type="success">发布</el-button></div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'content',
  data(){
      return {
          state: '',
          pageNum: 1,
          pageSize: 10,
          total: 100,
          states: [
              {
                  label: '权威报道',
                  value: '1'
              },
              {
                  label: '平台公告(官网)',
                  value: '2'
              },
              {
                  label: '平台公告(App)',
                  value: '3'
              },
              {
                  label: '平台公告(全部)',
                  value: '4'
              }
          ],
          contentPopBox: false,
          trash: false,
          undo: false,
          operation: 1,
          imageUrl: '',
          content: 'this is a simple demo',                // 编辑器的内容
          type: '',
          types: [
              {
                  label: '权威报道',
                  value: '1'
              },
              {
                  label: '平台公告',
                  value: '2'
              }
          ],
          device: '',
          devices: [
              {
                  label: 'App',
                  value: '1'
              },
              {
                  label: '官网',
                  value: '2'
              },
              {
                  label: '全部',
                  value: '3'
              }
          ],
          bag: '',
          bags: [
              {
                  label: 'bag1',
                  value: '1'
              },
              {
                  label: 'bag2',
                  value: '2'
              }
          ],
          title: '',
          summary: '',
          activeName: 'first',
          tableData: [
              {
                  noticeName: 'yuiio',
                  noticeType: 'ytyty',
                  state: 'ooop',
                  summary: 'jjhajhuhiuuguyg',
                  createTime: '2018-4-9'
              },
              {
                  noticeName: 'yuiio',
                  noticeType: 'ytyty',
                  state: 'ooop',
                  summary: 'jjhajhuhiuuguyg',
                  createTime: '2018-4-9'
              }
          ]
      }
  },
  methods: {
      searchContent(){
          this.$axios.post('/test/test/testToken.php', {
            state: this.state,
            pageNum: this.pageNum,
            pageSize: this.pageSize 
        }).then(data => {
            console.log(data)
        })
      },
      sure(){
        //   this.contentPopBox = false;
        this.operation = 3;
      },
      handleClick(){
          if(this.activeName == 'second'){
            var text = document.getElementById('content');
            var text1 = document.getElementById('content1');
            text.innerHTML = this.content;
            text1.innerHTML = this.content;
          }
      },
      handleEdit(value1,value2){
          this.contentPopBox = true;
          this.operation = 1;
          this.type = value2.type;
          this.device = value2.device;
          this.bag = value2.bag;
          this.title = value2.title;
          this.summary = value2.summary;
          this.imageUrl = value2.imageUrl;
          this.content = value2.content;
      },
      handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    addContent(){
        this.contentPopBox = true;
        this.operation = 1;
        this.type = '';
        this.device = '';
        this.bag = '';
        this.title = '';
        this.summary = '';
        this.imageUrl = '';
        this.content = '';
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData();
        formData.append('image', file)

        axios({
          url: 'https://fakeapi.yoursite.com/images',
          method: 'POST',
          data: formData
        })
        .then((result) => {
          let url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
      }
  },
  components: {
      VueEditor 
  }
}
</script>
<style scoped>
    .newWidth{
        width: 80%;
        margin-top: 5%;
    }
    .avatar-uploader{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    line-height: 150px;
    text-align: center;
    margin-bottom: 10px;
  }
  .avatar-uploader:hover{
    border-color: #409EFF;
  }
  .leftTitle{
      display: inline-block;
      width: 70px;
  }
  .popBox .el-input{
      width: 200px;
  }
  .popBox .el-select{
      width: 200px;
  }
  .el-textarea{
      width: 500px;
      margin-bottom: 10px;
      vertical-align: top;
  }
  .quillWrapper{
      width: 80%;
      display: inline-block;
      vertical-align: top;
  }
</style>


