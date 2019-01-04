<template>
	<el-col :span="24" class="base-contain">
		<el-col >
			<el-button type="primary">新建鲜叶</el-button>
			<el-button type="warning">打印鲜叶二维码</el-button>
		</el-col>
		<!-- 列表 -->
		<el-col>
			<el-table :data="freashLeavesMenu" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column prop="unifiedProductNo" label="统一产品编号" align="center" sortable>
				</el-table-column>
				<el-table-column prop="productNo" label="企业产品编号" align="center" sortable>
				</el-table-column>	
				<el-table-column prop="productName" label="名称" align="center" sortable >
				</el-table-column>
				<el-table-column prop="freshLeafLevelName" label="等级" align="center" sortable>
				</el-table-column>
				<el-table-column prop="freshVarietyName" label="品种" align="center" sortable>
				</el-table-column>
				<el-table-column prop="productSpecification" label="规格" align="center" sortable>
				</el-table-column>
				<el-table-column prop="productDescription" label="描述" align="center" sortable>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" style="padding: 3px 6px;" ><span class="glyphicon glyphicon-edit" title="编辑"></span></el-button>
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
	import { getProductsByCompanySidAndType} from '../../../service/getData';	
	export default {
	    data(){
	        return{
				page:1,
				totalItems:0,
				freashLeavesMenu:[]	        	
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
		    this.getProducts()      
			 		      	      
	    },

	    methods:{
	    	getProducts(){
	    		getProductsByCompanySidAndType({
					"sessionId": sessionStorage.getItem('sessionId'),
	                "companySid": sessionStorage.getItem('companySid'),
	                "productTypeName": "原材料",
	                "page": this.page,
	                "number": 10	    				
	    		}).then(data=>{
	    			if(data.code == 'N01'){
						this.freashLeavesMenu = data.contents.list;
				    	this.totalItems = data.contents.size;	    				
	    			}else if (data.code == "E01") {
		                alert(data.message);
		            }	
			    })	
	    	},
			handleCurrentChange(val) {
				this.page = val;
				this.getProducts();
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