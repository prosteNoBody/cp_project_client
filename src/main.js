import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faCoins, faList, faRedoAlt, faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faCoins, faList, faRedoAlt, faArrowLeft, faTimes);
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app');