import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Auth } from '../models/Auth';
import { User } from '../models/User';
import { AuthService } from '../services/auth.services';

export interface SessionStoreModel {
    token: string | undefined,
    setToken: Action<SessionStoreModel, string | undefined>,
    login: Thunk<SessionStoreModel, User>,
    logout: Thunk<SessionStoreModel, string>,
}

export const sessionStoreInit: SessionStoreModel = {
    token: localStorage.getItem("session_token") ?? undefined,
    setToken: action((state, token) => {
        state.token = token;
        if (token) {
            localStorage.setItem("session_token", token);
        }
        else {  
            localStorage.removeItem("session_token");
        }
    }),
    login: thunk(async (actions, user) =>
        AuthService.login(user)
            .then((res: Auth) => {
                actions.setToken(res.session_token);
            })
            .catch(e => {
                console.error("error", e);
            })
    ),
    logout: thunk(async (actions, token) => {
        AuthService.logout(token);
        actions.setToken(undefined);
    })
};
