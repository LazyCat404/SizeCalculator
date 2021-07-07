<template>
    <!-- logo -->
    <div class="title_logo">
        <div class="logo_box">
            <img src="../../assets/images/logo_03.png">
        </div>
        <div>{{state.t("form.title")}}</div>
    </div>
    <!-- 表单 -->
    <div class="form_body">
        <div class="title_form">
            <div>
                <span>{{state.t("form.info")}}</span>
                <span class="measure_btn">
                    <van-icon name="question-o" />
                    <span @click="() =>{state.showPopup = true}">{{state.t("form.measure")}}</span>
                </span>
            </div>
            <van-dropdown-menu :overlay="false" z-index="99">
                <van-dropdown-item :title="state.locale == 'en' ? '英文' : `${state.locale == 'zh' ? '中文':'马来'}`" v-model="state.locale" :options="state.option"/>
            </van-dropdown-menu>
        </div>
        <van-form @submit="onSubmit">
            <div class="form_box">
                <div>
                    <span class="form_lable">{{state.t("form.top")}}(cm)</span>
                    <van-field 
                        v-model="state.form.tBust" 
                        type="number" 
                        :placeholder="state.t('form.inTop')" 
                        :rules="[
                            { required: true, message: `${state.t('form.inTop')}` },
                            { validator: fromCheck.top }
                        ]"
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.bottom")}}(cm)</span>
                    <van-field 
                        v-model="state.form.bBust" 
                        type="number" 
                        :placeholder="state.t('form.inBottom')" 
                        :rules="[
                            { required: true, message: `${state.t('form.inBottom')}` },
                            { validator: fromCheck.bottom }
                        ]"
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.buttocks")}}(cm)</span>
                    <van-field 
                        v-model="state.form.buttocks" 
                        type="number" 
                        :placeholder="state.t('form.inButtocks')"
                        :rules="[
                            { required: true, message: `${state.t('form.inButtocks')}` },
                            { validator: fromCheck.buttocks }
                        ]" 
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.waist")}}(cm)</span>
                    <van-field 
                        v-model="state.form.waist" 
                        type="number" 
                        :placeholder="state.t('form.inWaist')" 
                        :rules="[
                            { required: true, message: `${state.t('form.inWaist')}` },
                            { validator: fromCheck.waist }
                        ]"
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.leg")}}(cm)</span>
                    <van-field 
                        v-model="state.form.leg" 
                        type="number" 
                        :placeholder="state.t('form.inLeg')"
                        :rules="[
                            { required: true, message: `${state.t('form.inLeg')}` },
                            { validator: fromCheck.leg }
                        ]"  
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.code")}}</span>
                    <van-field 
                        v-model="state.form.code" 
                        type="number" 
                        :placeholder="state.t('form.code')" 
                        :rules="[
                            { required: true, message: `${state.t('form.incode')}` },
                            { validator: fromCheck.code }
                        ]"
                    />
                    <span class="verification_code">{{state.rCode}}</span>
                </div>
                <!-- 按钮 -->
                <van-button color="#ff5a60" native-type="submit">{{state.t("form.compute")}}</van-button>
                <!-- 提示 -->
                <div class="tips">
                    <div>
                        <span>{{state.t("measure.tipsLable")}} </span>
                        <div>{{state.t("form.tips")}}</div>
                    </div>
                </div>
            </div>
        </van-form>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="state.showPopup" position="bottom" :style="{ background: 'transparent'}">
        <MeasureMethod v-if="state.showPopup" @closePopup="closePopup"></MeasureMethod>
    </van-popup>
</template>

<script setup>
import MeasureMethod from './MeasureMethod.vue'
import { useRouter } from 'vue-router';
import { api } from 'apis/base_api.js'
import { useI18n } from 'vue-i18n'
import { reactive,defineProps} from 'vue'
import { Toast } from 'vant'
const props =  defineProps({
    init:Object
})
// 路由实列
const router = useRouter();
const state = reactive({
    form:{
        tBust: null,        // 上胸围
        bBust: null,        // 下胸围
        waist: null,        // 腰围
        buttocks: null,     // 臀围
        leg:null,           // 腿围
        code:null,          // 验证码
    },
    showPopup:false,// 显示弹出层
    t:useI18n().t,
    locale:useI18n().locale,
    option:[
        { text: '中文', value: 'zh' },
        { text: '英文', value: 'en' },
        { text: '马来', value: 'ma' }
    ],
    rCode:props.init.code  // 真实验证码
});
// 初始化地区
state.locale = props.init.region
state.rCode = props.init.code

