const { Morador } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("../config/config")
const logger = require("../utils/logger")
const ApiError = require("../middlewares/errorMiddleware")

/**
 * Registra um novo morador
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const register = async (req, res, next) => {
    try {
        const { nome, email, senha, comunidadeId } = req.body

        if (!nome || !email || !senha || !comunidadeId) {
            throw new ApiError(400, "Todos os campos são obrigatórios: nome, email, senha e comunidadeId")
        }

        const hashedSenha = await bcrypt.hash(senha, 8)

        const novoMorador = await Morador.create({
            nome, 
            email, 
            senha: hashedSenha, 
            comunidadeId
        })

        novoMorador.senha = undefined // Não retornar a senha na resposta

        logger.info(`Novo morador registrado: ${novoMorador.email}`)
        res.status(201).json({ novoMorador })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            next(new ApiError(409, 'Email já cadastrado'))
        } else {
            logger.error(`Erro ao registrar morador: ${error.message}`)
            next(error)
        }
    }
}

/**
 * Autentica um morador e retorna um token JWT
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função next do Express
 */
const login = async (req, res, next) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            throw new ApiError(400, 'Email e senha são obrigatórios')
        }

        const morador = await Morador.findOne({ where: {email} })

        if (!morador) {
            throw new ApiError(401, "Dados inválidos")
        }

        const senhaValida = await bcrypt.compare(senha, morador.senha)

        if (!senhaValida) {
            throw new ApiError(401, "Dados inválidos")
        }

        const token = jwt.sign({ id: morador.id }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn
        })

        morador.senha = undefined

        res.json({ user: morador, token })
    } catch(error) {
        logger.error(`Erro no login: ${error.message}`)
        next(error)
    }
}

module.exports = {
    register, login
}