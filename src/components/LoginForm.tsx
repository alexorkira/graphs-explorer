import React, { useState } from "react";
import Button from "../atoms/Button/Button";
import Card from "../molecules/Card/Card";
import "./LoginForm.scss";

const LoginForm: React.FC = () => {
    const [ username, setUsername ] = useState<String>("");
    const [ password, setPassword ] = useState<String>("");
    
    const login = () => {
        console.log("TBD: login");
        setUsername("urtoob");
        setPassword("ToobRU");
    }

    return (
        <Card
            title={"Hello there!"}
            styleClass="login-form"
            children={<div>
                <div>{username}</div>
                <div>{password}</div>
            </div>}
            actions={<Button text="Login" action={login} />}
        />
    );
};

export default LoginForm;
