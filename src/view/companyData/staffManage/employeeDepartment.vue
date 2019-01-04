<template>
	<el-col :span="24" class="base-contain">
		<el-col :span="12">
			<el-button type="primary">新增员工部门关系</el-button>
		</el-col>
		<el-col :span="12">
			<el-form>
				<!-- v-model="employeeWorkNo" -->
				<el-form-item label="员工工号" >
					<el-input  auto-complete="off" style="width:250px;"></el-input>
					<el-button type="primary">查询</el-button>
					<el-button type="primary">查询所有</el-button>
				</el-form-item>
			</el-form>						
		</el-col>
		<!-- 列表 -->
		<el-table :data="employeeDepartmentsMenu" border highlight-current-row style="width: 100%;margin-top:20px;">
			<el-table-column prop="employeeWorkno" label="员工工号" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeeName" label="员工姓名" align="center" sortable>
			</el-table-column>	
			<el-table-column prop="departmentNo" label="部门编号" align="center" sortable>
			</el-table-column>
			<el-table-column prop="departmentName" label="部门名称" align="center" sortable>
			</el-table-column>
			<el-table-column prop="employeePost" label="所在部门岗位" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template scope="scope">
					<el-button type="primary" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-edit" title="编辑" @click="getEmpByWorkNo(scope.row.employeeWorkno,'编辑')"></span></el-button>
					<el-button type="danger" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-remove" title="删除"></span></el-button>
				</template>
			</el-table-column>														
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="totalItems" style="float:right;">
			</el-pagination>
		</el-col>	
						
	</el-col>	
</template>
<script type="text/javascript">
	import { getAllDepartmentsAndEmployees} from '../../../service/getData';	
	export default {
	    data(){
	        return{
				page:1,
				totalItems:0,
				employeeDepartmentsMenu:[]	        	
			}
	    },

		mounted(){
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
		    this.getDepartEmployees()      
			 		      	      
	    },

	    methods:{
	    	getDepartEmployees(){
				getAllDepartmentsAndEmployees({
					"sessionId": sessionStorage.getItem('sessionId'),
	                "companySid": sessionStorage.getItem('companySid'),
	                "page": this.page,
	                "number": 10		    	
			    }).then(data=>{
			    	this.employeeDepartmentsMenu = data.contents.list;
			    	this.totalItems = data.contents.size;
			    })		    			
	    	},
			handleCurrentChange(val) {
				this.page = val;
				this.getDepartEmployees();
			},							  	
			// handleClose(done) {
		 //        this.$confirm('确认关闭？')
		 //          .then(_ => {
		 //            done();
		 //          })
		 //          .catch(_ => {});
		 //    },  		
	    },
	}		
</script>

<style>
	.base-contain{
			margin-top:20px;
			display: table-cell
		}		
</style>