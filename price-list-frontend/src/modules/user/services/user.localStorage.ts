class UserLocalStorage {
    private localStorageName: string = 'auth';

    public setAuthLocalStorage = (data: string) => {
        localStorage.setItem(this.localStorageName, data);
    };

    public checkAuthLocalStorage = () => {
        const data = localStorage.getItem(this.localStorageName);
        if (data) {
            return JSON.parse(data);
        }
        return false;
    };

    public clearAuthLocalStorage = () => {
        return localStorage.removeItem(this.localStorageName);
    };

    public parseLocalStorage = (token: string) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(val) {
            return '%' + ('00' + val.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
}

export default new UserLocalStorage()