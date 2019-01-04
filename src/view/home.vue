<template>
	<div class="container">
		<el-col :span="24" class="header">
			<el-col :span="2" class="logo">
				<img src="../static/logo.png" alt="" height="50px">				
			</el-col>
			<el-col :span="12" style="color: #0e39a1;font-size: 35px;line-height:80px ">
			{{menu.menu.companyCounty}}农产品质量安全全程智能系统				
			</el-col>	
			<el-col :span="6" style="color: #0e39a1;font-size: 22px;line-height:80px">
			{{menu.menu.companyFullName}}</el-col>					
			<el-col :span="4" style="line-height:80px">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner" style="font-size: 20px;"><i class="glyphicon glyphicon-user"></i>{{menu.userName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="updatePas">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="exitSystem">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>				
			</el-col>
			<el-dialog title="修改密码" :visible.sync="updateVisible" width="30%" >
	            <el-form label-width="100px" :model="menu" ref="form" :rules="rules">
					<el-form-item label="旧密码" prop="oldPassword">
						<el-input v-model="menu.oldPassword" auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="newPassword">
						<el-input v-model.trim="menu.newPassword" auto-complete="off"></el-input>
					</el-form-item>	
					<el-form-item label="确定新密码" prop="confirmNewPassword">
						<el-input v-model.trim="menu.confirmNewPassword" auto-complete="off"></el-input>
					</el-form-item>							
				</el-form>
	            <span slot="footer" class="dialog-footer">
	                <el-button @click="updateVisible = false">取 消</el-button>
	                <el-button type="primary" @click="update">修 改</el-button>
	            </span>
	        </el-dialog> 						
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :default-openeds="openeds" router>
		            <template v-for="item in $router.options.routes">
		                <template v-if=" !item.hidden">
		                    <el-submenu :index="item.index">
		                    	<!-- 一级导航 -->
		                        <template slot="title">
		                        	<i :class="item.iconCls" style="color:#31708F;"></i>
		                        	<span style="font-size:17px;font-weight:bold">{{ item.name }}</span>
		                    	</template>
		                        <template v-for="subItem in item.children">
		                        	<!-- 二级导航 -->
		                        	<el-menu-item :index="subItem.path" :key="subItem.path" v-if="!subItem.children" ><strong>{{subItem.name}}</strong></el-menu-item>
		                        	<!-- 三级导航 -->
									<el-submenu :index="subItem.index" v-if="subItem.children">
		                        			<template slot="title"><strong>{{ subItem.name }}</strong></template>
											<el-menu-item v-for="subChild in subItem.children" :key="subChild.path" :index="subChild.path" @click="$router.push(subChild.path)" >
					                            {{ subChild.name }}
					                        </el-menu-item>		             		
		                        	</el-submenu>	                      	
		                        </template>
		                    </el-submenu>
		                </template>
		            </template>
		        </el-menu>
					
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>			
		</el-col>
	</div>
</template>

<script type="text/javascript">
	import { getUserInfo,getCompanyFullName,modifyPassword,logout} from '../service/getData';
	import md5  from 'js-md5';
	export default {
	    data(){
	    	var validatePass = (rule, value, callback) => {            
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                  } else if (value !== this.menu.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                  } else {
                    callback();
                  }
          	};
	        return{
	        	collapsed:false,
	        	sesId:{
	        		"sessionId": sessionStorage.getItem('sessionId')	
	        	},
	        	companyData:{
					"sessionId": sessionStorage.getItem('sessionId'),
	                 "companySid": sessionStorage.getItem('companySid')        			
	        	},
				menu:{
					userName:'',
					oldPassword:'',
					newPassword:'',
					confirmNewPassword:'',
					menu:{},
				} ,
				rules:{
					confirmNewPassword:[
						{validator: validatePass, trigger: 'blur' }
					]
				},
				openeds: ['1','2','3','4','5','6'], 
				updateVisible:false
	        }
	    },

		mounted(){
	        getUserInfo(this.sesId).then(data=>{
				if (data.code == "N01") {
	                this.menu.userName = data.contents.userName;
	                sessionStorage.setItem('userName',data.contents.userName);
	                sessionStorage.setItem('userNo',data.contents.userNo);
	            }else if (data.code == "E01") {
	                sessionStorage.clear();
	                alert(data.message);
	                this.$router.push({ path: '/login' });
	            }        		
	        }),
			getCompanyFullName(this.companyData).then(data=>{
				if (data.code == "N01") {
	                this.menu.menu = data.contents;
	                sessionStorage.setItem('companyFullName',data.contents.companyFullName);
	                sessionStorage.setItem('companyShortName',data.contents.companyShortName);
	                sessionStorage.setItem('countyCode',data.contents.companyCountyCode);
	            }else if (data.code == "E01") {
	                alert(data.message);
	            }        		
	        })        
	    },

	    methods:{
	    	exitSystem(){
				var a = confirm("确定退出？");
		        if (a) { 
		        	var _this = this;
		        	logout(this.sesId).then(data=>{
						if (data.code == 'N01') {
	                    	sessionStorage.clear();
	                    	this.$router.push({ path: '/login' });	
	                    }else if (data.code == "E01") {
	                    	alert(data.message);
	                	}       			
		        	})
		        }   			
		    },
		    updatePas(){
		    	this.updateVisible = true;
		    },
		    update(){
		    	if(this.menu.confirmNewPassword==this.menu.newPassword){
					modifyPassword({
						"sessionId": sessionStorage.getItem('sessionId'),
	                    "password": md5(this.menu.oldPassword),
	                    "newPassword": md5(this.menu.newPassword)	
					}).then(data=>{
						if (data.code == 'N01') {
							this.$message({
					          message: '修改密码成功',
					          type: 'success'
					        });	
							this.updateVisible = false;	
							this.menu.oldPassword = "";
		                    this.menu.newPassword = "";
		                    this.menu.confirmNewPassword = "";
		                }else if (data.code == "E01") {
							this.menu.oldPassword = "";
		                    this.menu.newPassword = "";
		                    this.menu.confirmNewPassword = "";                    	
	                	}       			
		        	})			    			
		    	}
					    		
		    }
	    },
	}	
</script>
<style scoped lang="scss">
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 80px;
			line-height: 80px;
			border-bottom: 1px solid #E7E7E7;
			.logo {
				line-height:80px;
				text-align: center;					
			}

			
		}
		.main {
			display: flex;
			position: absolute;
			top: 80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				height:100%;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;					
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 250px;
				width: 250px;
			}
			.content-container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;

				.breadcrumb-container {	
					height:30px;
					border-bottom:1px solid #E7E7E7;			
					.breadcrumb-inner {
						font-weight:bold;
						font-size:15px;	
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;	
				}
			}			
		}
	}	
</style>
