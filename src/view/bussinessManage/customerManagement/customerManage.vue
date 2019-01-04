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
	<button class="btn btn-primary" style="margin-bottom: 20px;margin-right: 15px;" data-toggle="modal" data-target="#newCustomer">新增客户信息</button>
	<table class="table table-striped table-responsive table-bordered" >
		<thead>
			<tr>
				<th ng-click="col='customerNo';desc=!desc" style="cursor: pointer;">客户编号<span class="caret"></th>
				<th ng-click="col='customerShortName';desc=!desc" style="cursor: pointer;">客户简称<span class="caret"></th>
				<th>客户全称</th>
				<th>客户邮编</th>
				<th>联系电话</th>
				<th>客户地址</th>
				<th>操作</th>
			</tr>	
		</thead>
		<tbody class="table-bordered">
			<tr ng-repeat="list in customerManage.menu|orderBy:col:desc">
				<input type="hidden" ng-model="list.printRecordSid"></input>
				<td ng-bind="list.customerNo"></td>
				<td ng-bind="list.customerShortName"></td>
				<td ng-bind="list.customerFullName"></td>
				<td ng-bind="list.zipCode"></td>
				<td ng-bind="list.contactPhone"></td>
				<td ng-bind="list.contactAddress"></td>
				<td>
					<button class="btn btn-primary" style="padding: 3px 6px;" ng-click="getCustomerById(list.customerSid)" data-toggle="modal" data-target="#{{list.customerSid+1000}}"><span class="glyphicon glyphicon-edit" title="编辑"></span></button>
					<button class="btn btn-danger"  style="padding: 3px 6px;" ng-click="delCustomer(list.customerSid)" ><span class="glyphicon glyphicon-remove" title="删除"></span></button>
					<div class="modal fade" id="{{list.customerSid+1000}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				  		<div class="modal-dialog" role="document">
				   			<div class="modal-content">
				      			<div class="modal-header">
				        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        			<h4 class="modal-title" id="myModalLabel">编辑客户信息</h4>
				      			</div>
				      			<div class="modal-body">
				        			<form class="form-horizontal" name="editCustomer1">
				        				<div class="form-group">
									<label for="customerNo" class="col-sm-3 control-label">客户编号<span style="color: red;">*</span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="customerNo" placeholder="客户编号" ng-model="customerManage.edit.customerNo"  ng-required="true" required>
									 </div>	
								</div>
								<div class="form-group">
									<label for="customerShortName" class="col-sm-3 control-label">客户简称<span style="color: red;">*</span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="customerShortName" placeholder="客户简称" ng-model="customerManage.edit.customerShortName"  ng-required="true" required>
									 </div>						    
								</div>
								<div class="form-group">
									<label for="customerFullName" class="col-sm-3 control-label">客户全称<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="customerFullName" placeholder="客户全称" ng-model="customerManage.edit.customerFullName">
									 </div>						    
								</div>
								<div class="form-group">
									<label for="zipCode" class="col-sm-3 control-label">客户邮编<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="zipCode" placeholder="客户邮编" ng-model="customerManage.edit.zipCode">
									 </div>						    
								</div>
								<!-- 负责人 -->
							            <div class="form-group"> 
							                <label for="contactPhone" class="col-md-3 control-label">联系电话<span style="color: red;"></span></label>
							                 <div class="col-sm-9">
										<input type="text" class="form-control" id="contactPhone" placeholder="联系电话" ng-model="customerManage.edit.contactPhone">
									 </div>	
							            </div>
							            <div class="form-group">
							                <label for="contactAddress" class="col-md-3 control-label">客户地址<span style="color: red;"></span></label>
							               <div class="col-sm-9">
										<input type="text" class="form-control" id="contactAddress" placeholder="客户地址" ng-model="customerManage.edit.contactAddress">
									 </div>	
							            </div>
							            <!-- 负责人 -->
								<div class="form-group">
									<label for="notes" class="col-sm-3 control-label">客户备注<span style="color: red;"></span></label>
									 <div class="col-sm-9">
										<input type="text" class="form-control" id="notes" placeholder="客户备注" ng-model="customerManage.edit.notes" >
									 </div>						    
								</div>
								<div class="modal-footer">
						      			<button type="button" class="btn btn-info" ng-disabled="editCustomer1.$invalid" data-dismiss="modal" ng-click="updateCustomer(list.customerSid)">保存</button>
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
<div class="modal fade" id="newCustomer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  	<div class="modal-dialog" role="document">
   		<div class="modal-content">
	      		<div class="modal-header">
	        			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 class="modal-title" id="myModalLabel">新增客户信息</h4>
	      		</div>
      			<div class="modal-body">
	        			<form class="form-horizontal" name="newCustomer1">
	        				<div class="form-group">
						<label for="customerNo" class="col-sm-3 control-label">客户编号<span style="color: red;">*</span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="customerNo" placeholder="客户编号" ng-model="customerManage.new.customerNo"  ng-required="true" required>
						 </div>	
					</div>
					<div class="form-group">
						<label for="customerShortName" class="col-sm-3 control-label">客户简称<span style="color: red;">*</span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="customerShortName" placeholder="客户简称" ng-model="customerManage.new.customerShortName"  ng-required="true" required>
						 </div>						    
					</div>
					<div class="form-group">
						<label for="customerFullName" class="col-sm-3 control-label">客户全称<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="customerFullName" placeholder="客户全称" ng-model="customerManage.new.customerFullName">
						 </div>						    
					</div>
					<div class="form-group">
						<label for="zipCode" class="col-sm-3 control-label">客户邮编<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="zipCode" placeholder="客户邮编" ng-model="customerManage.new.zipCode">
						 </div>						    
					</div>
					<!-- 负责人 -->
				            <div class="form-group"> 
				                <label for="contactPhone" class="col-md-3 control-label">联系电话<span style="color: red;"></span></label>
				                 <div class="col-sm-9">
										<input type="text" class="form-control" id="contactPhone" placeholder="联系电话" ng-model="customerManage.new.contactPhone">
									 </div>	
				            </div>
				            <div class="form-group">
				                <label for="contactAddress" class="col-md-3 control-label">客户地址<span style="color: red;"></span></label>
				               <div class="col-sm-9">
										<input type="text" class="form-control" id="contactAddress" placeholder="客户地址" ng-model="customerManage.new.contactAddress">
									 </div>	
				            </div>
				            <!-- 负责人 -->
					<div class="form-group">
						<label for="notes" class="col-sm-3 control-label">客户备注<span style="color: red;"></span></label>
						 <div class="col-sm-9">
							<input type="text" class="form-control" id="notes" placeholder="客户备注" ng-model="customerManage.new.notes" >
						 </div>						    
					</div>
					<div class="modal-footer">
			      			<button type="button" class="btn btn-info" ng-disabled="newCustomer1.$invalid" data-dismiss="modal" ng-click="addCustomer()">保存</button>
			        			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>        			
			      		</div>
	        			</form>
      			</div>
  		</div>
	</div>	
</div>