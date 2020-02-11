class Auth {
    authenticated: boolean;
    constructor() {
        this.authenticated = false;
    }

    login(callback: any) {
        this.authenticated = true;
        callback();
    }

    logout(callback: any) {
        this.authenticated = false;
        callback();
    }

    isAuthenticated() {
        if (localStorage.getItem('authentication-token')) {
            this.authenticated = true;
        }
        return this.authenticated;
    }
}

export default new Auth();
