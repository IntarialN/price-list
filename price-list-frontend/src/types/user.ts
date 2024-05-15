export interface UserState {
    user: User
}

export interface User {
    username: string | null;
    isAuthenticated: boolean;
}