// 表单验证
const fromCheck = {
    top:(val)=>{
        if( 75 <= val && val <= 127.5){
            if(val < state.form.bBust){
                return  state.t('tips.tp')
            }else{
                return true
            }
        }else{
            return  state.t('tips.tErr')
        }
    },
    bottom:(val)=>{
        if( 65 <= val && val <= 100){
            return true
        }else{
            return  state.t('tips.bErr')
        }
    },
    waist:(val)=>{
        if( 55 <= val && val <= 127){
            if(val > state.form.buttocks){
                return  state.t('tips.wb')
            }else{
                return true
            }
        }else{
            return  state.t('tips.wErr')
        }
    },
    buttocks:(val)=>{
        if( 79 <= val && val <= 128){
            return true
        }else{
            return  state.t('tips.dErr')
        }
    },
    leg:(val)=>{
        if( 42 <= val && val <= 74){
            return true
        }else{
            return  state.t('tips.lErr')
        }
    },
    code:(val)=>{
        if( val == state.rCode){
            return true
        }else{
            return  state.t('tips.code')
        }
    },
}
// 提交表单
function onSubmit(){
    // 表单验证通过
    api.submitForm({
        region:state.locale,    //地区
        bustTop: state.form.tBust,        // 上胸围
        bustDown: state.form.bBust,        // 下胸围
        waist: state.form.waist,        // 腰围
        hipline: state.form.buttocks,     // 臀围
        thigh:state.form.leg,           // 腿围
        captcha:state.form.code
    }).then(res => {
        if(res.result == "SUCCESS"){
            // 路由跳转
            router.push({
                name:'Recommend',
                params:{
                    tBust: state.form.tBust,        // 上胸围
                    bBust: state.form.bBust,        // 下胸围
                    waist: state.form.waist,        // 腰围
                    buttocks: state.form.buttocks,     // 臀围
                    leg:state.form.leg,           // 腿围
                    size1:res.data.bra, 
                    size2:res.data.lumbarForceps, 
                    size3:res.data.corset, 
                    size4:res.data.trousers, 
                    size5:res.data.longTrousers, 
                    size6:res.data.compressionPants,
                    imgUrl:res.data.image
                }
            })
        }else{
            // 错误提示
            Toast.fail(res.message);
        }
    })
}
// 关闭弹出层
function closePopup(){
    state.showPopup = false
}
</script>

<style scoped>
    .title_logo{
        height: 787px;
        background: url('../../assets/images/bg.png');
        background-size:100% 100%;
        text-align: center;
        padding-top:45px;
        font-size:33px;
        line-height: 33px;
        color: #fff;
    }
    .logo_box {
        margin-bottom:50px;
    }
    .title_logo img{
        width: 322px;
        height: 56px;
    }
    .form_body{
        position:absolute;
        top: 230px;
        padding: 0 35px;
    }
    .title_form{
        font-size: 30px;
        color: #fff;
        margin-left: 30px;
        position: relative;
    }
    .measure_btn{
        font-size:22px;
        margin-left:23px;
    }
    .measure_btn span{
        border-bottom: 1px solid #fff;
        cursor: pointer;
        margin-left:5px;
    }
    .van-dropdown-menu{
        width: 93px;
        height: 32px;
        float: right;
        border: .02px solid #fff;
        font-size: 22px;
        overflow: hidden;
        position: absolute;
        right: 0;
        bottom: 5px;
        border-radius: 5px;
    }
    .van-dropdown-menu >>> .van-dropdown-menu__bar{
        height: 32px;
        padding-right: 5px;
        background: transparent;
    }
    .van-dropdown-menu >>> .van-dropdown-menu__title{
        font-size: 22px;
        padding:0;
        padding-right:10px;
        color: #fff;
    }
    .van-dropdown-item{
        height: 220px;
        top: 264.01px;
        display:flex;
        justify-content: center;
    }
    .van-dropdown-item >>> .van-popup{
        background: transparent;
    }
    .van-dropdown-item >>> .van-dropdown-item__content{
        position: relative;
        width: 750px;
    }
    .van-dropdown-item >>> .van-cell {
        width: 230px;
        font-size: 22px;
        margin-left: 485px;
        padding: 5px 30px;
    }
    .van-cell{
        overflow: inherit;
    }
    .van-cell >>> .van-field__error-message{
        color: #ee0a24b3;
        position: absolute;
        font-size: 16px;
        top: 40px;
    }
    .van-dropdown-item >>> .van-cell:first-child {
        border-bottom:0 ;
        border-radius:5px 5px 0 0;
    }
    .van-dropdown-item >>> .van-cell:last-child {
        border-top:0 ;
        border-radius:0 0 5px 5px;
    }
    .form_box{
        width: 620px;
        margin-top: 22px;
        padding: 60px 30px;
        background: #fff;
        border-radius: 35px; 
        box-shadow:0px 1px 15px 2.5px #2e2d2f61;   
        margin-bottom: 70px;
    }
    .form_box>div{
        margin-bottom: 45px;
        position: relative;
    }
    .form_lable{
        font-size: 25px;
        color: #606060;
    }
    .van-field{
        padding: 0 5px;
        border-bottom:1px solid #999;
        font-size: 20px;
    }
    .van-button{
        width: 597px;
        height: 82px;
        font-size: 28px;
        margin: 0 auto;
        display: block;
        margin-top:70px;
        border-radius: 10px;
    }
    .verification_code{
        position: absolute;
        letter-spacing:2px;
        bottom: 5px;
        right: 5px;
        font-size: 24px;
        color: #5f5f5f;
    }
    .form_box>div.tips{
        font-size: 16px;
        margin: 0;
        margin-top:10px;
        line-height: 40px;
        color: #606060;
    }
    .tips>div{
        overflow: hidden;
        width: fit-content;
        margin: 0 auto;
        display: flex;
    }
    .tips>div>span{
        width: 100PX;
        float: left;
        text-align: right;
    }
    .tips>div>div{
        float: left;
    }
</style>