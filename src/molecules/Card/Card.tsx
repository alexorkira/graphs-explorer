import React from "react";

interface CardProps {
    title: string;
    children: React.ReactNode | Array<React.ReactNode>,
    actions?: React.ReactNode | Array<React.ReactNode>
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className="chi-card -align--center">
        <div className="chi-card__content">
            <div className="chi-card__title">{props.title}</div>
            <div className="chi-card__caption">
                {props.children}
            </div>
            <div className="chi-card__actions">
                {props.actions}
            </div>
        </div>
     </div>
  );
};

export default Card;
