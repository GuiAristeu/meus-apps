import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CriarUsuarioDTO } from './dto/criarUsuario.dto';
import { LogarUsuarioDTO } from './dto/logarUsuario.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    usuarios= [
        {"nome":"Ana",
            "email":"ana@mail.com",
            "senha":"123456",
            "id":1000},
        {"nome":"João",
            "email":"joao@mail.com",
            "senha":"123456",
            "id":1001}
    ]
    proximoId= 1002

    cadastrar(usuario:CriarUsuarioDTO){
        return this.usuarios.push({
            ...usuario,
            id: this.proximoId++
        })
    }

    logar(usuario:LogarUsuarioDTO){
        const {email, senha} = usuario

        const usuarioApp = this.usuarios.find(usuario=> usuario.email === email)

        if(!usuarioApp || usuarioApp?.senha !== senha){
            throw new UnauthorizedException()
        }

        const payload = {
            email: usuarioApp.email}

        return {
            nome: usuarioApp.nome,
            email: usuarioApp.email,
            token: this.jwtService.sign(payload)
        }
    }

    pegarUsuarioPorEmail(email:string){
        return this.usuarios.find((usuario)=> usuario.email === email)
    }
}
