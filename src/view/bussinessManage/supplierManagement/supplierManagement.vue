<style type="text/css">
	.base-contain {margin-top: 20px;}
	.table>thead>tr>th,.table>tbody>tr>td {text-align: center;vertical-align: middle;}	
	.first{background: #999999; color: #fff;}.second{background-color: #666; color: #fff;}
	/*分页样式*/
	.page-list {float:right;}
    .page-list .pagination span {cursor: pointer;}
    .page-list .pagination .separate span{cursor: default; border-top:none;border-bottom:none;}
    .page-list .pagination .separate span:hover {background: none;}
    .page-list .page-total {float:right; margin: 25px 20px;}
    .page-list .page-total input, .page-list .page-total select{height: 26px; border: 1px solid #ddd;}
    .page-list .page-total input {width: 40px; padding-left:3px;}
    .page-list .page-total select {width: 50px;}
</style>
<div class="col-md-12 base-contain">
	<button class="btn btn-primary" style="margin-bottom: 20px;margin-right: 15px;" data-toggle="modal" data-target="#newDepartment">新增供应商信息</button>
	<table class="table table-striped table-responsive table-bordered" >
		<thead>
			<tr>
				<th ng-click="col='vendorNo';desc=!desc" style="cursor: pointer;">供应商编号<span class="caret"></th>
				<th ng-click="col='vendorShortName';desc=!desc" style="cursor: pointer;">供应商简称<span class="caret"></th>
				<th>供应商全称</th>
				<th>供应商邮编</th>
				<th>联系电话</th>
				<th>供应商地址</th>
				<th>操作</th>
			</tr>	
		</thead>
		<tbody class="table-bordered">
			<tr ng-repeat="list in supplierManagement.menu|orderBy:col:desc">
				<input type="hidden" ng-model="list.printRecordSid"></input>
				<td ng-bind="list.vendorNo"></td>
				<td ng-bind="list.vendorShortName"></td>
				<td ng-bind="list.vendorFullName"></td>
				<td ng-bind="list.zipCode"></td>
				<td ng-bind="list.contactPhone"></td>
				<td ng-bind="list.contactAddress"></td>
				<td>
					<button class="btn btn-primary" style="padding: 3px 6px;" ng-click="getVendorById(list.vendorSid)" data-toggle="modal" data-target="#{{list.vendorSid+1000}}"><span class="glyphicon glyphicon-edit" title="编辑"></span></button>
					<button class="btn btn-danger"  style="padding: 3px 6px;" ng-click="delVendor(list.vendorSid)" ><span class="glyphicon glyphicon-remove" title="删除"></span></button>
					<div class="modal fade" id="{{list.vendorSid+1000}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				  		<div class="modal-dialog" role="document">
				   			<div class="modal-content">
				      			<div class="modal-header">
				        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        			<h4 class="modal-title" id="myModalLabel">编辑供应商信息</h4>
				      			</div>
				      			<div class="modal-body">
				        			<form class="form-horizontal" name="editDepartment1">
				        				<div class="form-group">
									<label for="vendorNo" class="col-sm-3 control-label">供应商编号<span style="color: red;">*</span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="vendorNo" placeholder="供应商编号" ng-model="supplierManagement.edit.vendorNo"  ng-required="true" required>
									 </div>	
								</div>
								<div class="form-group">
									<label for="vendorShortName" class="col-sm-3 control-label">供应商简称<span style="color: red;">*</span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="vendorShortName" placeholder="供应商简称" ng-model="supplierManagement.edit.vendorShortName"  ng-required="true" required>
									 </div>						    
								</div>
								<div class="form-group">
									<label for="vendorFullName" class="col-sm-3 control-label">供应商全称<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="vendorFullName" placeholder="供应商全称" ng-model="supplierManagement.edit.vendorFullName">
									 </div>						    
								</div>
								<div class="form-group">
									<label for="zipCode" class="col-sm-3 control-label">供应商邮编<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="zipCode" placeholder="供应商邮编" ng-model="supplierManagement.edit.zipCode">
									 </div>						    
								</div>
								<div class="form-group">
									<label for="contactPhone" class="col-sm-3 control-label">供应商电话<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="contactPhone" placeholder="供应商电话" ng-model="supplierManagement.edit.contactPhone">
									 </div>						    
								</div>
								<div class="form-group">
									<label for="contactAddress" class="col-sm-3 control-label">供应商地址<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="contactAddress" placeholder="供应商地址" ng-model="supplierManagement.edit.contactAddress">
									 </div>						    
								</div>
								<div class="form-group">
									<label for="notes" class="col-sm-3 control-label">供应商备注<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="notes" placeholder="供应商备注" ng-model="supplierManagement.edit.notes" >
									 </div>						    
								</div>
								<div class="modal-footer">
						      			<button type="button" class="btn btn-info" ng-disabled="editDepartment1.$invalid" data-dismiss="modal" ng-click="updateVendor(list.vendorSid)">保存</button>
						        			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						      		</div>
				        			</form>
				      			</div>
				    		</div>
  						</div>	
					</div>	
				</td>
			</tr>
		</tbody>
	</table>
</div>
<tm-pagination conf="paginationConf"></tm-pagination>
<div class="modal fade" id="newDepartment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  	<div class="modal-dialog" role="document">
   		<div class="modal-content">
	      		<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 class="modal-title" id="myModalLabel">新增供应商信息</h4>
	      		</div>
      			<div class="modal-body">
	        			<form class="form-horizontal" name="newDepartment1">
	        				<div class="form-group">
						<label for="vendorNo" class="col-sm-3 control-label">供应商编号<span style="color: red;">*</span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="vendorNo" placeholder="供应商编号" ng-model="supplierManagement.new.vendorNo"  ng-required="true" required>
						 </div>	
					</div>
					<div class="form-group">
						<label for="vendorShortName" class="col-sm-3 control-label">供应商简称<span style="color: red;">*</span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="vendorShortName" placeholder="供应商简称" ng-model="supplierManagement.new.vendorShortName"  ng-required="true" required>
						 </div>						    
					</div>
					<div class="form-group">
						<label for="vendorFullName" class="col-sm-3 control-label">供应商全称<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="vendorFullName" placeholder="供应商全称" ng-model="supplierManagement.new.vendorFullName">
						 </div>						    
					</div>
					<div class="form-group">
						<label for="zipCode" class="col-sm-3 control-label">供应商邮编<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="zipCode" placeholder="供应商邮编" ng-model="supplierManagement.new.zipCode">
						 </div>						    
					</div>
					<div class="form-group">
						<label for="contactPhone" class="col-sm-3 control-label">联系电话<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="contactPhone" placeholder="联系电话" ng-model="supplierManagement.new.contactPhone">
						 </div>						    
					</div>
					<div class="form-group">
						<label for="contactAddress" class="col-sm-3 control-label">供应商地址<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="contactAddress" placeholder="供应商地址" ng-model="supplierManagement.new.contactAddress">
						 </div>						    
					</div>
					<div class="form-group">
						<label for="notes" class="col-sm-3 control-label">供应商备注<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="notes" placeholder="供应商备注" ng-model="supplierManagement.new.notes" >
						 </div>						    
					</div>
					<div class="modal-footer">
			      			<button type="button" class="btn btn-info" ng-disabled="newDepartment1.$invalid" data-dismiss="modal" ng-click="addVendor()">保存</button>
			        			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>        			
			      		</div>
	        			</form>
      			</div>
  		</div>
	</div>	
</div>