<template>
  <h1>{{ msg }}</h1>
  <h1>{{ state.t('home') }}</h1>
  <button @click="change">change</button>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps({
  msg: String
})
const state = reactive({ 
  count: 0,
  t:useI18n().t,
  locale:useI18n().locale
})
function change() {
  if(state.locale == 'en'){
    state.locale = 'zn'
  }else{
    state.locale = 'en'
  }
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
