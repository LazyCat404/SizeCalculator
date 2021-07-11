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
        <van-form @submit="onSubmit" @failed="failed">
            <div class="form_box">
                <div>
                    <span class="form_lable">{{state.t("form.top")}}(cm)</span>
                    <van-field 
                        :class="state.style.top"
                        v-model="state.form.tBust" 
                        type="number" 
                        name="top"
                        @blur="blurInput('top',state.form.tBust)"
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
                        :class="state.style.bottom"
                        v-model="state.form.bBust" 
                        type="number" 
                        name="bottom"
                        @blur="blurInput('bottom',state.form.bBust)"
                        :placeholder="state.t('form.inBottom')" 
                        :rules="[
                            { required: true, message: `${state.t('form.inBottom')}` },
                            { validator: fromCheck.bottom }
                        ]"
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.waist")}}(cm)</span>
                    <van-field 
                        :class="state.style.waist"
                        v-model="state.form.waist" 
                        type="number" 
                        name="waist"
                        @blur="blurInput('waist',state.form.waist)"
                        :placeholder="state.t('form.inWaist')" 
                        :show-error='true'
                        :rules="[
                            { required: true, message: `${state.t('form.inWaist')}` },
                            { validator: fromCheck.waist }
                        ]"
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.buttocks")}}(cm)</span>
                    <van-field 
                        :class="state.style.buttocks"
                        v-model="state.form.buttocks" 
                        type="number" 
                        name="buttocks"
                        @blur="blurInput('buttocks',state.form.buttocks)"
                        :placeholder="state.t('form.inButtocks')"
                        :rules="[
                            { required: true, message: `${state.t('form.inButtocks')}` },
                            { validator: fromCheck.buttocks }
                        ]" 
                    />
                </div>
                <div>
                    <span class="form_lable">{{state.t("form.leg")}}(cm)</span>
                    <van-field 
                        :class="state.style.leg"
                        v-model="state.form.leg" 
                        name="leg"
                        type="number" 
                        @blur="blurInput('leg',state.form.leg)"
                        :placeholder="state.t('form.inLeg')"
                        :rules="[
                            { required: true, message: `${state.t('form.inLeg')}` },
                            { validator: fromCheck.leg }
                        ]"  
                    />
                </div>
                <div style="margin: 0;">
                    <span class="form_lable">{{state.t("form.code")}}</span>
                    <van-field 
                        :class="state.style.code"
                        v-model="state.form.code" 
                        type="number" 
                        name="code"
                        @blur="blurInput('code',state.form.code)"
                        :placeholder="state.t('form.code')" 
                        :rules="[
                            { required: true, message: `${state.t('form.incode')}` },
                            { validator: fromCheck.code }
                        ]"
                    />
                    <img :src="state.imgSrc" class="verification_code">
                    <!-- <span class="code_layer"></span> -->
                    <!-- <span class="verification_code">{{state.rCode}}</span> -->
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
    <van-popup 
        :transition-appear='true'
        :lazy-render='false'
        v-model:show="state.showPopup" 
        position="bottom" 
        :style="{ background: 'transparent'}"
    >
        <MeasureMethod @closePopup="closePopup"></MeasureMethod>
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
    rCode:props.init.code,  // 真实验证码
    imgSrc:'',
    style:{
        top:null,
        bottom:null,
        waist: null,        // 腰围
        buttocks: null,     // 臀围
        leg:null,           // 腿围
        code:null,   
    }
});
// 初始化地区
state.locale = props.init.region
state.rCode = props.init.code
// 验证码图片
function drawLogo(text) {
    // 创建画布
    let canvas = document.createElement('canvas');
    // 绘制文字环境
    let context = canvas.getContext('2d');
    // 获取字体宽度
    let width = context.measureText(text).width;
    // 画布宽度
    canvas.width = 61;
    // 画布高度
    canvas.height = 25;
    // 填充白色
    context.fillStyle = '#FEFFFA';
    // 绘制文字之前填充白色
    context.fillRect(0, 0, canvas.width, canvas.height);
    // 设置字体
    context.font = '0.32rem 苹方黑体';
    // 设置水平对齐方式
    context.textAlign = 'center';
    // 设置垂直对齐方式
    context.textBaseline = 'middle';
    // 设置字体颜色
    context.fillStyle = '#5f5f5f';
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    // 生成图片信息
    let dataUrl = canvas.toDataURL('image/png');
    return dataUrl;
}
state.imgSrc = drawLogo(state.rCode)
// 表单验证
const fromCheck = {
    top:(val)=>{
        state.style.top='borderRed'
        if( 75 <= val && val <= 127.5){
            if(val < state.form.bBust){
                return  state.t('tips.tp')
            }else{
                state.style.top = null
                return true
            }
        }else{
            return  state.t('tips.tErr')
        }
    },
    bottom:(val)=>{
        state.style.bottom='borderRed'
        if( 65 <= val && val <= 100){
            state.style.bottom=null
            return true
        }else{
            return  state.t('tips.bErr')
        }
    },
    waist:(val)=>{
        state.style.waist='borderRed'
        if( 55 <= val && val <= 127){
            if(val > state.form.buttocks){
                return  state.t('tips.wb')
            }else{
                state.style.waist=null
                return true
            }
        }else{
            return  state.t('tips.wErr')
        }
    },
    buttocks:(val)=>{
        state.style.buttocks='borderRed'
        if( 79 <= val && val <= 128){
            state.style.buttocks=null
            return true
        }else{
            return  state.t('tips.dErr')
        }
    },
    leg:(val)=>{
        state.style.leg='borderRed'
        if( 42 <= val && val <= 74){
            state.style.leg=null
            return true
        }else{
            return  state.t('tips.lErr')
        }
    },
    code:(val)=>{
        state.style.code='borderRed'
        if( val == state.rCode){
            state.style.code=null
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
                    imgUrl:res.data.image,
                    region:state.locale,    //地区
                }
            })
        }else{
            // 错误提示
            Toast.fail(res.message);
        }
    })
}
function failed(obj){
    // 提示第一个
    Toast({
        message: obj.errors[0].message,
        position: 'bottom',
    });
    // 边框变红
    state.style = {
        top:null,
        bottom:null,
        waist: null,        // 腰围
        buttocks: null,     // 臀围
        leg:null,           // 腿围
        code:null,   
    }
    obj.errors.forEach(item => {
        state.style[item.name] = 'borderRed'
    })
}
function blurInput(type,val){
    if(val){
        let msg = fromCheck[type](val)
        if(msg !== true){
            Toast({
                message: fromCheck[type](val),
                position: 'bottom',
            });
        }
    }
}
// 关闭弹出层
function closePopup(){
    state.showPopup = false
}
</script>

