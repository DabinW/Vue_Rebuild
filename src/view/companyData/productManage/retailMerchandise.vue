<template>
	<el-col :span="24" class="base-contain">
		<el-col >
			<el-button type="primary">新建零售产品</el-button>
			<el-button type="warning">打印零售产品二维码</el-button>
		</el-col>
		<!-- 列表 -->
		<el-col>
			<el-table :data="retailMerchandiseMenu" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column prop="unifiedProductNo" label="统一产品编号" align="center" sortable>
				</el-table-column>
				<el-table-column prop="productNo" label="企业产品编号" align="center" sortable>
				</el-table-column>	
				<el-table-column prop="goodsBarcode" label="商品条码" align="center" sortable >
				</el-table-column>
				<el-table-column prop="productName" label="产品名称" align="center" sortable width="120">
				</el-table-column>
				<el-table-column prop="productProcessName" label="工序等级" align="center" width="100">
				</el-table-column>
				<el-table-column prop="cfpqLevelName" label="质量等级" align="center" width="100">
				</el-table-column>
				<el-table-column prop="teaSpeciesName" label="茶叶种类" align="center" width="100">
				</el-table-column>
				<el-table-column prop="processCraftSmallVarietyName" label="加工工艺" align="center">
				</el-table-column>
				<el-table-column prop="goodsPackType" label="产品包装类型" align="center" width="120">
				</el-table-column>					
				<el-table-column  label="零售产品照片" align="center">
					<template scope="scope">
						<el-button type="primary" size="small">查看零售产品照片</el-button>
					</template>
				</el-table-column>												
				<el-table-column label="操作" align="center" width="180">
					<template scope="scope">
						<el-button type="warning"  style="padding: 3px 3px;" ><span class="el-icon-upload " title="上传"></span>
						</el-button><el-button type="success"  style="padding: 3px 3px;" ><span class="glyphicon glyphicon-circle-arrow-right" title="更多"></span>
						</el-button><el-button type="primary"  style="padding: 3px 3px;" ><span class="glyphicon glyphicon-edit" title="编辑"></span>
						</el-button><el-button type="danger"  style="padding: 3px 3px;" ><span class="glyphicon glyphicon-remove" title="删除"></span></el-button>						
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
				retailMerchandiseMenu:[]	        	
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
		    this.getRetailMerchandise()      
			 		      	      
	    },

	    methods:{
	    	getRetailMerchandise(){
	    		getProductsByCompanySidAndType({
					"sessionId": sessionStorage.getItem('sessionId'),
	                "companySid": sessionStorage.getItem('companySid'),
	                "productTypeName": "成品",
	                "page": this.page,
	                "number": 10	    				
	    		}).then(data=>{
	    			if(data.code == 'N01'){
						this.retailMerchandiseMenu = data.contents.list;
						for (var i = 0; i < data.contents.list.length; i++) {
		                    for (var j = 0; j < data.contents.listexpand1.length; j++){
		                        if (data.contents.list[i].productSid == data.contents.listexpand1[j].productSid) {
		                            this.retailMerchandiseMenu[i].goodsPackType = data.contents.listexpand1[j].goodsPackType;
		                            this.retailMerchandiseMenu[i].goodsBarcode = data.contents.listexpand1[j].goodsBarcode;
		                        }
		                    }                    
                		}						
				    	this.totalItems = data.contents.size;	    				
	    			}else if (data.code == "E01") {
		                alert(data.message);
		            }	
			    })	
	    	},
			handleCurrentChange(val) {
				this.page = val;
				this.getRetailMerchandise();
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