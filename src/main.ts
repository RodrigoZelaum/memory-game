import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GoogleLoginPlugin from 'vue3-google-login';
import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/auth';

const app = createApp(App);

app.use(createPinia());
app.use(GoogleLoginPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
});
app.use(router);
const auth = useAuthStore();
auth.loadUser();

app.mount('#app');
