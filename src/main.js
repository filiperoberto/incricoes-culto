import { createApp } from 'vue';
import { store } from './vuex/store';
import App from './App.vue';
import mixins from './mixins/mixins';

const app = createApp(App);

app.use(store);
app.mixin(mixins)

app.mount('#app');