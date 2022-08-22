import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Auth } from '../models/Auth';
import { User } from '../models/User';
import { AuthService } from '../services/auth.services';

export interface SessionStoreModel {
    token: string | null,
    setToken: Action<SessionStoreModel, string | null>,
    login: Thunk<SessionStoreModel, User>,
    logout: Thunk<SessionStoreModel, string | null>,
}

export const sessionStoreInit: SessionStoreModel = {
    token: String(process.env.REACT_APP_STANDALONE_MODE) === 'on'
        ? 'standalone-mode'
        : localStorage.getItem('session_token'),
    setToken: action((state, token) => {
        state.token = token;
        if (token) {
            localStorage.setItem('session_token', token);
        } else {
            localStorage.removeItem('session_token');
        }
    }),
    login: thunk(async (actions, user) =>
        AuthService.login(user)
            .then((res: Auth) => {
                actions.setToken(res.session_token);
            })
            .catch(e => {
                console.error('error', e);
            })
    ),
    logout: thunk(async (actions, token) => {
        AuthService.logout(token)
            .finally(() => actions.setToken(null));
    })
};
