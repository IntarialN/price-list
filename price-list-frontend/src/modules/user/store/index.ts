import { Commit } from 'vuex';
import { User } from "@/types/user";

export default {
    state: {
        username: null,
        isAuthenticated: false,
    },
    mutations: {
        setUser(state: User, username: string | null) {
            state.username = username;
            state.isAuthenticated = true;
        },
        quit(state: User) {
            state.username = null;
            state.isAuthenticated = false;
        },
    },
    actions: {
        login({ commit }: { commit: Commit }, username: string | null) {
            commit('setUser', username);
        },
        quit({ commit }: { commit: Commit }, ) {
            commit('quit');
        }
    },
    getters: {
        user: (state: User) => state.username,
        isAuthenticated: (state: User) => state.isAuthenticated,
    },
};