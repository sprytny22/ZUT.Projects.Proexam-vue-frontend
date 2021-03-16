import { getToken, getDetails } from '../../api/security';
import axios from "axios";
import Vue from 'vue';

export default {
    state: {
        logged_in: false,
        token: null,
        user: null,
        roles: []
    },
    getters: {
        TOKEN: state => state.token,
        LOGGED_IN: state => state.logged_in,
        USER: state => state.user,
        ROLES: state => state.roles,

        isGranted: state => currentRole => {

            let hasRole = false;

            state.roles.forEach(role => {
                if (role === currentRole) {
                    hasRole = true;
                }
            })

            return hasRole;
        }

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token.token;
        },
        SET_USER_DETAILS(state, details) {
            state.user = details.user;
            state.roles = details.roles;
        },
        SET_LOGGED_IN(state, logged_in) {
            state.logged_in = logged_in;
        }
    },
    actions: {
        async initToken({commit, state, getters}, credentials) {

            const token = await getToken(credentials);
            commit('SET_TOKEN', token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
            axios.interceptors.response.use(
                response => {
                    return response
                },
                async (error) => {
                    if (error.response && error.response.status === 401) {
                        commit('SET_LOGGED_IN', false);
                    }
                }
            )
            Object.defineProperties(Vue.prototype, {
                $isGranted: {
                    get() {
                        return getters.isGranted;
                    },
                },
            });

            const details = await getDetails();

            commit('SET_USER_DETAILS', details);
            commit('SET_LOGGED_IN', true);
        }
    }
}