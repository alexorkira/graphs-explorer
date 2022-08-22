import axios from 'axios';
import { Auth } from '../models/Auth';
import { User } from '../models/User';
import { CommonService } from './common.service';

export class AuthService extends CommonService {
    private static baseUrl: string = String(process.env.REACT_APP_BACKEND_HOST);

    static async login(user: User): Promise<Auth> {
        try {
            return await AuthService.post<Auth>(`${AuthService.baseUrl}/auth`, user);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }

    static async logout(sessionToken: string | null): Promise<void> {
        try {
            await AuthService.post<void>(
                `${AuthService.baseUrl}/logout`,
                { session_token: sessionToken }
            );
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                throw e.response;
            }
            throw e;
        }
    }
}
