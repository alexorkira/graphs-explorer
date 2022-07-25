import { action, Action, createContextStore, persist, Thunk, thunk } from 'easy-peasy';
import { Auth } from './models/Auth';
import { User } from './models/User';
import { AuthService } from './services/auth.services';

export interface ContextStoreModel {
    sessionToken: string | undefined,
    setSessionToken: Action<ContextStoreModel, string>,
    login: Thunk<ContextStoreModel, User>,
}

const ContextStore = createContextStore<ContextStoreModel>(
    persist({
        sessionToken: undefined,
        setSessionToken: action((state, token) => {
            state.sessionToken = token;
        }),
        login: thunk(async (actions, user) =>
            AuthService.login(user)
                .then((res: Auth) => {
                    actions.setSessionToken(res.session_token);
                })
                .catch(e => {
                    console.error("error", e);
                })
        )
    })
);

export default ContextStore;
