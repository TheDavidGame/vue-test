import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [] || localStorage.getItem("users"),
        usersInitial: [
            {
                id: 1,
                parent: "Марина",
                phone: "+7 941 123 21 42",
                nameChild: "Алёна"
            },
            {
                id: 2,
                parent: "Петр",
                phone: "+7 941 123 21 42",
                nameChild: "Алеша"
            },
            {
                id: 3,
                parent: "Петр",
                phone: "+7 941 123 21 42",
                nameChild: "Борис"
            },
            {
                id: 4,
                parent: "Алексей",
                phone: "+7 941 123 21 42",
                nameChild: "Иван"
            },
        ],

        headers: [
            {
                text: "Начальники",
                value: "parent"
            },
            { text: "Имя", value: "nameChild", groupable: false },
            { text: "Телефон", value: "phone", groupable: false, sortable: false },
            { text: " ", value: "actions", sortable: false, groupable: false }
        ],
        editedItem: {
            id: 0,
            parent: "Алексей",
            phone: 0,
            nameChild: "",
        },
        defaultItem: {
            parent: "Алексей",
            phone: 0,
            nameChild: ""
        },
        editedIndex: -1
    },
    getters: {
        GET_USERS(state) {
            return state.users
        },
        GET_USERS_INITIAL(state) {
            return state.usersInitial
        },
        GET_HEADERS(state) {
            return state.headers
        },
        GET_EDITED_ITEM(state) {
            return state.editedItem
        },
        GET_DEFAULT_ITEM(state) {
            return state.defaultItem
        },
        GET_EDITED_INDEX(state) {
            return state.editedIndex
        }
    },
    actions: {
        UPDATE_USERS({ commit }, user) {
            commit('SET_USERS', user)
        },
        UPDATE_EDITED_ITEM({ commit }, item) {
            commit('SET_EDITED_ITEM', item);
        },
        UPDATE_EDITED_INDEX({ commit }, index) {
            commit('SET_EDITED_INDEX', index)
        }
    },

    mutations: {
        SET_USERS: (state, user) => {
            state.users = state.users.concat(user)
        },
        SET_EDITED_ITEM: (state, item) => {
            state.editedItem = Object.assign({}, item)
        },
        SET_EDITED_INDEX: (state, index) => {
            state.editedIndex = index
        }
    },

})