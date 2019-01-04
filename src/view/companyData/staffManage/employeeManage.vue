<template>
	<el-col :span="24" class="base-contain">
		<el-col :span="12">
			<el-button type="primary" @click="newEmployee">新增员工</el-button>
			<el-button type="success" @click="degreeCharts">员工学历分布</el-button>
			<el-button type="warning" @click="ageCharts">员工年龄分布</el-button>
		</el-col>
		<el-col :span="12">
			<el-form>
				<el-form-item  >
					<el-select v-model="value" placeholder="--请选择部门--" style="width:60%;margin-left:50px;" @change="getEmployeesByDep">
						<el-option v-for="item in departments" :key="item.departmentSid" :label="item.departmentName" :value="item.departmentNo">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>						
		</el-col>
		<!-- 列表 -->
		<el-table :data="employeeArr" border highlight-current-row style="width: 100%;margin-top:20px;">
			<el-table-column prop="employeeName" label="姓名" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeeWorkno" label="工号" align="center" sortable>
			</el-table-column>	
			<el-table-column prop="sex" label="性别" align="center" sortable width="120">
			</el-table-column>
			<el-table-column prop="departmentList" label="所属部门(部门职位)" align="center" sortable width="220">
				<template scope="scope">
	                <span class="list-inline" v-for='d in scope.row.departmentList'>{{d.departmentName}}({{d.employeePost}})</span>
	            </template>					
			</el-table-column>
			<el-table-column prop="employeePhone" label="联系电话" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeeHiredate" label="入职日期" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeePosition" label="职位" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeeState" label="状态" align="center" width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template scope="scope">
					<el-button type="success" size="small" style="padding: 3px 6px;"  @click="getEmpByWorkNo(scope.row.employeeWorkno,'更多')"><span class="glyphicon glyphicon-circle-arrow-right" title="更多"></span></el-button>
					<el-button type="primary" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-edit" title="编辑" @click="getEmpByWorkNo(scope.row.employeeWorkno,'编辑')"></span></el-button>
					<el-button type="danger" size="small" style="padding: 3px 6px;" @click="delEmployee(scope.row.employeeWorkno)"><span class="glyphicon glyphicon-remove" title="删除"></span></el-button>
				</template>
			</el-table-column>														
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="totalItems" style="float:right;">
			</el-pagination>
		</el-col>	
		<!-- 查看更多	 -->
		<el-dialog title="员工详细信息" :visible.sync="moreVisible" width="25%">
			<el-form :model="moreMenu" label-width="80px"  ref="moreMenu">
				<el-form-item label="员工姓名" prop="employeeName">
					<el-input v-model="moreMenu.employeeName" auto-complete="off"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="员工工号" prop="name">
					<el-input v-model="moreMenu.employeeWorkno" auto-complete="off"  :disabled="true"></el-input>
				</el-form-item>	
				<el-form-item label="性别" prop="sex">
					<el-input v-model="moreMenu.sex" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>							
				<el-form-item label="所属部门" prop="departmentList">
					<el-input v-for='d in moreMenu.departmentList' v-model="d.departmentName" :min="0" :max="200" :disabled="true"></el-input>
					<!-- <template scope="scope">
	                	<span class="list-inline" v-for='d in moreMenu.departmentList'>{{d.departmentName}}({{d.employeePost}})</span>
	            	</template>	 -->				
				</el-form-item>
				<el-form-item label="出生日期" prop="birthdate">
					<el-input  v-model="moreMenu.birthdate" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="identityCardNo">
					<el-input v-model="moreMenu.identityCardNo" auto-complete="off"  :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="文化程度" prop="highestEducation">
					<el-input v-model="moreMenu.highestEducation" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="employeePhone">
					<el-input v-model="moreMenu.employeePhone" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicsStatus">
					<el-input v-model="moreMenu.politicsStatus" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="QQ号" prop="employeeQQ">
					<el-input v-model="moreMenu.employeeQQ" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="微信号" prop="employeeWechart">
					<el-input v-model="moreMenu.employeeWechart" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="联系地址" prop="employeeAddress">
					<el-input v-model="moreMenu.employeeAddress" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="employeeMail">
					<el-input v-model="moreMenu.employeeMail" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="入职日期" prop="employeeHiredate">
					<el-input v-model="moreMenu.employeeHiredate" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="离职日期" prop="employeeDeparturedate" :disabled="true">
					<el-input v-model="moreMenu.employeeDeparturedate" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="职位" prop="employeePosition">
					<el-input v-model="moreMenu.employeePosition" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="在职状态" prop="employeeState">
					<el-input v-model="moreMenu.employeeState" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="moreVisible = false">关闭</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑员工信息" :visible.sync="updateVisible" width="35%">
			<el-form :model="editMenu" label-width="90px"  ref="moreMenu">
				<el-form-item label="员工姓名" prop="employeeName">
					<el-input v-model="editMenu.employeeName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="员工工号" prop="name" >
					<el-input v-model="editMenu.employeeWorkno" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>	
				<el-form-item label="性别" prop="sex">
					<el-radio v-model="editMenu.sex" label="1">男</el-radio>
					<el-radio v-model="editMenu.sex" label="0">女</el-radio>
				</el-form-item>
				<el-form-item label="身份证号" prop="identityCardNo">
					<el-input v-model="editMenu.identityCardNo" auto-complete="off"></el-input>
				</el-form-item>											
				<el-form-item label="出生日期" prop="birthdate">
					<el-date-picker type="date" v-model="editMenu.birthdate" style="width:100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="文化程度" prop="highestEducation">
					<el-select v-model="educationVal" placeholder="--请选择文化程度--" style="width:100%;">
						<el-option v-for="item in addMenu.dictionary.highestEducation" :key="item.index" :label="item.e_type" :value="item.e_type">
						</el-option>
					</el-select>	
				</el-form-item>
				<el-form-item label="联系电话" prop="employeePhone">
					<el-input v-model="editMenu.employeePhone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicsStatus">
					<el-select v-model="politicsVal" placeholder="--请选择政治面貌--" style="width:100%;">
						<el-option v-for="item in addMenu.dictionary.politicsStatus" :key="item.index" :label="item.p_type" :value="item.p_type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="QQ号" prop="employeeQQ">
					<el-input v-model="editMenu.employeeQQ" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="微信号" prop="employeeWechart">
					<el-input v-model="editMenu.employeeWechart" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系地址" required>
					<el-select v-model="provinceVal1" value-key="provinceCode" placeholder="--请选择省--" style="width:100%;" @change="getCities(provinceVal1.provinceCode)">
						<!-- <el-option v-for="p in editMenu.dictionary.editProvince " :key="p.provinceCode" :label="p.provinceName" :value="p">
						</el-option> -->
						<el-option v-for="p in addMenu.dictionary.newProvince " :key="p.provinceCode" :label="p.provinceName" :value="p">
						</el-option>						
					</el-select>	
					<el-select v-model="cityVal1" value-key="cityCode" placeholder="--请选择市--" style="width:100%;margin-top:20px" v-if="provinceVal1&&addMenu.dictionary.newCity" @change="getCounties(cityVal.cityCode)">
						<el-option v-for="c in addMenu.dictionary.newCity" :key="c.cityCode" :label="c.cityName" :value="c">
						</el-option>
					</el-select>	
					<el-select v-model="countyVal1" value-key="countyCode" placeholder="--请选择县--" style="width:100%;margin-top:20px" v-if="cityVal1&&addMenu.dictionary.newCounty">
						<el-option v-for="n in addMenu.dictionary.newCounty" :key="n.countyCode" :label="n.countyName" :value="n">
						</el-option>
					</el-select>
					<el-input v-model="editMenu.employeeAddress" auto-complete="off" style="width:100%;margin-top:20px" placeholder="详细地址：请填写详细地址，比如门牌号。"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="employeeMail">
					<el-input v-model="editMenu.employeeMail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="入职日期" prop="employeeHiredate">
					<el-date-picker type="date" v-model="editMenu.employeeHiredate" auto-complete="off" style="width:100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="离职日期" prop="employeeDeparturedate">
					<el-date-picker type="date" v-model="editMenu.employeeDeparturedate" auto-complete="off" style="width:100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="职位" prop="employeePosition">
					<el-input v-model="editMenu.employeePosition" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="在职状态" prop="employeeState">
					<el-radio v-model="editMenu.employeeState" label="1">在职</el-radio>
  					<el-radio v-model="editMenu.employeeState" label="0">离职</el-radio>					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="updateEmployee">编辑</el-button>
				<el-button @click.native="updateVisible = false">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="新增员工" :visible.sync="newEmpVisible" width="30%" >
			<el-form :model="addMenu" label-width="120px"  ref="addMenu" :rules="rules">
				<el-form-item label="员工姓名" prop="employeeName" >
					<el-input v-model="addMenu.employeeName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否为内部员工" prop="employeeName" >
					<el-radio v-model="addMenu.employeeType" label="1">是</el-radio>
					<el-radio v-model="addMenu.employeeType" label="0">否</el-radio>
				</el-form-item>				
				<el-form-item label="性别" prop="sex" >
					<el-radio v-model="addMenu.sex" label="1">男</el-radio>
					<el-radio v-model="addMenu.sex" label="0">女</el-radio>
				</el-form-item>	
				<el-form-item label="身份证号" prop="identityCardNo" >
					<el-input v-model="addMenu.identityCardNo" auto-complete="off"></el-input>
				</el-form-item>										
				<el-form-item label="出生日期" prop="birthdate" >
					<el-date-picker type="date" v-model="addMenu.birthdate" style="width:100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="文化程度" prop="highestEducation">
					<el-select v-model="value1" placeholder="--请选择文化程度--" style="width:100%;">
						<el-option v-for="item in addMenu.dictionary.highestEducation" :key="item.index" :label="item.e_type" :value="item.e_type">
						</el-option>
					</el-select>						
				</el-form-item>
				<el-form-item label="联系电话" prop="employeePhone" >
					<el-input v-model="addMenu.employeePhone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicsStatus">
					<el-select v-model="value2" placeholder="--请选择政治面貌--" style="width:100%;">
						<el-option v-for="item in addMenu.dictionary.politicsStatus" :key="item.index" :label="item.p_type" :value="item.p_type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="QQ号" prop="employeeQQ">
					<el-input v-model="addMenu.employeeQQ" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="微信号" prop="employeeWechart">
					<el-input v-model="addMenu.employeeWechart" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系地址" required>
					<el-select v-model="provinceVal" value-key="provinceCode" placeholder="--请选择省--" style="width:100%;" @change="getCities(provinceVal.provinceCode)">
						<el-option v-for="p in addMenu.dictionary.newProvince" :key="p.provinceCode" :label="p.provinceName" :value="p">
						</el-option>
					</el-select>	
					<el-select v-model="cityVal" value-key="cityCode" placeholder="--请选择市--" style="width:100%;margin-top:20px" v-if="provinceVal&&addMenu.dictionary.newCity !=''" @change="getCounties(cityVal.cityCode)">
						<el-option v-for="c in addMenu.dictionary.newCity" :key="c.cityCode" :label="c.cityName" :value="c">
						</el-option>
					</el-select>	
					<el-select v-model="countyVal" value-key="countyCode" placeholder="--请选择县--" style="width:100%;margin-top:20px" v-if="cityVal&&addMenu.dictionary.newCounty !=''">
						<el-option v-for="n in addMenu.dictionary.newCounty" :key="n.countyCode" :label="n.countyName" :value="n">
						</el-option>
					</el-select>
					<el-input v-model="addMenu.employeeAddress" auto-complete="off" style="width:100%;margin-top:20px" placeholder="详细地址：请填写详细地址，比如门牌号。"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="employeeMail">
					<el-input v-model="addMenu.employeeMail" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="入职日期" prop="employeeHiredate" >
					<el-date-picker type="date" v-model="addMenu.employeeHiredate" auto-complete="off" style="width:100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="职位" prop="employeePosition">
					<el-input v-model="addMenu.employeePosition" auto-complete="off"></el-input>
				</el-form-item>	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addEmployees">新增</el-button>
				<el-button @click.native="newEmpVisible = false">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="员工学历分布" :visible.sync="degreeVisible" width="50%" >
			<div id="degreeNum2" style="width: 850px;height:500px;">
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="degreeVisible = false">关闭</el-button>
			</div>	
		</el-dialog>	
		<el-dialog title="员工年龄分布" :visible.sync="ageVisible" width="50%" >
			<div id="ageNum2" style="width: 850px;height:500px;">
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="ageVisible = false">关闭</el-button>
			</div>	
		</el-dialog>			
	</el-col>
