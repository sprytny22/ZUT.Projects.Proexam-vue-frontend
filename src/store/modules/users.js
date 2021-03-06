import { getUsers } from '../../api/user';

export default {
    state: {
        users: []
    },
    getters: {
        USERS: state => state.users
    },
    mutations: {
        SET_USERS(state, payload) {
            state.users = payload;
        }
    },
    actions: {
        async GET_USERS({commit}) {
            const users = await getUsers();

            commit('SET_USERS', users)
        }
    }
}