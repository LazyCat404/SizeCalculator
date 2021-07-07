<template>
    <div>
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
    </div>
    <van-overlay :show="state.imgShow" @click="show = false">
        <div class="wrapper" @click.stop style="height: 100%;">
            <img :src="state.imgSrc"  class="serve_img"/>
        </div>
    </van-overlay>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { api } from '../../apis/base_api'
import { Toast } from 'vant';

const route = useRoute()

const state = reactive({
    imgShow:false,
    imgSrc:'',
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
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    if(flag){
        state.imgShow = true
        let message = '长按保持图片';
        if(route.params.region != 'zh'){
            route.params.region == 'en' ? message = 'en长按' : message = 'ma长按'
        }
        Toast({
            className:'custom_refresh_wrapper',
            duration:1000,
            message,
            position: 'bottom',
        });
        const xhr = new XMLHttpRequest();
        xhr.open('POST',api.getImg(), true);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            const data = xhr.response;
            const blob = new Blob([data],{ type:'image/jpeg' });
            state.imgSrc= window.URL.createObjectURL(blob);
        };
        let formData = new FormData();
        formData.append('filename',route.params.imgUrl);              
        xhr.send(formData);
    }else{
        state.imgShow = false
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
    .serve_img{
        height: 100%;
    }
</style>