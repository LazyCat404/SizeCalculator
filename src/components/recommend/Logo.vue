<template>
    <div class="logo_box">
        <img src="../../assets/images/logo_03.png">
    </div>
    <div class="text">{{state.t("recommend.title1")}}</div>
    <div class="text">{{state.t("recommend.title2")}}</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
const state = reactive({
    t:useI18n().t,
})
</script>

<style scoped>
    .logo_box {
        margin-bottom:40px;
        text-align: center;
        padding-top:45px;
    }
    .logo_box img{
        width: 322px;
        height: 56px;
    }
    .text{
        text-align: center;
        font-size:30px;
        line-height: 48px;
        color: #fff;
        font-weight: bold;
    }
</style>