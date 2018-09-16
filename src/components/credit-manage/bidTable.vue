<template>
  <div class="bidTable">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><icon name="cubes"></icon> 总标</span>
        <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userNameTotal" clearable></el-input>
            创建时间
            <el-date-picker v-model="beginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="endTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            借款类型
            <el-select size="small" v-model="state" clearable placeholder="请选择">
                <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchBidTotal">查询</el-button>
          </div>
        </div>
        <div style="margin-top:10px;">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="totalAdd=1;bidPopBox=true;">新增</el-button>
        </div>
        <div class="table" style="margin-top:10px;">
          <el-table :data="tableData2" border style="width:100%;" highlight-current-row>
              <el-table-column prop="bidName" label="标的名称" align="center"></el-table-column>
              <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
              <el-table-column prop="projectCycle" label="项目周期" align="center"></el-table-column>
              <el-table-column prop="bidAllAmount" label="项目金额" align="center"></el-table-column>
              <el-table-column prop="borrowerType" label="借款类型" align="center"></el-table-column>
              <el-table-column prop="minInvestMoney" label="起投金额" align="center"></el-table-column>
              <el-table-column prop="maxInvestMoney" label="最高投资额" align="center"></el-table-column>
              <el-table-column prop="annualRate" label="年化率" align="center"></el-table-column>
              <el-table-column prop="addAateOfOnterest" label="加息利率" align="center"></el-table-column>
              <el-table-column prop="lastRepaymentTime" label="最晚还款时间" align="center"></el-table-column>
              <el-table-column prop="publishTime" label="发布时间" align="center"></el-table-column>
              <el-table-column prop="bidState" label="标的状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center" min-width="150">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">撤销</el-button>
              </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination background 
            @size-change="searchUser"
            @current-change="searchUser"
            :current-page="pageNum1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total1">
          </el-pagination>
        </div> 
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><icon name="cube"></icon> 分标</span>
        <div class="searchTerm">
          <div>
            用户名
            <el-input size="small" v-model="userName" clearable></el-input>
            最晚还款时间
            <el-date-picker v-model="repaymentBeginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="repaymentEndTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            发布时间
            <el-date-picker v-model="publishBeginTime" type="date" placeholder="起始时间" value-format="timestamp" style="margin-right:0;"></el-date-picker>--
            <el-date-picker v-model="publishEndTime" type="date" placeholder="结束时间" value-format="timestamp"></el-date-picker>
            借款类型
            <el-select size="small" v-model="bidId" clearable placeholder="请选择">
                <el-option v-for="item in bidTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" icon="el-icon-search" type="success" @click="searchBid">查询</el-button>
          </div>
        </div>
        <div style="margin-top:10px;">
            <el-button size="small" type="primary" icon="el-icon-download">导出</el-button>
        </div>
        <div class="table" style="margin-top:10px;">
          <el-table :data="tableData" border style="width:100%;" highlight-current-row>
              <el-table-column prop="bidName" label="标的名称" align="center">
                <template slot-scope="scope">
                  <span style="color:#409eff;cursor:pointer;" @click="getDetail(scope.row.Id)">{{ scope.row.bidName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
              <el-table-column prop="projectCycle" label="项目周期" align="center"></el-table-column>
              <el-table-column prop="bidAllAmount" label="项目金额" align="center"></el-table-column>
              <el-table-column prop="borrowerType" label="借款类型" align="center"></el-table-column>
              <el-table-column prop="minInvestMoney" label="起投金额" align="center"></el-table-column>
              <el-table-column prop="maxInvestMoney" label="最高投资额" align="center"></el-table-column>
              <el-table-column prop="annualRate" label="年化率" align="center"></el-table-column>
              <el-table-column prop="addAateOfOnterest" label="加息利率" align="center"></el-table-column>
              <el-table-column prop="lastRepaymentTime" label="最晚还款时间" align="center"></el-table-column>
              <el-table-column prop="publishTime" label="发布时间" align="center"></el-table-column>
              <el-table-column prop="bidState" label="标的状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">投资</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination background 
            @size-change="searchBid"
            @current-change="searchBid"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div> 
      </el-tab-pane>
    </el-tabs>
     <div class="popBox" v-if="bidPopBox">
        <div class="box-body" v-bind:class="{'newWidth':totalAdd==1||totalAdd==2}">
          <div v-if="totalAdd==0">
            <span style="float:right;cursor:pointer;color:#409eff;" @click="bidPopBox=false;"><icon name="times-circle"></icon></span>
            <p style="text-align:center;">投标记录</p>
            <p>共{{ number }}个投标,已投{{ alreadyInvestment }}元,还需{{ restInvestment }}元满标</p>
            <el-table :data="tableData3" border style="width: 100%">
              <el-table-column type="index" label="序号" align="center"></el-table-column>
              <el-table-column prop="userName" label="投标人"></el-table-column>
              <el-table-column prop="annualRate" label="年利率"></el-table-column>
              <el-table-column prop="totalInvestmentMoney" label="投标总额"></el-table-column>
              <el-table-column prop="investmentTime" label="投标时间"></el-table-column>
            </el-table>
          </div>
          <div v-else-if="totalAdd==1">
            <span style="float:right;cursor:pointer;color:#409eff;" @click="bidPopBox=false;"><icon name="times-circle"></icon></span>
            <div class="catchEye">用户名</div>
            <span class="popTitle">用户名:</span>
            <el-input size="small" v-model="userName1" clearable></el-input>
            <div class="catchEye">标的属性</div>
            <span class="popTitle">借款类型: </span>
            <el-select size="small" v-model="state1" clearable placeholder="请选择">
              <el-option v-for="item in bidTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle" style="width:70px;">标签1: </span>
            <el-input size="small" v-model="label1" clearable></el-input>
            <!-- <el-select size="small" v-model="state1" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <span style="display:inline-block;width:50px;"></span>
            <span class="popTitle" style="width:70px;">标签2: </span>
            <el-input size="small" v-model="label2" clearable></el-input><br>
            <!-- <el-select size="small" v-model="state1" clearable placeholder="请选择">
              <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select><br> -->
            <span class="popTitle">角标: </span>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle" style="width:70px;">还款方式: </span>
            <el-select size="small" v-model="repaymentWay" clearable placeholder="请选择">
              <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select><br>
            <div class="catchEye">金额数据</div>
            <div v-if="state1==1||state1==2">
              <span class="popTitle">项目金额: </span>
              <el-input size="small" v-model="bidAllAmount" clearable></el-input>元
              <span style="display:inline-block;width:100px;"></span>
              <span class="popTitle">项目周期: </span>
              <el-radio v-model="radio" label="1">按天计算</el-radio>
              <el-radio v-model="radio" label="2">按月计算</el-radio>
              <el-input size="small" v-model="bidCycle" clearable></el-input><span v-if="radio==1">天</span><span v-if="radio==2">月</span><br>
            </div>
            <span class="popTitle">年利率: </span>
            <el-input size="small" v-model="annualRate" clearable></el-input>%
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle">加息利率: </span>
            <el-input size="small" v-model="addAateOfOnterest" clearable></el-input>%
            <div class="catchEye">投标限制</div>
            <div style="display:inline-block" v-if="state1==1||state1==2">
              <span class="popTitle">招标天数: </span>
              <el-input size="small" v-model="inviteTendersTime" clearable></el-input>天
              <span style="display:inline-block;width:100px;"></span>
            </div>
            <span class="popTitle">起投金额: </span>
            <el-input size="small" v-model="minInvestMoney" clearable></el-input>元<br>
            <div v-if="state1==1||state1==2">
              <span class="popTitle">最高投资额: </span>
              <el-input size="small" v-model="maxInvestMoney" clearable></el-input>元
            </div>
            <div class="catchEye" v-if="state1==1||state1==2">标的描述</div>
            <div v-if="state1==1">
              <span class="popTitle">项目介绍: </span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="bidDescribe"></el-input><br>
              <span class="popTitle">风控详情: </span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="riskManagementDetails"></el-input><br>
              <span class="popTitle">还款来源: </span>
              <el-input size="small" style="width:500px;" v-model="repaymentSource" clearable></el-input>
            </div>
            <div v-if="state1==2">
              <span class="popTitle">标的名称: </span>
              <el-input size="small" v-model="bidName" clearable></el-input>
              <span style="width:100px;display:inline-block;"></span>
              <span class="popTitle">借款企业: </span>
              <el-input size="small" v-model="borrowAlias" clearable></el-input><br>
              <span class="popTitle">票面金额: </span>
              <el-input size="small" v-model="ticketAmount" clearable></el-input>
              <span style="width:100px;display:inline-block;"></span>
              <span class="popTitle">承兑银行: </span>
              <el-input size="small" v-model="bankName" clearable></el-input><br>
              <span class="popTitle">承兑票号: </span>
              <el-input size="small" v-model="ticketNum" clearable></el-input>
            </div>
            <div v-if="state1==2">
              <div class="catchEye">资金保障</div>
              <span class="popTitle">资金保障: </span>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="bidDescribe"></el-input><br>
              <div class="catchEye">还款来源</div>
              <span class="popTitle">还款来源: </span>
              <el-input size="small" style="width:500px;" v-model="repaymentSource" clearable></el-input>
            </div>
            <div class="catchEye" v-if="state1==1">协议材料</div>
            <div class="catchEye" v-if="state1==2">保险协议</div>
            <el-upload v-if="state1==1||state1==2"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">上传材料</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="catchEye" v-if="state1==1">借款材料</div>
            <div class="catchEye" v-if="state1==2">相关协议</div>
            <el-upload v-if="state1==1||state1==2"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">上传材料</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div style="text-align:center;margin-top:10px;">
            <el-button @click="bidPopBox=false;">取消</el-button>
            <el-button type="success" @click="totalAdd=2">保存</el-button>
            </div>
          </div>
          <div v-else-if="totalAdd==2">
            <span style="float:right;cursor:pointer;color:#409eff;" @click="bidPopBox=false;"><icon name="times-circle"></icon></span>
            <div class="catchEye">用户名</div>
            <span class="popTitle">用户名:</span>
            <!-- <el-input size="small" v-model="userName1" clearable></el-input> -->
            {{userName1}}
            <div class="catchEye">标的属性</div>
            <span class="popTitle">借款类型: </span>
            {{state1}}
            <!-- <el-select size="small" v-model="state1" clearable placeholder="请选择">
              <el-option v-for="item in bidTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select> -->
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle" style="width:70px;">标签1: </span>
            {{label1}}
            <!-- <el-input size="small" v-model="label1" clearable></el-input> -->
            <span style="display:inline-block;width:50px;"></span>
            <span class="popTitle" style="width:70px;">标签2: </span>
            {{label2}}<br>
            <!-- <el-input size="small" v-model="label2" clearable></el-input><br> -->
            <span class="popTitle">角标: </span>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle" style="width:70px;">还款方式: </span>
            {{repaymentWay}}<br>
            <!-- <el-select size="small" v-model="repaymentWay" clearable placeholder="请选择">
              <el-option v-for="item in payTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select><br> -->
            <div class="catchEye">金额数据</div>
            <div v-if="state1==1||state1==2">
              <span class="popTitle">项目金额: </span>
              {{bidAllAmount}}元
              <!-- <el-input size="small" v-model="bidAllAmount" clearable></el-input>元 -->
              <span style="display:inline-block;width:100px;"></span>
              <span class="popTitle">项目周期: </span>
              {{bidCycle}}<span v-if="radio==1">天</span><span v-if="radio==2">月</span><br>
              <!-- <el-radio v-model="radio" label="1">按天计算</el-radio>
              <el-radio v-model="radio" label="2">按月计算</el-radio>
              <el-input size="small" v-model="bidCycle" clearable></el-input><span v-if="radio==1">天</span><span v-if="radio==2">月</span><br> -->
            </div>
            <span class="popTitle">年利率: </span>
            {{annualRate}}%
            <!-- <el-input size="small" v-model="annualRate" clearable></el-input>% -->
            <span style="display:inline-block;width:100px;"></span>
            <span class="popTitle">加息利率: </span>
            {{addAateOfOnterest}}%
            <!-- <el-input size="small" v-model="addAateOfOnterest" clearable></el-input>% -->
            <div class="catchEye">投标限制</div>
            <div style="display:inline-block" v-if="state1==1||state1==2">
              <span class="popTitle">招标天数: </span>
              {{inviteTendersTime}}天
              <!-- <el-input size="small" v-model="inviteTendersTime" clearable></el-input>天 -->
              <span style="display:inline-block;width:100px;"></span>
            </div>
            <span class="popTitle">起投金额: </span>
            {{minInvestMoney}}元<br>
            <!-- <el-input size="small" v-model="minInvestMoney" clearable></el-input>元<br> -->
            <div v-if="state1==1||state1==2">
              <span class="popTitle">最高投资额: </span>
              {{maxInvestMoney}}元
              <!-- <el-input size="small" v-model="maxInvestMoney" clearable></el-input>元 -->
            </div>
            <div class="catchEye" v-if="state1==1||state1==2">标的描述</div>
            <div v-if="state1==1">
              <span class="popTitle">项目介绍: </span>
              {{bidDescribe}}<br>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="bidDescribe"></el-input><br> -->
              <span class="popTitle">风控详情: </span>
              {{riskManagementDetails}}<br>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="riskManagementDetails"></el-input><br> -->
              <span class="popTitle">还款来源: </span>
              {{repaymentSource}}
              <!-- <el-input size="small" style="width:500px;" v-model="repaymentSource" clearable></el-input> -->
            </div>
            <div v-if="state1==2">
              <span class="popTitle">标的名称: </span>
              {{bidName}}
              <!-- <el-input size="small" v-model="bidName" clearable></el-input> -->
              <span style="width:100px;display:inline-block;"></span>
              <span class="popTitle">借款企业: </span>
              {{borrowAlias}}<br>
              <!-- <el-input size="small" v-model="borrowAlias" clearable></el-input><br> -->
              <span class="popTitle">票面金额: </span>
              {{ticketAmount}}
              <!-- <el-input size="small" v-model="ticketAmount" clearable></el-input> -->
              <span style="width:100px;display:inline-block;"></span>
              <span class="popTitle">承兑银行: </span>
              {{bankName}}<br>
              <!-- <el-input size="small" v-model="bankName" clearable></el-input><br> -->
              <span class="popTitle">承兑票号: </span>
              {{ticketNum}}
              <!-- <el-input size="small" v-model="ticketNum" clearable></el-input> -->
            </div>
            <div v-if="state1==2">
              <div class="catchEye">资金保障</div>
              <span class="popTitle">资金保障: </span>
              {{bidDescribe}}<br>
              <!-- <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="bidDescribe"></el-input><br> -->
              <div class="catchEye">还款来源</div>
              <span class="popTitle">还款来源: </span>
              {{repaymentSource}}
              <!-- <el-input size="small" style="width:500px;" v-model="repaymentSource" clearable></el-input> -->
            </div>
            <div class="catchEye" v-if="state1==1">协议材料</div>
            <div class="catchEye" v-if="state1==2">保险协议</div>
            <el-upload v-if="state1==1||state1==2"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">上传材料</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="catchEye" v-if="state1==1">借款材料</div>
            <div class="catchEye" v-if="state1==2">相关协议</div>
            <el-upload v-if="state1==1||state1==2"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">上传材料</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div v-if="verify" style="margin-top:10px;">
              <div class="catchEye">标的操作</div>
              <el-radio v-model="radio" label="1">分标</el-radio><el-input-number size="small" v-model="number"></el-input-number>个
              <span style="margin:20px;margin-right:100px;">平均每个标XXX元</span>
              <el-radio v-model="radio" label="1">定时上标</el-radio>
              <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1">
              </el-date-picker>
              <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期">
              </el-date-picker>
              <el-time-picker v-model="value2" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点">
              </el-time-picker> -->
            </div>
            <div style="text-align:center;margin-top:10px;">
            <el-button @click="bidPopBox=false;">修改</el-button>
            <el-button type="success" @click="saveBid">保存</el-button>
            </div>
          </div>
          <div v-else>
            <span class="popTitle">手机号:</span>
            <el-input size="small" v-model="phoneNum" clearable></el-input><br>
            <span class="popTitle">购买金额:</span>
            <el-input size="small" v-model="phoneNum" clearable></el-input><br>
            <span>可用余额(元):</span>
            <span>可用余额(元):</span>
            <div style="text-align:center;margin-top:10px;">
              <el-button @click="bidPopBox=false;">取消</el-button>
              <el-button type="success" @click="totalAdd=2">保存</el-button>
            </div>
          </div>
        </div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'bidTable',
  data () {
      return {
          userName: '',
          repaymentBeginTime: '',
          repaymentEndTime: '',
          publishBeginTime: '',
          publishEndTime: '',
          bidId: '',
          pageNum: 1,
          total: 100,
          pageSize: 20,
          bidTypes: [
              {
                label: '月盈宝',
                value: '1'
              },
              {
                label: '票兑宝',
                value: '2'
              },
              {
                label: '多利宝',
                value: '3'
              }
          ],
          states: [
            {
              label: '待审核',
              value: '0'
            },
            {
              label: '已审核',
              value: '1'
            }
          ],
          number: 2,
          alreadyInvestment: 3000,
          restInvestment: 18000,
          bidPopBox: false,
          userNameTotal: '',
          beginTime: '',
          endTime: '',
          state: '',
          pageNum1: 1,
          total1: 100,
          pageSize1: 10,
          totalAdd: 0,
          userName1: '',
          state1: '1',
          imageUrl: '',
          label1: '',
          label2: '',
          repaymentWay: '',
          bidAllAmount: '',
          radio: '1',
          bidCycle: '',
          annualRate: '',
          addAateOfOnterest: '',
          inviteTendersTime: '',
          minInvestMoney: '',
          maxInvestMoney: '',
          bidDescribe: '',
          riskManagementDetails: '',
          repaymentSource: '',
          fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          bidName: '',
          borrowAlias: '',
          ticketAmount: '',
          bankName: '',
          ticketNum: '',
          verify: '',
          number: '1',
          time: '',
          pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
          },
          payTypes: [
            {
              label: '到期还本付息',
              value: '1'
            },
            {
              label: '到月付息,到期还本',
              value: '2'
            },
            {
              label: '当日计息,次日结息',
              value: '3'
            }
          ],
          tableData: [
              {
                  bidName: 'poopo',
                  userName: 'jkkk',
                  projectCycle: '23days',
                  bidAllAmount: 'hjj',
                  borrowerType: 'top',
                  minInvestMoney: 'kekk',
                  maxInvestMoney: 'bvsnn',
                  annualRate: '12',
                  addAateOfOnterest: '0.25',
                  lastRepaymentTime: 'uyttrt',
                  publishTime: '2015-6-8',
                  bidState: 'ok'
              },
              {
                  bidName: 'poopo',
                  userName: 'jkkk',
                  projectCycle: '23days',
                  bidAllAmount: 'hjj',
                  borrowerType: 'top',
                  minInvestMoney: 'kekk',
                  maxInvestMoney: 'bvsnn',
                  annualRate: '12',
                  addAateOfOnterest: '0.25',
                  lastRepaymentTime: 'uyttrt',
                  publishTime: '2015-6-8',
                  bidState: 'ok'
              }
          ],
          tableData2: [
              {
                  bidName: 'poopo',
                  userName: 'jkkk',
                  projectCycle: '23days',
                  bidAllAmount: 'hjj',
                  borrowerType: 'top',
                  minInvestMoney: 'kekk',
                  maxInvestMoney: 'bvsnn',
                  annualRate: '12',
                  addAateOfOnterest: '0.25',
                  lastRepaymentTime: 'uyttrt',
                  publishTime: '2015-6-8',
                  bidState: 'ok'
              },
              {
                  bidName: 'poopo',
                  userName: 'jkkk',
                  projectCycle: '23days',
                  bidAllAmount: 'hjj',
                  borrowerType: 'top',
                  minInvestMoney: 'kekk',
                  maxInvestMoney: 'bvsnn',
                  annualRate: '12',
                  addAateOfOnterest: '0.25',
                  lastRepaymentTime: 'uyttrt',
                  publishTime: '2015-6-8',
                  bidState: 'ok'
              }
          ],
          tableData3: [
            {
              userName: 'jack',
              annualRate: '18%',
              totalInvestmentMoney: 5000,
              investmentTime: '2015-9-8'
            },
            {
              userName: 'jack',
              annualRate: '18%',
              totalInvestmentMoney: 5000,
              investmentTime: '2015-9-8'
            }
          ]
      }
  },
  methods: {
    getDetail (value) {
      this.bidPopBox = true;
    },
    searchBidTotal () {
      this.$axios.post('/test/test/testToken.php', {
        userName: this.userNameTotal,
        beginTime: this.beginTime,
        endTime: this.endTime,
        state: this.state,
        pageNum: this.pageNum1,
        pageSize: this.pageSize1
      }).then(data => {
        console.log(data)
      })
    },
    searchBid () {
      this.$axios.post('/test/test/testToken.php', {
        userName: this.userName,
        repaymentBeginTime: this.repaymentBeginTime,
        repaymentEndTime: this.repaymentEndTime,
        publishBeginTime: this.publishBeginTime,
        publishEndTime: this.publishEndTime,
        bidId: this.bidId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(data => {
        console.log(data)
      })
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleEdit(value1,value2){
      this.bidPopBox = true;
      this.verify = true;
      this.totalAdd = 2;
    }
  }
}
</script>
<style scoped>
  .newWidth{
    width: 60%;
    margin-top: 5%;
    max-height: 800px;
    overflow-y: auto;
  }
  .catchEye{
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    padding-left: 10px;
    border-left: 5px solid #50bfff;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .popBox .el-input{
    width: 200px;
  }
  .popBox .el-select{
    width: 200px;
  }
  /* .popTitle{
    width: 80px;
  } */
  .el-textarea{
    display: inline-block;
    width: 500px;
    margin-bottom: 10px;
    vertical-align: middle;
  }
  .avatar-uploader{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    line-height: 50px;
    text-align: center;
  }
  .avatar-uploader:hover{
    border-color: #409EFF;
  }
</style>
