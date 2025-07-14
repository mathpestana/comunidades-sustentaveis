const jwt = require('jsonwebtoken');
const { Morador } = require('../models');
const config = require('../config/config');
const { ApiError } = require('./errorMiddleware');
const logger = require('../utils/logger');

/**
 * Middleware para verificar a autenticação JWT
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrai o token do cabeçalho 'Bearer <token>'
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, config.jwt.secret);

      // Encontra o morador pelo ID que está dentro do token
      // e exclui a senha do retorno
      req.user = await Morador.findByPk(decoded.id, {
        attributes: { exclude: ['senha'] }
      });

      // Garante que o usuário do token ainda existe no banco
      if (!req.user) {
        return next(new ApiError(401, 'O usuário pertencente a este token não existe mais.'));
      }

      // Se tudo deu certo, vá para a próxima etapa (a rota em si)
      next();
    } catch (error) {
      logger.error(`Erro de autenticação: ${error.message}`);

      const apiError = new ApiError(401, 'Não autorizado, token inválido ou expirado.');
      
      return next(apiError);
    }
  }

  // Se não encontrou nenhum token
  if (!token) {
    return next(new ApiError(401, 'Não autorizado, nenhum token fornecido.'));
  }
};

module.exports = { protect };