import { createApp } from 'vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

import App from './App.vue'
import VueStore from './store'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App)
    .use(VueStore)
    .use(vuetify)
    .use(mdiVue, {
        icons: mdijs
    })
    .mount('#app')
