import { createApp } from 'vue'; // Sử dụng createApp từ Vue 3
import App from './App.vue';
import router from './router'; // Import Vue Router cấu hình
import store from './store';   // Import Vuex cấu hình

const app = createApp(App); // Tạo một instance của ứng dụng Vue

app.use(router); // Kết nối Vue Router với ứng dụng
app.use(store); // Kết nối Vuex với ứng dụng

app.mount('#app'); // Gắn ứng dụng vào một phần tử có id là "app"
