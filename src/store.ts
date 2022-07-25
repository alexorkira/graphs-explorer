import { action, Action, createContextStore, Thunk, thunk } from 'easy-peasy';
import { Auth } from './models/Auth';
import { User } from './models/User';
import { AuthService } from './services/auth.services';

export interface ContextStoreModel {
    sessionToken: string | undefined,
    setSessionToken: Action<ContextStoreModel, string | undefined>,
    login: Thunk<ContextStoreModel, User>,
    logout: Thunk<ContextStoreModel, string>,
}

const ContextStore = createContextStore<ContextStoreModel>(
    {
        sessionToken: localStorage.getItem("session_token") ?? undefined,
        setSessionToken: action((state, token) => {
            state.sessionToken = token;
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
                    actions.setSessionToken(res.session_token);
                })
                .catch(e => {
                    console.error("error", e);
                })
        ),
        logout: thunk(async (actions, token) => {
            await AuthService.logout(token);
            actions.setSessionToken(undefined);
        })
    }
);

export default ContextStore;
