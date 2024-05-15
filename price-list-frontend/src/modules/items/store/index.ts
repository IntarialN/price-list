import { Commit } from 'vuex';
import {ItemState} from "@/types/item";
import {ModelItem} from "@/modules/items/models";

export default {
    state: {
        items: [],
        pages: 0,
        itemsPerPage: 3,
        activePage: 1
    },
    mutations: {
        loadItems(state: ItemState, { items, pages }: { items: ModelItem[], pages?: number }) {
            state.items = items;
            state.pages = pages ?? 0;
            state.activePage = pages ? state.activePage : 1;
        },
        updateItems(state: ItemState, { items, pages }: { items: ModelItem[], pages?: number }) {
            state.items = items;
            state.pages = pages ?? 0;
            state.activePage = 1;
        },
        updateActivePage(state: ItemState, page: number) {
            state.activePage = page
        },
        newItem(state: ItemState, item: ModelItem) {
            state.items = [...state.items, item];
        },
        deleteItem(state: ItemState, id: number) {
            state.items = [...state.items.filter(item => item.id !== id)];
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
        load({ commit }: { commit: Commit }, { items, pages }: { items: ModelItem[], pages?: number }) {
            commit('loadItems', { items, pages });
        },
        update({ commit }: { commit: Commit }, { items, pages }: { items: ModelItem[], pages?: number }) {
            commit('updateItems', { items, pages });
        },
        updatePage({ commit }: { commit: Commit }, page: number) {
            commit('updateActivePage', page);
        },
        deleteItem({ commit }: { commit: Commit }, id: number) {
            commit('deleteItem', id);
        },
        create({ commit }: { commit: Commit }, item: ModelItem) {
            commit('newItem', item);
        },
        edit({ commit }: { commit: Commit }, item: ModelItem) {
            commit('editItem', item);
        }
    },
    getters: {
        items: (state: ItemState) => state.items,
        pages: (state: ItemState) => state.pages,
        itemsPerPage: (state: ItemState) => state.itemsPerPage,
        activePage: (state: ItemState) => state.activePage
    },
};