<template>
    <div class="title">{{state.t("recommend.table")}}</div>
    <ul>
        <li v-for="(item,i) in state.list" :key="i" class="li_table">
            <div>{{item.title}}</div>
            <div>{{item.size}}</div>
        </li>
    </ul>
    <van-button color="#ff5a60" native-type="submit" @click="downImg">
        {{state.t("recommend.btn")}}
    </van-button>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { api } from '../../apis/base_api'

const route = useRoute()

const state = reactive({
    t:useI18n().t,
    list:[{
        title:useI18n().t("form.top"),
        size:route.params.tBust
    },{
        title:useI18n().t("form.bottom"),
        size:route.params.bBust
    },{
        title:useI18n().t("form.waist"),
        size:route.params.waist
    },{
        title:useI18n().t("form.buttocks"),
        size:route.params.buttocks
    },{
        title:useI18n().t("form.leg"),
        size:route.params.leg
    }]
})

// 图片下载
function downImg(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST',api.getImg(), true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        const data = xhr.response;
        const aLink = document.createElement('a');
        document.body.appendChild(aLink);
        aLink.style.display = 'none';
        const blob = new Blob([data],{ type:'image/jpeg' });
        const blobUrl = window.URL.createObjectURL(blob);
        aLink.download = new Date();
        aLink.href = blobUrl;
        aLink.click();
        document.body.removeChild(aLink);
    };
    let formData = new FormData();
    formData.append('filename',route.params.imgUrl);              
    xhr.send(formData);
}

</script>

<style scoped>
    .title{
        color: #fff;
        text-align: center;
        position:relative;
        font-size: 23px;
        top: 41.5px;
    }
    ul{
        padding-top:55px;
        margin: 0 auto;
        width: 620px;
        color: #fff;
        text-align: center;
        display: flex;
        border: 2px solid #757575;
        border-radius:10px 10px;
    }
    li.li_table{
        float: left;
        flex: 1;
        line-height: 55px;
        font-size: 23px;
    }
    li.li_table>div{
        border-top: 1px solid #757575;
        border-right: 1px solid #757575;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    li.li_table:last-child>div{
        border-right: 0;
    }
    .van-button{
        width: 597px;
        height: 82px;
        font-size: 28px;
        margin: 0 auto;
        display: block;
        margin-top:36px;
        margin-bottom:0.4rem;
        border-radius: 10px;
    }
</style>