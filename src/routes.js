import Vue from 'vue'
import Router from 'vue-router'
import login from './view/login'
import home from './view/home'
import menu from './view/menu'
import userRole from './view/authorityManage/userRole'
import companyInfo from './view/companyData/companyInfo/companyInfo'
// 员工部门管理
import employeeManage from './view/companyData/staffManage/employeeManage'
import departmentManage from './view/companyData/staffManage/departmentManage'
import employeeDepartment from './view/companyData/staffManage/employeeDepartment'
// 产品管理
import freashLeaves from './view/companyData/productManage/freashLeaves'
import semiFinishedProducts from './view/companyData/productManage/semiFinishedProducts'
import retailMerchandise from './view/companyData/productManage/retailMerchandise'
import environment from './view/companyData/dataCharts/environment'
// 生产基地管理
import base from './view/productionManage/baseManage/base'
import farmWork from './view/productionManage/baseManage/farmWork'
import farmer from './view/productionManage/baseManage/farmer'
import land from './view/productionManage/baseManage/land'
// 加工信息管理
import stockPiles from './view/productionManage/processManage/stockPiles'
import productionRecord from './view/productionManage/processManage/productionRecord'
import packageRecord from './view/productionManage/processManage/packageRecord'
import traceCodeManage from './view/productionManage/processManage/traceCodeManage'
import thirdpartyInspection from './view/productionManage/qualityInspection/thirdpartyInspection'



Vue.use(Router)

export default[ 
	{
		path: '/',
		name: '',
		component: login,
		index:'login1',
		hidden: true
    },	
    {
		path: '/login',
		name: '',
		index: 'login2',
		component: login,
		hidden: true
    },
	{
		path: '/home',
		name: '系统功能管理',
		index:'1',
		component: home,
		iconCls: ' glyphicon glyphicon-asterisk',
		children: [
	        { path: '/userRole', component: userRole, name: '操作权限管理'}
	    ]      
    }, 
	{
		path: '/home',
		name: '企业数据管理',
		index:'2',
		component: home,
		iconCls: ' glyphicon glyphicon-calendar',
		children: [
	        { path: '/companyInfo', component: companyInfo, name: '企业信息管理',index:'21' },
	        { 
	        	path: '/menu', 
	        	component: menu,
	        	name: '员工部门管理',
	        	index:'22',
	        	children:[
	        		{path: '/employeeManage', component: employeeManage, name: '员工管理',index:'221'},
	        		{path: '/departmentManage', component: departmentManage, name: '部门管理',index:'222'},
	        		{path: '/employeeDepartment', component: employeeDepartment, name: '员工部门关系',index:'223'},
	        	] 
	        },
	        { 
	        	path: '/menu', 
	        	component: menu,
	        	name: '产品管理',
	        	index:'23', 
				children:[
	        		{path: '/freashLeaves', component: freashLeaves, name: '鲜叶管理',index:'231'},
	        		{path: '/semiFinishedProducts', component: semiFinishedProducts, name: '半成品管理',index:'232'},
	        		{path: '/retailMerchandise', component: retailMerchandise, name: '零售产品管理',index:'233'},
	        	] 	        	
	        },
	        { path: '/environment', component: environment, name: '企业环境数据',index:'24',},
	    ]      
    },
	{
		path: '/home',
		name: '生产加工管理',
		index:'3',
		component: home,
		iconCls: ' glyphicon glyphicon-wrench',
		children: [
	        { 
	        	path: '/menu',
	        	name: '生产基地管理' ,
	        	component: menu,
	        	index:'31',
				children:[
	        		{path: '/base', component: base, name: '茶园管理',index:'311'},
	        		{path: '/land', component: land, name: '地块管理',index:'312'},
	        		{path: '/farmWork', component: farmWork, name: '农事活动管理',index:'313'},
	        		{path: '/farmer', component: farmer, name: '农户管理',index:'314'},
	        	] 	        	
	        },
	        { 
	        	path: '/menu',
	         	component: menu,
	         	name: '加工信息管理',
	         	index:'32',
				children:[
	        		{path: '/stockPiles', component: stockPiles, name: '分堆记录',index:'331'},
	        		{path: '/productionRecord', component: productionRecord, name: '生产记录',index:'332'},
	        		{path: '/packageRecord', component: packageRecord, name: '包装记录',index:'333'},
	        		{path: '/traceCodeManage', component: traceCodeManage, name: '追溯码管理',index:'333'},
	        	] 	         	
	        },
	        { path: '/thirdpartyInspection', component: thirdpartyInspection, name: '质量检验管理' }
	    ]      
    },
	// {
	// 	path: '/home',
	// 	name: '企业业务管理',
	// 	component: home,
	// 	iconCls: 'text-info glyphicon glyphicon-user',
	// 	children: [
	//         { path: '/userRole', component: userRole, name: '操作权限管理' }
	//     ]      
 //    },
	// {
	// 	path: '/home',
	// 	name: '视频监控管理',
	// 	component: home,
	// 	iconCls: 'text-warning glyphicon glyphicon-film',
	// 	children: [
	//         { path: '/userRole', component: userRole, name: '企业内部视频管理'},
	//         { path: '/userRole', component: userRole, name: 'LED屏控制管理'},
	//     ]      
 //    }, 
	// {
	// 	path: '/home',
	// 	name: '消费者对接',
	// 	component: home,
	// 	iconCls: 'text-custom glyphicon glyphicon-resize-small',
	// 	children: [
	//         { path: '/userRole', component: userRole, name: '投诉管理'}
	//     ]      
 //    },                   

  ]

