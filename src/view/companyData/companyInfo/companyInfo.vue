<template>
    <el-form :model="companyinfo" label-width="20%" ref="companyinfo.menu" class="infoForm">
        <el-form-item label="公司简称" prop="name">
            <el-input v-model="companyinfo.menu.companyShortName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司全称">
            <el-input v-model="companyinfo.menu.companyFullName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司编号">
            <el-input v-model="companyinfo.menu.companyNo" :min="0" :max="200"></el-input>
        </el-form-item>
        <el-form-item label="公司电话" prop="name">
            <el-input v-model="companyinfo.menu.companyPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司详址">
            <el-input v-model="companyinfo.menu.companyAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司工商注册号">
            <el-input v-model="companyinfo.menu.companyRegisterNo" :min="0" :max="200"></el-input>
        </el-form-item> 
        <el-form-item label="公司工商注册日期" >
            <el-date-picker v-model="companyinfo.menu.companyRegisterDate" auto-complete="off" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="厂商识别代码">
            <el-input v-model="companyinfo.menu.companyIdentificationNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属行业">
            <el-input v-model="companyinfo.menu.companyIndustry" :min="0" :max="200"></el-input>
        </el-form-item> 
        <el-form-item label="所属行业编码">
            <el-input v-model="companyinfo.menu.companyIndustryCode" :min="0" :max="200"></el-input>
        </el-form-item>        
        <el-form-item label="公司邮编">
            <el-input v-model="companyinfo.menu.companyZipCode" :min="0" :max="200"></el-input>
        </el-form-item>  
        <el-form-item label="公司官网">
            <el-input v-model="companyinfo.menu.companyWebsite" :min="0" :max="200"></el-input>
        </el-form-item> 
        <el-form-item label="查看企业照片">
            <el-button type="primary" @click="viewPhoto">查看企业照片</el-button>
        </el-form-item> 
        <el-dialog title="查看企业照片" :visible.sync="photoVisible" width="35%" :before-close="handleClose">
            <div >
                <swiper :options="swiperOption"  ref="mySwiper">  
                    <!-- 这部分放你要渲染的那些内容 -->  
                    <swiper-slide v-for="item in photoList"> 
                        <img :src="item.photoAddress" style="width:540px;height:330px;margin-left:40px;"> 
                    </swiper-slide>  
                    <!-- 这是轮播的小圆点 -->  
                    <div class="swiper-pagination" slot="pagination"></div> 
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>  
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="photoVisible = false">取 消</el-button>
                <el-button type="primary" @click="photoVisible = false">确 定</el-button>
            </span>
        </el-dialog>                                 
    </el-form>

</template>

<script type="text/javascript">
    import {getCompanyIndustry , getCompanyExpand ,getPhotoByParams } from '../../../service/getData'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        components: {  
            swiper,  
            swiperSlide  
        }, 
        data(){
            return{
               companyinfo:{
                menu:[],
               },
               photoVisible:false,
               photoList:[],
                swiperOption: {
                    pagination: '.swiper-pagination',  
                    slidesPerView: 'auto',  
                    centeredSlides: true,  
                    paginationClickable: true,  
                    spaceBetween: 30,  
                        onSlideChangeEnd: swiper => {  
                            //这个位置放swiper的回调方法  
                            this.page = swiper.realIndex+1;  
                            this.index = swiper.realIndex;  
                        },  
                },
                swiperSlides: [1, 2, 3, 4, 5],
               comData: {
                    "sessionId": sessionStorage.getItem('sessionId'),
                    "companySid": sessionStorage.getItem('companySid')                        
                },
            }
        }, 
        // computed: {  
  
        //     swiper() {  
        //       return this.$refs.mySwiper.swiper;  
        //     }  
        // },     
        mounted(){
            // this.swiper.slideTo(0, 0, false);
            // getDetailCompany(){
                // var comData = {
                //     "sessionId": sessionStorage.getItem('sessionId'),
                //     "companySid": sessionStorage.getItem('companySid')                        
                // };
                getCompanyExpand(this.comData).then(data=>{
                    if (data.code == 'N01') {
                        sessionStorage.setItem('companyIndustryCode',data.contents.companyIndustryCode);
                        data.contents.companyRegisterDate = new Date(data.contents.companyRegisterDate*1000);
                        this.companyinfo.menu =  data.contents;  
                    }    
                }),
            // },
            getCompanyIndustry({"sessionId": sessionStorage.getItem('sessionId')}).then(data=>{
                if (data.code == 'N01') {
                    console.log(data.message);
                }    
            })   
               
                  
        },

        methods:{
            viewPhoto(){
                this.photoVisible = true;
                var photoParams = {
                    "sessionId":sessionStorage.getItem('sessionId') ,
                    "companySid": sessionStorage.getItem('companySid'),
                    "type": "company"                       
                };
                getPhotoByParams(photoParams).then(data=>{
                    if (data.code == 'N01') {
                        this.photoList = data.contents;
                    }                        
                })
            } ,                
            handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
            },                    
        },
    }    
</script>

<style type="text/css">
    .infoForm{
        width: 50%;
        margin:20px auto;
    }   
</style>