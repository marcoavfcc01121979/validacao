export const validarPreco = (input) => {
  const preco = input.formatToNumber();

  if(preco === 0) {
    input.setCustomValidity("O Valor do produto deve ser maior que R$ 0");
    return;
  }
  input.setCustomValidity("");
  return;
}