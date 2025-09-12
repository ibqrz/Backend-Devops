import { Request, Response } from "express";
import { AlunoService } from '../services/AlunoService';

export class AlunoController {
    private alunoService: AlunoService;

    constructor() {
        this.alunoService = new AlunoService();
    }

    async get(req: Request, res: Response) : Promise<Response> {
        const alunos = await this.alunoService.getAll();
        return res.json(alunos);
    } 

    async post(req: Request, res: Response) : Promise<Response> {
        const{ ra, nome, email } = req.body;
        const novoAluno = await this.alunoService.create({email, nome, ra});

        return res.status(201).json(novoAluno);
    }

    async put(req: Request, res: Response) : Promise<Response> {
        // const ra = req.params.ra;
        // const alunoIndex = this.alunos.findIndex(a => a.ra == ra)

        // if (alunoIndex > -1) {
        //     const { nome } = req.body;

        //     this.alunos[alunoIndex] = { ra: ra, nome: nome };
        //     return res.json({ ra: ra, nome: nome });

        // } else {
        //     return res.status(404).json({"message":"assinnou a chamada e vazou"})
        // }

        return res.json();
    }
}