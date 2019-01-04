<template>
	<el-col :span="24" class="base-contain">
		<section>		
			<el-button type="primary" @click="addUser" style="margin-left:2%">新增用户角色</el-button>
			<!-- 列表 -->
			<el-table :data="userRoles.menu" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column prop="userNo" label="用户编号" align="center" sortable>
				</el-table-column>
				<el-table-column prop="userName" label="用户名" align="center" sortable>
				</el-table-column>	
				<el-table-column prop="roles" label="角色列表" align="center" sortable class="role"> 	
					<template scope="scope">
		                <span class="list-inline" v-for='r in scope.row.roles'>{{r.roleName}}</span>
		            </template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button type="danger" size="small" style="padding: 3px 3px;" @click="deteleRole(scope.row.userSid)"><span class="glyphicon glyphicon-remove" title="删除"></span></el-button>
					</template>
				</el-table-column>														
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="totalItems" style="float:right;">
				</el-pagination>
			</el-col>

			<el-dialog title="新增用户角色" :visible.sync="addUserVisible" width="35%">
				<el-form class="addForm">
					<el-form-item label="请选择用户" >
						<el-select v-model="value" placeholder="请选择" style="width:60%;margin-left:50px;">
							<el-option v-for="item in userRoles.arr" :key="item.userSid" :label="item.userName" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="请选择对应角色" >
						<el-checkbox-group style="width:80%;margin-left:90px;" v-model="checklist">		
							<el-checkbox  v-for="u in userRoles.rolesArr" :key="u.roleSid" :label="u">
								{{u.roleName}}		
							</el-checkbox >
						</el-checkbox-group>	
					</el-form-item>
				</el-form>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="addUserVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addUserRol">确 定</el-button>
			  </span>
			</el-dialog>
			
		</section> 
	</el-col>
</template>

<script type="text/javascript">
	import { getUserRoleMaps,getUsersBycompanySid,getRoles,addUserRoleMap,deleteUserRoleMap} from '../../service/getData';	
	export default {
	    data(){
	        return{
	        	collapsed:false,
	        	dialogVisible: false,
	        	totalItems:0,
	        	page:1,
	        	addUserRules:{
	        		name: [
						{ required: true, message: '请选择用户', trigger: 'blur' }
					]	
	        	},
				sesId:{
	        		"sessionId": sessionStorage.getItem('sessionId')	
	        	},	        	
	        	userData:{
	        		"companySid": sessionStorage.getItem('companySid'),
	        		"sessionId": sessionStorage.getItem('sessionId')
	        	},
				userRoles:{
					menu:[],
					arr:[],
					rolesArr:[]
				},
				addUserVisible:false,  
				value:'',
				checklist:[]
	        }
	    },

		mounted(){
	       this.getUsers(),
	       getUsersBycompanySid(this.userData).then(data=>{
				if (data.code == "N01") {
	                this.userRoles.arr = data.contents;
	            }else if (data.code == "E01") {
	                alert(data.message);
	            }        		
	        }),
	        getRoles(this.sesId).then(data=>{
				if (data.code == "N01") {
	                this.userRoles.rolesArr = data.contents;
	            }else if (data.code == "E01") {
	                alert(data.message);
	            } 	        		
	        })
			      
	    },

	    methods:{
	    	getUsers(){
	    		var roleData = {
					"sessionId": sessionStorage.getItem('sessionId'),
	                "companySid": sessionStorage.getItem('companySid'),  
					"page": this.page,
                	"number": 10	    			
	    		};
				getUserRoleMaps(roleData).then(data=>{
					if (data.code == "N01") {
		                this.userRoles.menu = data.contents.list;
		                this.totalItems = data.contents.size;
		            }else if (data.code == "E01") {
		                alert(data.message);
		            }        		
		        })	    		
	    	},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},	
			addUser(){
				this.addUserVisible = true;	
			} ,
		    addUserRol(){
		    	var roles = [];
		    	for (var i = 0; i < this.checklist.length; i++) {
		    		// var roleInfo = this.checklist[i].split("+");
		    		var role = {	
			    		"roleNo":this.checklist[i].roleNo,
			    		"roleSid":this.checklist[i].roleSid		    		
		    		};
		    		roles.push(role);
		    	};
		    	addUserRoleMap({
					"companySid": sessionStorage.getItem('companySid'),
		    		"sessionId":sessionStorage.getItem('sessionId'),
					"userSid":this.value.userSid,
					"userNo":this.value.userNo,
					"role": roles,
					"note":"无"			    			
		    	}).then(data=>{
					if (data.code == "N01") {
						this.$message({
									message: '添加成功',
									type: 'success'
						});		            	    
		            }else if (data.code == "E01") {
		                alert(data.message);
		            }        		
		        })	;
		        this.addUserVisible = false  ;
		    },
		    deteleRole(userSid){
				this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
		        }).then(() => {
					deleteUserRoleMap({
						"sessionId": sessionStorage.getItem('sessionId'),
		                "companySid": sessionStorage.getItem('companySid'),
		                "userSid": userSid		    			
			    	}).then(data=>{
						if (data.code == 'N01') {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});							
			                this.getUsers();        
			            }		        	
		        	});
		        }).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
		        });			    	
		    }    		
	    },
	}	
</script>

<style type="text/css" media="screen">
	.base-contain{
		margin-top:20px;
		display: table-cell
	}	
	
	.list-inline  {
		padding-right: 8px;
		padding-left: 8px;
		padding-bottom: 10px;
		display: inline-block;
	}
	.addForm{
		width: 85%;
		margin: 0 auto;
	}
</style>