</template>

<script type="text/javascript">
	import { getDepartments , getEmployeesByPageNO , getEmployeeInfByWorkNo,addEmployee , deleteEmployee ,updateEmployeeInfo, getProvince , getCity ,getCounty , getEducationsOfEmployees,getAgesofEmployees} from '../../../service/getData';
	// let echarts = require('echarts/lib/echarts')	
	require('echarts/lib/chart/pie')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	export default {
	    data(){
	        return{
	        	employeeArr:[]	,
	        	departments:[{
					"departmentNo": -1,
	                "departmentName": "所有部门"	        		
	        	}],
	        	value:'',
	        	value1:'',
	        	value2:'',
	        	provinceVal:'',
	        	provinceVal1:'',
				educationVal:'',
	        	politicsVal:'',	        	
	        	cityVal:'',
	        	cityVal1:'',
	        	countyVal:'',
	        	countyVal1:'',
	        	totalItems:0,
	        	page: 1,
	        	moreMenu:{},
	        	editMenu:{
	        		dictionary:{
	        			editProvince:[],	
	        			editCity:[],	
	        			editCounty:[],	
	        		}	        				
	        	},
	        	addMenu:{
	        		dictionary:{
	        			politicsStatus:[
		                    {p_type:"党员"},
		                    {p_type:"团员"},
		                    {p_type:"群众"}
		                ],
		                highestEducation:[
		                    {e_type:"博士"},
		                    {e_type:"硕士"},
		                    {e_type:"本科"},
		                    {e_type:"高中"},
		                    {e_type:"其他"}
		                ],
		                newProvince:[],
		                newCity:[],
		                newCounty:[],
		                
	        		},
	        		employeeName:"",
		            employeeWorkno:"",
		            employeeType:"",
		            sex:"",
		            birthdate:"",
		            identityCardNo:"",
		            highestEducation:"",  
		            // highestOffering:"",
		            employeePhone:"",
		            politicsStatus:"",
		            employeeQQ:"",
		            employeeWechart:"",
		            employeeselectedAddress:"",
		            employeeAddress:"",
		            employeeMail:"",
		            employeeHiredate:"",
		            employeeDeparturedate:"",
		            employeePosition:"",
		            employeeState:""
	        	},
	        	moreVisible:false,
	        	updateVisible:false,
	        	newEmpVisible:false,
	        	degreeVisible:false,
	        	ageVisible:false,
	        	rules: {
					employeeName: [
						{ required:true, message: '请输入员工姓名', trigger: 'blur' },
						{ min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
					],
					employeeType: [
						{ required:true, message: '请选择是否为内部员工', trigger: 'change' }
					],
					sex: [
						{ required:true, message: '请选择性别', trigger: 'change' }
					],		          
 					identityCardNo: [
		            	{ required:true, message: '请输入身份证号', trigger: 'blur' }
		          	],		          
		        	birthdate: [
		            	{ required:true, type: 'date', message: '请选择出生日期', trigger: 'blur' }
		          	],
					employeePhone: [
		            	{ required:true, message: '请输入联系电话', trigger: 'blur' }
		          	],
					provinceVal: [
						{ required:true, message: '请选择省', trigger: 'blur' }
					],
					cityVal: [
						{ required:true, message: '请选择市', trigger: 'blur' }
					],		          			          	
		         	employeeHiredate:[
		            	{ type: 'date',required:true, message: '请选择入职日期', trigger: 'blur' }
		          	]
        		}
			}
	    },

		mounted(){
	        getDepartments({
				"sessionId": sessionStorage.getItem('sessionId'),
	        	"companySid":sessionStorage.getItem('companySid')	       			
	        }).then(data=>{
				if (data.code == "N01") {
					this.value= this.departments[0].departmentNo;
					for (var i = 0, len = data.contents.length; i < len; i++){
	                    this.departments.push(data.contents[i]);
	                };
	                this.getEmployeesByDep();    			 					
	            }else if (data.code == "E01") {
	                alert(data.message);
	            }        		
	        }),
			Date.prototype.format = function() {
		        var year = this.getFullYear().toString();
		        var month = (this.getMonth()+1).toString();
		        var day = this.getDate().toString();

		        if (month<10) {
		            month = "0" + month;
		        }

		        if (day<10) {
		            day = "0" + day;
		        }
		        return (year + "-" + month + "-" +day );
		    },
		    getProvince({
		    	"sessionId": sessionStorage.getItem('sessionId')
		    }).then(data=>{
				if (data.code == 'N01') {
	                this.addMenu.dictionary.newProvince = data.contents;
	            }else if (data.code == "E01") {
                	this.$message.error('调用失败');
            	}		    		
		    })	       
			 		      	      
	    },

	    methods:{
	    	getEmployeesByDep(){
				getEmployeesByPageNO({
					"sessionId": sessionStorage.getItem('sessionId'),
	                "companySid": sessionStorage.getItem('companySid'),
	                "departmentNo": this.value,
	                "page": this.page,
	                "number": 10						
				}).then(data=>{
					if (data.code == "N01") {
						this.employeeArr = 	data.contents.list;	
						this.totalItems = data.contents.size;
		                for (var i = 0,len = this.employeeArr.length; i < len; i++) {
		                    this.employeeArr[i].employeeHiredate = (new Date(data.contents.list[i].employeeHiredate*1000)).format();
		                    if  (this.employeeArr[i].sex == "1"){
		                        this.employeeArr[i].sex = "男";
		                    } else if (this.employeeArr[i].sex == "0") {
		                        this.employeeArr[i].sex = "女";
		                    }
		                    if  (this.employeeArr[i].employeeState == "1"){
		                        this.employeeArr[i].employeeState = "在职";
		                    } else if (this.employeeArr[i].employeeState == "0") {
		                        this.employeeArr[i].employeeState = "离职";
		                    }
		                } 										
		            }else if (data.code == "E01") {
		                alert(data.message);
		            }        		
			    });	
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getEmployeesByDep();
			},							  	
		    getEmpByWorkNo(employeeWorkno,text){
		    	getEmployeeInfByWorkNo({
                    "sessionId": sessionStorage.getItem('sessionId'),
                    "companySid": sessionStorage.getItem('companySid'),
                    "employeeWorkno": employeeWorkno 	
		    	}).then(data=>{
		    		if (data.code == "N01") {
						data.contents.birthdate = (new Date(data.contents.birthdate*1000)).format();
 						data.contents.employeeHiredate = (new Date(data.contents.employeeHiredate*1000)).format();
						data.contents.employeeDeparturedate = (new Date(data.contents.employeeDeparturedate*1000)).format();		    			
		    			if(text=='更多'){	    			
							if (data.contents.sex == "1") {
				                data.contents.sex = "男";
				            } else if (data.contents.sex == "0") {
				                data.contents.sex = "女";
				            }
				            if (data.contents.employeeState == "1") {
				               data.contents.employeeState = "在职";
				                data.contents.employeeDeparturedate="";
				            } else if (data.contents.employeeState == "0") {
				                data.contents.employeeState = "离职";
				            }
							this.moreVisible = true;
			    			this.moreMenu = data.contents;				            
			        	}
			    		else if(text=='编辑'){
			    			
				    		this.updateVisible = true;
							this.editMenu = data.contents;
							// 初始化
			    			this.educationVal = data.contents.highestEducation	;
			    			this.politicsVal = data.contents.politicsStatus	;
			    			this.provinceVal1 = data.contents.employeeAddress.split("-")[0];
			    			this.cityVal1 = data.contents.employeeAddress.split("-")[1];
			    			this.countyVal1= data.contents.employeeAddress.split("-")[2];
			    			this.editMenu.employeeAddress = data.contents.employeeAddress.split("-")[3];
			    			console.log(this.provinceVal1);
			    			console.log(this.cityVal1);
			    			console.log(this.countyVal1);

			    		}	
		    		}
		    	})
		    },
		    newEmployee(){
		    	this.newEmpVisible = true;
		    },
		    addEmployees(){
		    	var address;
		        var address1,address2,address3,address4;		        
		        address1 = this.provinceVal.provinceName;
		        address2 = this.cityVal.cityName;
		        address3 = this.countyVal.countyName;
		        address4 = this.addMenu.employeeAddress;
		        if(address3&&address4){
		            address = address1+"-"+address2+"-"+address3+"-"+address4;
		        }else if(address3){address = address1+"-"+address2+"-"+address3+"-"+" ";}
		        else if(address4){address = address1+"-"+address2+"-"+" "+"-"+address4;}
		        else{address = address1+"-"+address2+"-"+" "+"-"+" ";}
		    	addEmployee({
					"sessionId": sessionStorage.getItem('sessionId'),
                    "companySid": sessionStorage.getItem('companySid'),
                    "employeeName": this.addMenu.employeeName, 
                    "employeeType": this.addMenu.employeeType,
                    "sex": this.addMenu.sex,
                    "birthdate": ((new Date(this.addMenu.birthdate)).valueOf())/1000,
                    "identityCardNo": this.addMenu.identityCardNo,
                    "highestEducation": this.value1,
                    "highestOffering": "",//默认传空参，后台不需修改
                    "employeePhone": this.addMenu.employeePhone,
                    "politicsStatus": this.value2,
                    "employeeQQ": this.addMenu.employeeQQ,
                    "employeeWechart": this.addMenu.employeeWechart,
                    "employeeAddress": address,
                    "employeeMail": this.addMenu.employeeMail,
                    "employeeHiredate": ((new Date(this.addMenu.employeeHiredate)).valueOf())/1000,
                    "employeeDeparturedate": ((new Date(this.addMenu.employeeDeparturedate)).valueOf())/1000,
                    "employeePosition": this.addMenu.employeePosition,
                    "employeeState": "1",//新增员工默认在职状态为在职1
                    "updateWriterName": sessionStorage.getItem('userName'),
                    "updateWriterNo": sessionStorage.getItem('userNo'),
                    "note": "lv"		    			
		    	}).then(data=>{
		    		if(data.code=="N01"){
		    			this.$message({
		    				message: '新增用户成功',
          					type: 'success'	
		    			});
		    			this.newEmpVisible = false;
		    			this.getEmployeesByDep();
		    		}else if(data.code=="E01"){
		    			this.$message.error('调用失败');
		    			this.newEmpVisible = false;	
		    		}
		    	})	
		    },
		    delEmployee(employeeWorkno){
		    	this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
		        	deleteEmployee({
						"sessionId": sessionStorage.getItem('sessionId'),
	                    "companySid": sessionStorage.getItem('companySid'),
	                    "employeeWorkno": employeeWorkno		        		
		        	}).then(data=>{
		        		if (data.code == 'N01') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});	
							this.getEmployeesByDep();	        				
		        		}
		        	});
		        }).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
		        });		
		    },
		    getCities(p){
		    	this.cityVal1 = "";
		    	getCity({
		    		"sessionId": sessionStorage.getItem('sessionId'),
                	"provinceCode": p	
		    	}).then(data=>{
					if (data.code == 'N01') {	
						this.addMenu.dictionary.newCity = data.contents;
						console.log(this.addMenu.dictionary.newCity);
                	}else if (data.code == "E01") {
		                alert(data.message);
		            }		    			
		    	})
		    },
		    getCounties(c){
		    	this.countyVal1 = "",
		    	getCounty({
					"sessionId": sessionStorage.getItem('sessionId'),
	                "cityCode": c		    			
		    	}).then(data=>{
		    		if (data.code == 'N01') {
		    			this.addMenu.dictionary.newCounty = data.contents;				
                	}	
		    	})	
		    },
		    updateEmployee(){
		    	var address;
		        var address1,address2,address3,address4;		        
		        address1 = this.provinceVal1.provinceName;
		        address2 = this.cityVal1.cityName;
		        address3 = this.countyVal1.countyName;
		        address4 = this.editMenu.employeeAddress;
		        if(address3&&address4){
		            address = address1+"-"+address2+"-"+address3+"-"+address4;
		        }else if(address3){address = address1+"-"+address2+"-"+address3+"-"+" ";}
		        else if(address4){address = address1+"-"+address2+"-"+" "+"-"+address4;}
		        else{address = address1+"-"+address2+"-"+" "+"-"+" ";}	        
		    	updateEmployeeInfo({
					"sessionId": sessionStorage.getItem('sessionId'),
                    "companySid": sessionStorage.getItem('companySid'),
                    "employeeName": this.editMenu.employeeName,
                    "employeeWorkno": this.editMenu.employeeWorkno,
                    "sex": this.editMenu.sex,//
                    "birthdate": ((new Date(this.editMenu.birthdate)).valueOf())/1000,
                    "identityCardNo": this.editMenu.identityCardNo,
                    // 2018-04-08 文化程度修改
                    "highestEducation": this.educationVal,
                    "highestOffering": "",
                    "employeePhone": this.editMenu.employeePhone,
                    "politicsStatus": this.politicsVal,
                    "employeeQQ": this.editMenu.employeeQQ,
                    "employeeWechart": this.editMenu.employeeWechart,
                    "employeeAddress": address,
                    "employeeMail": this.editMenu.employeeMail,
                    "employeeHiredate": ((new Date(this.editMenu.employeeHiredate)).valueOf())/1000,
                    "employeeDeparturedate": ((new Date(this.editMenu.employeeDeparturedate)).valueOf())/1000,
                    "employeePosition": this.editMenu.employeePosition,
                    "employeeState": this.editMenu.employeeState,//?????
                    "updateWriterName": sessionStorage.getItem('userName'),
                    "updateWriterNo": sessionStorage.getItem('userNo'),
                    "note": "lv"		    		
		    	}).then(data=>{
		    		if (data.code == 'N01') {
		    			this.$message({
		    				type:'success',
		    				message:'修改成功'
		    			});
		    			this.updateVisible = false;
		    			this.getEmployeesByDep();
		    		}else if(data.code == 'E01'){
		    			this.$message.error('修改失败');
		    		}
		    	})
		    },
		    degreeCharts(){
		    	this.degreeVisible = true;
		    	let myChart = this.$echarts.init(document.getElementById('degreeNum2'));
				getEducationsOfEmployees({
		    		"sessionId": sessionStorage.getItem('sessionId'),
                	"companySid": sessionStorage.getItem('companySid')	
		    	}).then(data=>{
					if (data.code == 'N01') {
             			//保存图表的学历名字和数量和两个一起保存
			            var educationName = [];
			            var educationNum = [];   
			            var education =[];
			            var total = [];
			            education = data.contents;
						for(var i = 0; i < data.contents.length; i++){
						    educationName.push(data.contents[i].education);
						    educationNum.push(data.contents[i].count);
						}
						for (var i = 0; i < education.length; i++) {
						    total[i] = {value:education[i].count , name: education[i].education }        
						}      
		                myChart.setOption({
		                    title : {
		                        text: '员工学历分布图',
		                        x: 'center'
		                    },
		                    tooltip : {
		                        trigger: 'item',
		                        formatter: "{a} <br/>{b} : {c} ({d}%)"
		                    },
		                    legend: {
		                        orient : 'vertical',
		                        x : 'left',
		                        data:educationName
		                    },
		                    toolbox: {
		                        show : true,
		                        feature : {
		                            mark : {show: true},
		                            dataView : {show: true, readOnly: false},
		                            magicType : {
		                                show: true, 
		                                type: ['pie', 'funnel'],
		                                option: {
		                                    funnel: {
		                                        x: '25%',
		                                        width: '50%',
		                                        funnelAlign: 'left',
		                                        max: 1548
		                                    }
		                                }
		                            },
		                            restore : {show: true},
		                            saveAsImage : {show: true}
		                        }
		                    },
		                    calculable : true,
		                    series : [
		                       {
		                            name:'人数和百分比',
		                            type:'pie',
		                            radius : '55%',
		                            center: ['50%', '60%'],
		                            data:total
		                        }
		                    ]
		                }) ;
		                // myChart.setOption(option);    
		            }else if (data.code == "E01") {
		                this.$message.error('调用失败');
		            }	    			
		    	})		    	
		    },
		    // var myChart2 = this.$echarts.init(document.getElementById('ageNum2'));
		    ageCharts(){
		    	this.ageVisible = true;
		    	var myChart2 = this.$echarts.init(document.getElementById('ageNum2'));
		    	getAgesofEmployees({
		    		"sessionId": sessionStorage.getItem('sessionId'),
                	"companySid": sessionStorage.getItem('companySid')	
		    	}).then(data=>{
					if (data.code == 'N01') {
			            //保存图表的学历名字和数量和两个一起保存
			            var ageName = [];
			            var ageNum = [];   
			            var age =[];
			            var total = [];
			            age = data.contents;
			            for(var i = 0; i < data.contents.length; i++){
		                    ageName.push(data.contents[i].range);
		                    ageNum.push(data.contents[i].count);
			            }
		                // console.log(age);
		                // console.log(ageName);
		                // console.log(ageNum);
		                for (var i = 0; i < age.length; i++) {
		                           total[i] = {value:age[i].count , name: age[i].range }        
		                }
		                var option = {
		                    title : {
		                        text: '企业员工年龄分布',
		                        x:'center'
		                    },
		                        tooltip: {
		                        trigger: 'item',
		                        formatter: "{a} <br/>{b}: {c} ({d}%)"
		                    },
		                    legend: {
		                        orient: 'vertical',
		                        x: 'left',
		                        data:ageName
		                    },
		                    toolbox: {
		                        show : true,
		                        feature : {
		                            mark : {show: true},
		                            dataView : {show: true, readOnly: false},
		                            magicType : {
		                                show: true, 
		                                type: ['pie', 'funnel'],
		                                option: {
		                                    funnel: {
		                                        x: '25%',
		                                        width: '50%',
		                                        funnelAlign: 'left',
		                                        max: 1548
		                                    }
		                                }
		                            },
		                            restore : {show: true},
		                            saveAsImage : {show: true}
		                        }
		                    },
		                    calculable : true,
		                    series: [
		                        {
		                            name:'年龄范围',
		                            type:'pie',
		                            radius: ['50%', '70%'],
		                            avoidLabelOverlap: false,
		                            label: {
		                                normal: {
		                                    show: false,
		                                    position: 'center'
		                                },
		                                emphasis: {
		                                    show: true,
		                                    textStyle: {
		                                        fontSize: '30',
		                                        fontWeight: 'bold'
		                                    }
		                                }
		                            },
		                            labelLine: {
		                                normal: {
		                                    show: false
		                                }
		                            },
		                            data:total
		                        }
		                    ]
		                };
		                myChart2.setOption(option);    
		            }else if (data.code == "E01") {
		                alert(data.message);
		            }		    			
		    	})
		    }		
	    },
	}	
</script>

<style>
.base-contain{
		margin-top:20px;
		display: table-cell
	}		
</style>