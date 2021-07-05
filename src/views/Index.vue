<template>
    <SizeForm :init="state.init"></SizeForm>
</template>

<script setup>
import SizeForm from '@/components/index/SizeForm.vue'
import { reactive } from 'vue'

const state = reactive({
    init:{
        code:1234,
        region:'zh'
    }
}) 
</script>