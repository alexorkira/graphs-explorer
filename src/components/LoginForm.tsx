import React, { useState } from "react";
import Button from "../atoms/Button/Button";
import TextInput from "../atoms/TextInput/TextInput";
import Card from "../molecules/Card/Card";
import { AuthService } from "../services/auth.services";
import "./LoginForm.scss";

const LoginForm: React.FC = () => {
    const [ username, setUsername ] = useState<string>('');
    const [ usernameError, setUsernameError ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ passwordError, setPasswordError ] = useState<string>('');
    
    const login = async () => {
        setUsernameError(username === '' ? "Please insert the username" : '');
        setPasswordError(password === '' ? "Please insert the password" : '');
        if (username && password) {
            await AuthService.login({identifiant: username, password});
        }
    }

    return (
        <Card
            title={"Hello there!"}
            styleClass="login-form"
            children={<div>
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
            </div>}
            actions={<Button text="Login" action={login} />}
        />
    );
};

export default LoginForm;
