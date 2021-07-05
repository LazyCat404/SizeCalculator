<template>
    <div class="wrapper">
        <Logo></Logo>
        <Recommend></Recommend>
        <MySize></MySize>
    </div>
</template>

<script setup>
import Logo from '@/components/recommend/Logo.vue'
import Recommend from '@/components/recommend/Recommend.vue'
import MySize from '@/components/recommend/MySize.vue'
import { reactive } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 无参数路由跳转
if(!route.params.tBust){
    router.push('/')          
}
 
</script>

<style scoped>
    .wrapper{
        width: 750px;
        height: 100%;
        background: url("../assets/images/bg2.jpg");
        background-size:100% 100%;
        overflow: auto;
    }
    .wrapper::-webkit-scrollbar{
        display: none;
    }

</style>