<style scoped>
    .title_logo{
        height: 762px;
        background: url('../../assets/images/bg.png');
        background-size:100% 100%;
        text-align: center;
        padding-top:45px;
        font-size:32px;
        font-weight: bold;
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
        padding: 0 34px 72px 33px;
    }
    .title_form{
        font-size: 32px;
        font-weight: bold;
        color: #fff;
        margin-left: 30px;
        position: relative;
    }
    .measure_btn{
        font-size:24px;
        margin-left:23px;
        font-weight: 400;
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
        border: 1.5px solid #fff;
        font-size: 24px;
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
    .van-cell::after{
        border: 0;
    }
    .van-cell >>> .van-field__error-message{
        display: none;
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
        width: 623px;
        margin-top: 22px;
        padding: 60px 30px;
        margin-bottom: 72px;
        background: #FEFFFA;
        box-shadow: 0px 0px 23px 3px rgba(46, 45, 47, 0.38);
        border-radius: 40px;
    }
    .form_box>div{
        margin-bottom: 48px;
        position: relative;
    }
    .form_lable{
        font-size: 28px;
        color: #606060;
    }
    .van-field{
        padding: 0px;
        /* border-bottom:1px solid #999; */
        font-size: 24px;
    }
    .van-field>>>.van-field__value{
        line-height: 43px;
    }
    .form_box>>>.van-field__control{
        background-color: #FEFFFA;
        border-bottom:1.5px solid #999;
    }
    .borderRed >>> .van-field__control{
        background-color: #FEFFFA;
        border-bottom:1.5px solid red;
    }
    .van-button{
        width: 595px;
        height: 82px;
        font-size: 32px;
        font-weight: bold;
        margin: 0 auto;
        display: block;
        margin-top:45px;
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
        width: 595px;
        font-size: 14px;
        margin: 0 auto;
        font-weight: bold;
        margin-top:19px;
        color: #606060;
    }
    .tips>div{
        overflow: hidden;
        width: fit-content;
        margin: 0 auto;
        display: flex;
    }
    .tips>div>span{
        float: left;
        text-align: right;
    }
    .tips>div>div{
        flex: 1;
        float: left;
    }
    .code_layer{
        display: inline-block;
        width: 80px;
        height: 50px;
        top: 30px;
        background: transparent;
        position: absolute;
        right: 0;
        z-index: 999;
    }
</style>