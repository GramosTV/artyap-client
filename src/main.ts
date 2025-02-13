import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
// @ts-expect-error:next-line
import VueImageZoomer from 'vue-image-zoomer';
import VueDraggableGrid from '@noction/vue-draggable-grid';
import 'vue-image-zoomer/dist/style.css';
import '@noction/vue-draggable-grid/styles';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(VueImageZoomer);
app.use(VueDraggableGrid);
app.use(router).use(createPinia()).mount('#app');
