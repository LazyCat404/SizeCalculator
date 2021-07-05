<template>
    <Logo></Logo>
    <Recommend></Recommend>
    <MySize></MySize>
</template>

<script setup>
import Logo from '@/components/recommend/Logo.vue'
import Recommend from '@/components/recommend/Recommend.vue'
import MySize from '@/components/recommend/MySize.vue'
import { reactive } from 'vue'

const state = reactive({
}) 
</script>