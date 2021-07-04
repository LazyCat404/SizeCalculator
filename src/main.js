import { createApp } from 'vue'
import App from './App.vue'
import i18n from "./plugins/i18n";
import router from "./router";
import store from "./store";

import { 
    Icon,
    Field, 
    Button
} from 'vant';

import 'amfe-flexible/index.js';
import '@vant/touch-emulator';

import './assets/css/reset.css';
import './assets/css/border.css';
import './assets/css/base.css';

createApp(App)
    .use(Icon)
    .use(Field)
    .use(Button)
    .use(i18n)
    .use(store)
    .use(router)
    .mount('#app')
