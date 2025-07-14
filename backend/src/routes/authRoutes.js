const express = require("express")
const authController = require("../controllers/authController")

const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra um novo morador
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nome
 * - email
 * - password
 * - comunidadeId
 * properties:
 * nome:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * format: password
 * comunidadeId:
 * type: integer
 * responses:
 * 201:
 * description: Morador registrado com sucesso
 * 400:
 * description: Dados inválidos
 * 409:
 * description: Email já cadastrado
 */
router.post("/register", authController.register)

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Autentica um morador e retorna um token
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * format: password
 * responses:
 * 200:
 * description: Login bem-sucedido
 * 401:
 * description: Credenciais inválidas
 */
router.post("/login", authController.login)

module.exports = router