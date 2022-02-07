import { useState } from 'react';

export default function Input(props){

// State que lida com alterações nos valores do inputs
const [value, setValue] = useState("");

// State que lida com alterações na validação do input
const [isValid, setIsValid] = useState(true);


// Lida com a mudança de valores no Input
const handleInput = (e) => {
	let value = e.target.value;
    setValue(value);

    props.setFormValidation(e.target.id, props.validator(e.target.value));
    props.setFormValue(props.type, e.target.value);

};

// Lida com a validação do Input
const handleErrors = (e) => {
    setIsValid(props.validator(e.target.value));
}


return (

    <div className="caixa-cheia">
        <label className="label">{props.label}</label>
        <input onChange={handleInput} onBlur={handleErrors} className="field" placeholder={props.placeholder} id={props.id}
        value={value} type={props.type}  />
        <p className="validacao-erro">{isValid ? "" : props.errorMessage}</p>
    </div>
	
)};