<template>
	<el-col :span="24" class="base-contain">
		<el-col >
			<el-button type="primary">新增部门</el-button>
			<el-button type="success">部门人数分布</el-button>
		</el-col>
		<!-- 列表 -->
		<el-col>
			<el-table :data="departmentsMenu" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column prop="departmentNo" label="部门编号" align="center" sortable>
				</el-table-column>
				<el-table-column prop="departmentName" label="部门名称" align="center" sortable>
				</el-table-column>	
				<el-table-column prop="departmentLocation" label="部门位置" align="center" >
				</el-table-column>
				<el-table-column prop="departmentPhone" label="联系电话" align="center" sortable>
				</el-table-column>
				<el-table-column prop="departmentManagerWorkNo" label="负责人工号" align="center" sortable>
				</el-table-column>
				<el-table-column prop="departmentManagerName" label="负责人" align="center" sortable>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-edit" title="编辑" ></span></el-button>
						<el-button type="danger" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-remove" title="删除"></span></el-button>
					</template>
				</el-table-column>														
			</el-table>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="totalItems" style="float:right;">
			</el-pagination>
		</el-col>
	</el-col>	
</template>
<script type="text/javascript">
	import { getDepartmentsByPageNo} from '../../../service/getData';	
	export default {
	    data(){
	        return{
				page:1,
				totalItems:0,
				departmentsMenu:[]	        	
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
		    getDepartmentsByPageNo({
				"sessionId": sessionStorage.getItem('sessionId'),
                "companySid": sessionStorage.getItem('companySid'),
                "page": this.page,
                "number": 10		    	
		    }).then(data=>{
		    	this.departmentsMenu = data.contents.list;
		    	this.totalItems = data.contents.size;
		    })	       
			 		      	      
	    },

	    methods:{
	  //   	getEmployeesByDep(){
			// 	getEmployeesByPageNO({
			// 		"sessionId": sessionStorage.getItem('sessionId'),
	  //               "companySid": sessionStorage.getItem('companySid'),
	  //               "departmentNo": this.value,
	  //               "page": this.page,
	  //               "number": 10						
			// 	}).then(data=>{
			// 		if (data.code == "N01") {
			// 			this.employeeArr = 	data.contents.list;	
			// 			this.totalItems = data.contents.size;
		 //                for (var i = 0,len = this.employeeArr.length; i < len; i++) {
		 //                    this.employeeArr[i].employeeHiredate = (new Date(data.contents.list[i].employeeHiredate*1000)).format();
		 //                    if  (this.employeeArr[i].sex == "1"){
		 //                        this.employeeArr[i].sex = "男";
		 //                    } else if (this.employeeArr[i].sex == "0") {
		 //                        this.employeeArr[i].sex = "女";
		 //                    }
		 //                    if  (this.employeeArr[i].employeeState == "1"){
		 //                        this.employeeArr[i].employeeState = "在职";
		 //                    } else if (this.employeeArr[i].employeeState == "0") {
		 //                        this.employeeArr[i].employeeState = "离职";
		 //                    }
		 //                } 										
		 //            }else if (data.code == "E01") {
		 //                alert(data.message);
		 //            }        		
			//     });	
			// },
			handleCurrentChange(val) {
				this.page = val;
				this.getDepartmentsByPageNo();
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