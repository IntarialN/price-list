import { Commit } from 'vuex';
import {ItemState} from "@/types/item";
import {ModelItem} from "@/modules/items/models";

export default {
    state: {
        items: [{ id: 0, name: 'Tovar2', price: 100 }],
        pages: 10,
        itemsPerPage: 5
    },
    mutations: {
        loadItems(state: ItemState, data: { items: ModelItem[], pages?: number }) {
            state.items = data.items;
            state.pages = data.pages ?? 0;
        },
        newItem(state: ItemState, item: ModelItem) {
            state.items = [...state.items, item];
        },
        editItem(state: ItemState, item: ModelItem) {
            state.items = state.items
                .map(itemState =>
                    itemState.id === item.id ?
                        { ...item } :
                        itemState
                );
        },
    },
    actions: {
        load({ commit }: { commit: Commit }, items: ModelItem[], pages?: number) {
            commit('loadItems', { items, pages });
        },
        create({ commit }: { commit: Commit }, item: ModelItem) {
            commit('newItem', item);
        },
        edit({ commit }: { commit: Commit }, item: ModelItem) {
            commit('editItem', item);
        }
    },
    getters: {
        items: (state: ItemState) => state.items
    },
};