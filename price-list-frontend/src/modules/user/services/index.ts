import axios from 'axios';
import {UserLoginResponse} from "@/modules/user/models";

const baseUrl = 'http://localhost/users';

export class UserAPI {

    static async login(username: string, password: string) {
        return await axios.post<UserLoginResponse>(`${ baseUrl }/login`, {
            username, password
        });
    }
}