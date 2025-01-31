import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
// @ts-expect-error:next-line
import VueImageZoomer from 'vue-image-zoomer';
import 'vue-image-zoomer/dist/style.css';
const app = createApp(App);
app.use(VueImageZoomer);
app.use(router).mount('#app');
