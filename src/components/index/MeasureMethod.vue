<template>
    <ul class="list_box">
        <li>
            {{state.t("measure.title")}}
            <van-icon name="arrow-down" @click="emit('closePopup')" />
        </li>
        <li v-for="(item,i) in measureList" :key="i" >
            <img :src="item.img">
            <div>
                <div class="title">{{(i+1)}}.{{item.title}}</div>
                <div class="describe">{{item.describe}}</div>
                <div class="explain">{{item.explain}}</div>
            </div>
        </li>
        <li class="tip">
            <span>{{state.t("measure.tipsLable")}}</span><div>{{state.t("measure.tips")}}</div>
        </li>
    </ul>
</template>

<script setup>
import { reactive,defineEmits} from 'vue'
import { useI18n } from 'vue-i18n'
import img1 from '../../assets/images/01.jpg'
import img2 from '../../assets/images/02.jpg'
import img3 from '../../assets/images/03.jpg'
import img4 from '../../assets/images/04.jpg'
import img5 from '../../assets/images/05.jpg'

const state = reactive({
    t:useI18n().t,
    locale:useI18n().locale,
});
// 测量方法列表
const measureList = [
    {
        title:state.t("form.top"),
        describe:state.t("measure.topDescribe"),
        explain:state.t("measure.topExplain"),
        img:img1
    },
    {
        title:state.t("form.bottom"),
        describe:state.t("measure.bottomDescribe"),
        img:img2
    },
    {
        title:state.t("form.waist"),
        describe:state.t("measure.waistDescribe"),
        img:img3
    },
    {
        title:state.t("form.buttocks"),
        describe:state.t("measure.buttocksDescribe"),
        explain:'',
        img:img4
    },
    {
        title:state.t("form.leg"),
        describe:state.t("measure.legDescribe"),
        img:img5
    }
]
const emit = defineEmits(["closePopup"])

</script>

<style scoped>
    .list_box{
        background: #fff;
        width: 750px;
        margin: 0 auto;
        border-radius: 30px 30px 0 0;
        overflow: hidden;
    }
    .list_box>li{
        overflow: hidden;
        padding: 20px 0;
        border-bottom:2px solid rgb(175, 175, 175);
        margin: 0 33px; 
    }
    .list_box>li img{
        width: 195px;
        height: 123px;
        border-radius: 12px;
        float: left;
        border: 2px solid rgb(175, 175, 175);
    }
    .list_box>li>div{
        float: left;
        margin-left:25px;
        max-width: calc(100% - 3.5rem);
    }
    li .title{
        font-size: 28px;
        color: #606060;
        line-height: 46px;
        font-weight: bold;
    }
    li .describe{
        font-size: 22px;
        color: #606060;
        line-height: 42px;
    }
    li .explain{
        font-size: 22px;
        color: #999;
        line-height: 38px;
    }
    .list_box>li:first-child{
        line-height: 112px;
        color: #606060;
        margin: 0;
        padding: 0;
        padding-left:63px;
        padding-right:36px;
        font-size: 28px;
        font-weight: bold;
    }
    li.tip{
        width: 670px;
        font-size: 22px;
        color: #606060;
        border-bottom:0;
        line-height: 32px;
        display: flex;
    }
    li.tip>span{
        text-align: right;
    }
    li.tip>div{
        flex: 1;
        margin-left:0px;
        max-width: 750px !important;
    }
    li >>> .van-badge__wrapper{
        float: right;
        line-height: 112px;
        color: #ff5a5f;
        font-size: 33px;
        cursor: pointer;
    }
</style>