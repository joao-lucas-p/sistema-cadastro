import { cpf } from 'cpf-cnpj-validator'; 


// Verifica se o valor inserido possui apenas os caracteres permitidos.

const validateName = (value) => {
	let re = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/);

	if(!re.test(value)) {
		return false;
	} else{
		return true;
	}
  }

// Verifica se o valor inserido é um CPF válido.

const validateCpf = (value) => {
	if (!cpf.isValid(value)){
		return false;
	} else{
		return true;
	}
}

// Verifica se o valor inserido está no formato de E-mail.
const validateEmail = (value) => {
	let re = /\S+@\S+\.\S+/;
  
      if(!re.test(value)) {
		return false;
      } else{
        return true;
	  }
}

export {
    validateCpf,
    validateName,
    validateEmail,
}