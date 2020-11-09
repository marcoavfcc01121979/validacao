import { validarDataNascimento } from "./validaDataDeNascimento.js";
import { validarCPF } from './validarCPF.js';
import { recuperarEndereco } from './recuperarEndereco.js';
import { validarPreco } from './validarPreco.js';

const retornarMensagemDeErro = (tipo, validity) => {
  let mensagemDeErro = '';
  const tiposDeErro = [
    "valueMissing",
    "typeMismatch", 
    "tooShort",
    "rangeUnderflow",
    "customError",
    "patternMismatch"
  ];

  const mensagensDeErro = {
    email: {
      valueMissing: 'O e-mail é necessário',
      typeMismatch: 'Este não é um e-mail válido'
    },
    senha: {
      valueMissing: 'A senha é necessária',
      tooShort: 'A senha deve ter no minimo 6 caracteres',
    },
    dataNascimento: {
      valueMissing: 'A data de nascimento é necessária',
      rangeUnderflow: 'A data minima é 01/01/1960',
      customError: "A idade minima é de 18 anos"
    },
    cpf: {
      valueMissing: 'O CPF é necessário',
      customError: 'Este não é um cpf válido.'
    },
    rg: {
      valueMissing: 'O RG é necessário'
    },
    cep: {
      valueMissing: 'O CEP é necessário',
      patternMismatch: 'Este não é um CEP válido.',
      customError: 'Este não é um CEP válido.'
    },
    logradouro: {
      valueMissing: 'O Logradouro é necessário'
    },
    cidade: {
      valueMissing: 'A cidade é necessário'
    },
    estado: {
      valueMissing: 'O Estado é necessário'
    },
    preco: {
      valueMissing: 'O preco é necessario',
      customError: 'O Valor do produto deve ser maior que R$ 0'
    },
    nomeProduto: {
      valueMissing: 'O nome do produto é necessario'
    }
  };

  tiposDeErro.forEach(erro => {
    if(validity[erro]) {
      mensagemDeErro = mensagensDeErro[tipo][erro];
    }
  });

  return mensagemDeErro;
}

export const validarInput = (input, adicionarErro = true) => {

  const elementoEhValido = input.validity.valid;
  const classeElementoErro = "erro-validacao";
  const classeInputErro = "possui-erro-validacao";
  const elementoPai = input.parentNode;
  const elementoErroExiste = elementoPai.querySelector(
    `.${classeElementoErro}`
  );
  const elementoErro = elementoErroExiste || document.createElement("div");
  
  const tipo = input.dataset.tipo;
  const validadoresEspecificos = {
    dataNascimento: input => validarDataNascimento(input),
    cpf: input => validarCPF(input),
    cep: input => recuperarEndereco(input),
    preco: input => validarPreco(input)
  };

  if(validadoresEspecificos[tipo]) {
    validadoresEspecificos[tipo](input);
  }

  if(!elementoEhValido) {
    //não é valido
    elementoErro.className = classeElementoErro;
    elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
    if (adicionarErro) {
      input.after(elementoErro);
      input.classList.add(classeInputErro);
    }
  } else {   
    //é valido
    elementoErro.remove();
    input.classList.remove(classeInputErro);
  }
}