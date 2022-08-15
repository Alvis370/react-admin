import store from 'store';

const USER_KEY = 'user_key';
const INDEX_KEY = 'index_key';

const storageUtils = {
    saveUser(user) {
        // localStorage.setItem(USER_KEY, JSON.stringify(user));
        store.set(USER_KEY, user);
    },

    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        return store.get(USER_KEY) || {};
    },

    removeUser() {
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    },

    saveIndex(path){
        store.set(INDEX_KEY, path);
    },

    getIndex() {
        return store.get(INDEX_KEY) || '/home';
    },

    removeIndex() {
        store.remove(INDEX_KEY);
    },
}

export default storageUtils;