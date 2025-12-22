import { createApp } from 'vue';
import App from './App.vue';
import '@/style.css';
import router from '@/router/index';
import { ElLoading } from 'element-plus'

const app = createApp(App);
app.use(ElLoading);
// app.use(router);

app.use(router).mount('#app');
