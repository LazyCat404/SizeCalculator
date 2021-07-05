<template>
    <div class="title_logo">
        <div class="logo_box">
            <img src="../../assets/images/logo_03.png">
        </div>
        <div>{{state.t("form.title")}}</div>
    </div>
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
                <van-dropdown-item :title="state.locale == 'en' ? '英文' : '中文'" v-model="state.locale" :options="state.option"/>
            </van-dropdown-menu>
        </div>
        <div class="form_box">
            <div>
                <span class="form_lable">{{state.t("form.top")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.inTop')" />
            </div>
            <div>
                <span class="form_lable">{{state.t("form.bottom")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.inBottom')" />
            </div>
            <div>
                <span class="form_lable">{{state.t("form.waist")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.inWaist')" />
            </div>
            <div>
                <span class="form_lable">{{state.t("form.buttocks")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.inButtocks')" />
            </div>
            <div>
                <span class="form_lable">{{state.t("form.leg")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.inLeg')" />
            </div>
            <div>
                <span class="form_lable">{{state.t("form.code")}}</span>
                <van-field v-model="state.tBust" type="number" :placeholder="state.t('form.code')" />
                <span class="verification_code">1234</span>
            </div>
            <van-button color="#ff5a60">{{state.t("form.compute")}}</van-button>
            <div class="tips">
                <div>
                    <span>{{state.t("measure.tipsLable")}} </span>
                    <div>{{state.t("form.tips")}}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model:show="state.showPopup" position="bottom" :style="{ background: 'transparent'}">
        <MeasureMethod v-if="state.showPopup" @closePopup="closePopup"></MeasureMethod>
    </van-popup>
</template>

<script setup>
import MeasureMethod from './MeasureMethod.vue'
import { api } from 'apis/base_api.js'
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'

const state = reactive({
    tBust: null,    // 上胸围
    bBust: null,    // 下胸围
    showPopup:false,
    t:useI18n().t,
    locale:useI18n().locale,
    option:[
        { text: '中文', value: 'zh' },
        { text: '英文', value: 'en' }
    ]
});
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
        border: 1px solid #fff;
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
        height: 150px;
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
        width: 165px;
        font-size: 22px;
        margin-left: 555px;
        padding: 5px 30px;
        border: 1px solid #ddd;
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
        width: 82PX;
        float: left;
        text-align: right;
    }
    .tips>div>div{
        float: left;
    }
</style>