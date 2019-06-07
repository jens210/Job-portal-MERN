import decode from 'jwt-decode';
class AuthService {

    constructor(auth_api_url) {
        this.auth_api_url = auth_api_url;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
    }

    login(username, password) {
        return this.fetch(this.auth_api_url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        })
    }

    loggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    // Checking if token is expired.
    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            console.log("expired token");
            return false;
        }
    };
    setToken(token) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(response => response.json());
    }
}

export default AuthService;
