// Validação de Email com Regex Forte
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validação de Senha Forte (Mínimo 8 chars, letra, número, especial)
export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Deve conter letra maiúscula');
  if (!/[a-z]/.test(password)) errors.push('Deve conter letra minúscula');
  if (!/[0-9]/.test(password)) errors.push('Deve conter número');
  
  // Lista de senhas banidas
  const commonPasswords = ['12345678', 'password', 'senha123', 'admin'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Senha muito comum. Escolha outra.');
  }
  
  return errors; // Retorna array vazio se passar
};

// Validação de CPF Real (Algoritmo de Dígitos Verificadores)
export const validateCPF = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) 
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) 
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};