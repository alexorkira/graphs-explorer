import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import TextInput from '../../atoms/TextInput/TextInput';
import Card from '../../molecules/Card/Card';
import ContextStore from '../../store';
import './LoginForm.scss';

const LoginForm: React.FC = () => {
    const [ username, setUsername ] = useState<string>('');
    const [ usernameError, setUsernameError ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ passwordError, setPasswordError ] = useState<string>('');
    const dispatchLogin = ContextStore.useStoreActions((actions) => actions.session.login);

    const login = async () => {
        setUsernameError(username === '' ? 'Please insert the username' : '');
        setPasswordError(password === '' ? 'Please insert the password' : '');
        if (username && password) {
            await dispatchLogin({ identifiant: username, password });
        }
    };

    return (
        <Card
            title={'Hello there!'}
            styleClass="login-form"
            actions={<Button text="Login" action={login} />}
        >
            <div>
                <TextInput
                    label="username"
                    value={username}
                    setChange={setUsername}
                    messageError={usernameError}
                />
                <TextInput
                    label="password"
                    value={password}
                    setChange={setPassword}
                    messageError={passwordError}
                    hideText
                />
            </div>
        </Card>
    );
};

export default LoginForm;
