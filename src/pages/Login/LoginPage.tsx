import React from "react";
import Card from "../../molecules/Card/Card";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
        <Card
            title={"Hello there!"}
            children={<div>Test Card content</div>}
            actions={<button className="chi-button -primary">Login</button>}
        />
     </div>
  );
};

export default LoginPage;
