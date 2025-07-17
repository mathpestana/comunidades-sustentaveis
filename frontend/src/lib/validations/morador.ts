export function validarMorador(data: {
  nome: string;
  idade: string;
  comunidade: string;
}) {
  const errors: { [key: string]: string } = {};

  if (!data.nome.trim()) {
    errors.nome = 'Nome é obrigatório.';
  }

  const idadeNum = Number(data.idade);
  if (!data.idade.trim() || isNaN(idadeNum) || idadeNum <= 0) {
    errors.idade = 'Idade válida é obrigatória.';
  }

  if (!data.comunidade.trim()) {
    errors.comunidade = 'Comunidade é obrigatória.';
  }

  return errors;
}
