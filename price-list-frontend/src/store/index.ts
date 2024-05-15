import { createStore } from 'vuex';
import userModule from '@/modules/user/store/index';
import itemModule from '@/modules/items/store/index';

export default createStore({
    modules: {
        user: userModule,
        items: itemModule,
    },
});