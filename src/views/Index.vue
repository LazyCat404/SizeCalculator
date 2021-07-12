<template>
    <SizeForm :init="state.init" ref="sizeForm" v-if="state.init.code && state.init.region"></SizeForm>
</template>

<script setup>
import SizeForm from '@/components/index/SizeForm.vue'
import { reactive,ref } from 'vue'
import { api } from '../apis/base_api'
import { Toast } from 'vant'
const sizeForm = ref();     // 获取 dom 节点
const state = reactive({
    init:{
        code:null,
        codeImg:null,
        region:null
    }
}) 
api.getRundata().then(res=>{
    if(res.result == 'SUCCESS'){
        if(res.data.country == 1){
            state.init.region = 'zh';
        }else if(res.data.country == 2){
            state.init.region = 'en';
        }else{
            state.init.region = 'ma';
        }
    } else{
        Toast.fail(res.message);
    }
})
api.getCode().then(res =>{
    if(res.result == 'SUCCESS'){
        state.init.code = res.data.code
        state.init.codeImg = res.data.url   // 二维码图片路径
    } else{
        Toast.fail(res.message);
    }
})

</script>