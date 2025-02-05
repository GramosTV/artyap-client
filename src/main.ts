import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
// @ts-expect-error:next-line
import VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(VueImageZoomer);
app.use(router).use(createPinia()).mount('#app');
