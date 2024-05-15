class UserLocalStorage {
    private localStorageName: string = 'auth';

    public setAuthLocalStorage = (data: string) => {
        localStorage.setItem(this.localStorageName, data);
    };

    public checkAuthLocalStorage = () => {
        const data = localStorage.getItem(this.localStorageName);
        if (data) {
            return data;
        }
        return false;
    };

    public clearAuthLocalStorage = () => {
        return localStorage.removeItem(this.localStorageName);
    };
}

export default new UserLocalStorage()