import axios from 'axios';
export const requestLogin = params => { return axios.post(`/api/api/1.0/ll/system/account/login`, params).then(res => res.data); };
export const getUserInfo = params => { return axios.post(`/api/api/1.0/ll/system/account/getUserInfo`, params).then(res => res.data); };
export const getCompanyFullName = params => { return axios.post(`/api/api/1.0/ll/enterprise/information/getCompanyExpand`, params).then(res => res.data); };
export const modifyPassword = params => { return axios.post(`/api/api/1.0/ll/system/account/modifyPassword`, params).then(res => res.data); };
export const logout = params => { return axios.post(`/api/api/1.0/ll/system/account/logout`, params).then(res => res.data); };
export const getUserRoleMaps = params => { return axios.post(`/api/api/1.0/ll/system/authority/getUserRoleMaps`, params).then(res => res.data); };
export const getUsersBycompanySid = params => { return axios.post(`/api/api/1.0/ll/system/account/getUsersBycompanySid`, params).then(res => res.data); };
export const getRoles = params => { return axios.post(`/api/api/1.0/ll/system/authority/getRoles`, params).then(res => res.data); };
export const addUserRoleMap = params => { return axios.post(`/api/api/1.0/ll/system/authority/addUserRoleMap`, params).then(res => res.data); };
export const deleteUserRoleMap = params => { return axios.post(`/api/api/1.0/ll/system/authority/deleteUserRoleMap`, params).then(res => res.data); };
export const getCompanyIndustry = params => { return axios.post(`/api/api/1.0/ll/dic/getCompanyIndustry`, params).then(res => res.data); };
export const getCompanyExpand = params => { return axios.post(`/api/api/1.0/ll/enterprise/information/getCompanyExpand`, params).then(res => res.data); };
export const getPhotoByParams = params => { return axios.post(`/api/api/1.0/ll/system/photo/getPhotoByParams`, params).then(res => res.data); };
// 员工管理页面
export const getDepartments = params => { return axios.post(`/api/api/1.0/ll/enterprise/department/getDepartments`, params).then(res => res.data); };
export const getEmployeesByPageNO = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/getEmployeesByPageNO`, params).then(res => res.data); };
export const getEmployeeInfByWorkNo = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/getEmployeeInfByWorkNo`, params).then(res => res.data); };
export const getProvince = params => { return axios.post(`/api/api/1.0/ll/enterprice/base/getProvince`, params).then(res => res.data); };
export const getCity = params => { return axios.post(`/api/api/1.0/ll/enterprice/base/getCity`, params).then(res => res.data); };
export const getCounty = params => { return axios.post(`/api/api/1.0/ll/enterprice/base/getCounty`, params).then(res => res.data); };
export const addEmployee = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/addEmployee`, params).then(res => res.data); };
export const deleteEmployee = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/deleteEmployee`, params).then(res => res.data); };
export const updateEmployeeInfo = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/updateEmployeeInfo`, params).then(res => res.data); };
export const getEducationsOfEmployees = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/getEducationsOfEmployees`, params).then(res => res.data); };
export const getAgesofEmployees = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/getAgesofEmployees`, params).then(res => res.data); };
// 部门管理
export const getDepartmentsByPageNo = params => { return axios.post(`/api/api/1.0/ll/enterprise/department/getDepartmentsByPageNo`, params).then(res => res.data); };
// 员工部门关系
export const getAllDepartmentsAndEmployees = params => { return axios.post(`/api/api/1.0/ll/enterprise/employee/getAllDepartmentsAndEmployees`, params).then(res => res.data); };
// 鲜叶管理
export const getProductsByCompanySidAndType = params => { return axios.post(`/api/api/1.0/ll/enterprise/product/getProductsByCompanySidAndType`, params).then(res => res.data); };
// 半成品管理
//export const getSemiFinishPro = params => { return axios.post(`/api/api/1.0/ll/enterprise/product/getProductsByCompanySidAndType`, params).then(res => res.data); };