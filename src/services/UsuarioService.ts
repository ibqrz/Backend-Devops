import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from "../repositories/UsuraioRepository";
import { UsuarioAttributes } from "../models/Usuario";

const JWT_SECRET = process.env.JWT_SECRET || 'PenaltiFoiPIX';

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async create(usuario: Omit<UsuarioAttributes, 'id'>) {
        const usuarioExistente = await this.usuarioRepository.findByEmail(usuario.email);
    
        if (usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        const senhaHash = await bcrypt.hash(usuario.senha, 10);
        await this.usuarioRepository.create({
            email: usuario.email,
            nome: usuario.nome,
            senha: senhaHash
        });

        return { message: 'usuario cadastrado com sucesso'};
    }

    async login(email: string, senha: string) {
        const usuario = await this.usuarioRepository.findByEmail(email);

        if (!usuario) {
            throw new Error('Credenciais invalidas');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error('Crendenciais invalidas');
        }

        const token = jwt.sign(
            {id: usuario.id, nome: usuario.nome},
            JWT_SECRET,
            {expiresIn: '1h'}
        )

        return { token };
    }
}