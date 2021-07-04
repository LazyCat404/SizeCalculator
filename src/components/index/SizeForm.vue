<template>
    <div class="title_logo">
        <div class="logo_box">
            <img src="../../assets/images/logo_03.png">
        </div>
        <div>调整型内衣智能尺码计算器</div>
    </div>
    <div class="form_body">
        <div class="title_form">
            <div>
                <span>基本信息</span>
                <span class="measure_btn">
                    <van-icon name="question-o" />
                    <span>如何测量</span>
                </span>
            </div>
        </div>
        <div class="form_box">
            <div>
                <span class="form_lable">上胸围</span>
                <van-field v-model="state.tBust" type="number" placeholder="请输入上胸围（cm）" />
            </div>
            <div>
                <span class="form_lable">下胸围</span>
                <van-field v-model="state.tBust" type="number" placeholder="请输入下胸围（cm）" />
            </div>
            <div>
                <span class="form_lable">臀围</span>
                <van-field v-model="state.tBust" type="number" placeholder="请输入臀围（cm）" />
            </div>
            <div>
                <span class="form_lable">腿围</span>
                <van-field v-model="state.tBust" type="number" placeholder="请输入腿围（cm）" />
            </div>
            <div>
                <span class="form_lable">验证码</span>
                <van-field v-model="state.tBust" type="number" placeholder="请输入验证码" />
                <span class="verification_code">1234</span>
            </div>
            <van-button color="#ff5a60">普通按钮</van-button>
        </div>
    </div>
</template>

<script setup>
import { api } from 'apis/base_api.js'
import { reactive } from 'vue';
const state = reactive({
    tBust: null,    // 上胸围
    bBust: null,    // 下胸围

});

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
    .form_box{
        width: 620px;
        margin-top: 22px;
        padding: 60px 30px;
        background: #fff;
        border-radius: 35px; 
        box-shadow:0px 1px 15px 2.5px #2e2d2f61;   
        margin-bottom: 20px;
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
</style>