import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { validateCpf, validateEmail, validateName } from '../actions/validators';
import Input from './Input';




export default function Form(){

const [invalidForm, setInvalidForm] = useState(true);
const [inputValidation, setinputValidation] = useState({});
const [inputValues, setinputValues] = useState({});

const baseUrl = "Insira o endereço da sua API/Servidor aqui."


const handleFieldsValidation =  (id, isValid) => {

	 setinputValidation({ ...inputValidation, [id]: isValid});
}

const handleFieldsValue =  (id, value) => {

	 setinputValues({ ...inputValues, [id]: value});
}

useEffect (() => {
	
	let array = Object.keys(inputValidation).map(function (i){
		return inputValidation[i];
	})

	// Verifica se todos os campos foram preenchidos. Define a booleana "invalidForm" para true caso algum campo esteja em branco.

	if(array.length <= 2 || array.filter(e => e === false|| e === null ).length > 0){
		setInvalidForm(true);
	}
	else {
		setInvalidForm(false);
	}
 });


const handleSubmit = (e) => {
	e.preventDefault();
	submitForm();
	
};

// Requisita o envio do cadastro à API e retorna possiveis erros ao usuário.
const submitForm = async () => {

	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	await fetch(baseUrl + "/SEUENDEREÇO", { 
	method: 'POST',
	headers: myHeaders,
	body: JSON.stringify(inputValues),
	redirect: 'follow'})

	//Em caso de erro, retorna o erro como um alerta ao usuário.
	.then(response =>{
		if (response.status === 400 || response.status === 409){
			return response.text();
		} else
		if (response.status === 200){
			alert("Cadastro realizado com sucesso!");
	})
	.then((body) => {
		if (body !== null && body !== undefined){
			alert(body);
		}
	})
}


return (
	<div className="form">
        <div>
            <div id='card-principal'>
            <h1>Cadastre-se</h1>
				<form>
					<Input 
						id="1"
						label="Nome" 
						placeholder="Insira seu nome" 
						type="nome" 
						errorMessage="Este campo não aceita números nem caracteres especiais"
						validator={validateName}
						setFormValidation={handleFieldsValidation}
						setFormValue={handleFieldsValue}
					> </Input>

					<Input 
						id="2"
						label="Email" 
						placeholder="Insira seu e-mail" 
						type="email" 
						errorMessage="Insira um e-mail no padrão nome@email.com"
						validator={validateEmail}
						setFormValidation={handleFieldsValidation}
						setFormValue={handleFieldsValue}
					> </Input>

					<Input 
						id="3"
						label="CPF" 
						placeholder="Insira seu CPF" 
						type="cpf" 
						errorMessage="CPF inválido"
						validator={validateCpf}
						setFormValidation={handleFieldsValidation}
						setFormValue={handleFieldsValue}
					> </Input>

					<div className="caixa-cheia">
						<input disabled={invalidForm} onClick={handleSubmit} type="button" id="btn-enviar" value="Cadastrar"/>
						<p className="validacao-erro">{invalidForm ? "Preencha todas as informações." : ""}</p>
					</div>
					

				</form>
        	</div>
		</div>
	</div>
	
)};
