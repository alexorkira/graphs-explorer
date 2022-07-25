import React from "react";

interface ButtonProps {
    text: string;
    action: () => void
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button 
        className="chi-button -primary" 
        onClick={() => props.action()}
    >
        {props.text}
    </button>
  );
};

export default Button;
