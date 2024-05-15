import { createStore } from 'vuex';
import userModule from '@/modules/items/store/index';

export default createStore({
    modules: {
        user: userModule,
    },
});