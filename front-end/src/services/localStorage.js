import history from '../utils/history';

const AUTH = 'VALIDC';

const storage = {
    login(data) {
        localStorage.setItem(AUTH, JSON.stringify(data));
    },
    update(email, username) {
        const user = JSON.parse(localStorage.getItem(AUTH));
        localStorage.setItem(AUTH, JSON.stringify({ ...user, username: username, email: email }));
    },
    getUser() {
        if (localStorage.getItem(AUTH)) {
            const user = JSON.parse(localStorage.getItem(AUTH));
            return user;
        }
    },
    getRoles() {
        if (localStorage.getItem(AUTH)) {
            const { roles } = JSON.parse(localStorage.getItem(AUTH));
            return roles;
        }
    },
    getToken() {
        if (localStorage.getItem(AUTH)) {
            const { accessToken } = JSON.parse(localStorage.getItem(AUTH));
            return accessToken;
        }
    },
    logout() {
        localStorage.removeItem(AUTH);
        history.push('/');
    },
}

export default storage;