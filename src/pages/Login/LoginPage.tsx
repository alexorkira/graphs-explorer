import React from "react";
import Card from "../../molecules/Card/Card";
import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
        <header>Graphs Explorer</header>
        <Card
            title={"Hello there!"}
            styleClass="login-form"
            children={<div>TBD: Login content</div>}
            actions={<button className="chi-button -primary">Login</button>}
        />
     </div>
  );
};

export default LoginPage;
