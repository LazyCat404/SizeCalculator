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
                <span>
                    如何测量
                </span>
            </div>
        </div>
        <div class="form_box">

        </div>
    </div>
</template>

<script setup>
import { api } from 'apis/base_api.js'
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
    }
    .title_form{
        font-size: 30px;
        color: #fff;
    }
    .form_box{}
</style>