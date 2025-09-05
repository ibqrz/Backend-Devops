import {Router} from "express";
import {AlunoController} from "../controllers/alunoController";
import { authMiddleware } from "../middlewares/auth";

const alunoRouter = Router();
const aluno = new AlunoController();

alunoRouter.use(authMiddleware);

/**
 * @swagger
 * components:
 *  schemas:
 *      Aluno:
 *          type: object
 *          required:
 *              - nome
 *              - ra
 *          properties: 
 *              nome:
 *                  type: string
 *                  description: Nome do Aluno
 *              ra: 
 *                  type: string
 *                  description: Registro unico de Aluno              
 */

/**
 * @swagger
 * /aluno:
 *  get:
 *      summary: Lista todos os alunos
 *      tags: [Aluno]
 *      security:
 *          - bearerAuth: []
 *      responses: 
 *          200:
 *              description: Lista de alunos
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Aluno'
 */

alunoRouter.get("/", (req, res) => aluno.get(req, res));


/**
 * @swagger
 * /aluno:
 *  post:
 *      summary: Cadastrar um aluno
 *      tags: [Aluno]
 *      security:
 *          - bearerAuth: []
 *      requestBody: 
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Aluno'
 *      responses: 
 *          201:
 *              description: Aluno criado
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Aluno'
 */
alunoRouter.post("/", (req, res) => aluno.post(req, res));



alunoRouter.put("/:ra", (req, res) => aluno.put(req, res));

export default alunoRouter;