import React from 'react';
import './TextInput.scss';

interface TextInputProps {
    label: string;
    value: string;
    messageError?: string;
    setChange: (value: string) => void;
    hideText?: boolean

}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
    const { messageError } = props;

    const handleChange = (event: { target: { value: string; }; }) => {
        props.setChange(event.target.value);
    };

    return (
        <div className="text-input chi-form__item">
            <label className="chi-label">{props.label}</label>
            <input
                type={`${props.hideText ? 'password' : 'text'}`}
                className={`chi-input ${messageError ? '-danger' : ''}`}
                onChange={handleChange}
            />
            {messageError &&
                <div className="chi-label -status -danger">{messageError}</div>
            }
        </div>
    );
};

export default TextInput;
