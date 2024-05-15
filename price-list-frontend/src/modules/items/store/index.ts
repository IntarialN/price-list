import { Commit } from 'vuex';
import {User, UserState} from "@/types/user";

export default {
    state: {
        username: 'dsadsa',
        isAuthenticated: false,
    },
    mutations: {
        setUser(state: User, username: string | null) {
            state.username = username;
            state.isAuthenticated = true;
        },
    },
    actions: {
        login({ commit }: { commit: Commit }, username: string | null) {
            commit('setUser', username);
        },
        logout({ commit }: { commit: Commit }) {
            commit('setUser', null);
        },
    },
    getters: {
        user: (state: User) => state.username,
        isAuthenticated: (state: User) => state.isAuthenticated,
    },
};