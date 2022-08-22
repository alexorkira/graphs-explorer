import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
    return (
        <div className="login-page">
            <header>Graphs Explorer</header>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
