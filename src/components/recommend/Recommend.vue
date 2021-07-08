<template>
    <ul>
        <li v-for="(item,i) in state.list" :key="i">
            <img :src="item.img">
            <div>
                <div>{{item.text}}</div>
                <div class="size">{{item.size}}</div>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import img1 from '../../assets/images/img_05.png'
import img2 from '../../assets/images/img_07.png'
import img3 from '../../assets/images/img_09.png'
import img4 from '../../assets/images/img_14.png'
import img5 from '../../assets/images/img_15.png'
import img6 from '../../assets/images/img_16.png'
const route = useRoute()
const state = reactive({
    list:[{
        img:img1,
        text:useI18n().t("recommend.chest"),
        size:route.params.size1
    },{
        img:img2,
        text:useI18n().t("recommend.waist"),
        size:route.params.size2
    },{
        img:img3,
        text:useI18n().t("recommend.back"),
        size:route.params.size3
    },{
        img:img4,
        text:useI18n().t("recommend.pants"),
        size:route.params.size4
    },{
        img:img5,
        text:useI18n().t("recommend.long"),
        size:route.params.size5
    },{
        img:img6,
        text:useI18n().t("recommend.thin"),
        size:route.params.size6
    }],
})


</script>

<style scoped>
    ul{
        padding: 0 35px;
        width: 680px;
        overflow: hidden;
        flex-wrap: wrap; 
        display: flex;
        justify-content: space-evenly;
        margin-top:40px;
    }
    li{
        float: left;
        color: #fff;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }
    li img{
        width: 188px;
    }
    li>div{
        margin-top:10px;
        line-height: 45px;
        margin-bottom:45px;
    }
    div.size{
        font-size: 40px;
    }
</style>