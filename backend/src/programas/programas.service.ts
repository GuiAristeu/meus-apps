import { Injectable } from '@nestjs/common';
import { CriarProgramaDTO } from './dto/CriarProgramaDTO';
import { AtualizarProgramaDTO } from './dto/AtualizarProgramaDTO';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProgramasService {

    constructor(private readonly authService:AuthService) {}
    
    private programas: any = [{
        "id": 0,
        "nome": "GIMP",
        "site": "https://www.gimp.org",
        "descricao": "GIMP é um editor de imagens gratuito e de código aberto.",
        "categoria": "UTILITARIO",
        "gratuito": true,
        "comentarios": "Tem me ajudado bastante a editar imagens.",
        "inseridoEm": Date.now(),
        "idUsuario": 1000
      },
      {
        "id": 1,
        "nome": "LibreOffice",
        "site": "https://www.libreoffice.org",
        "descricao": "LibreOffice é uma suíte de escritório gratuita e de código aberto.",
        "categoria": "UTILITARIO",
        "gratuito": true,
        "comentarios": "Uso o LibreOffice para todas as minhas necessidades de escritório.",
        "inseridoEm": Date.now(),
        "idUsuario": 1001
      },
      {
        "id": 2,
        "nome": "VLC Media Player",
        "site": "https://www.videolan.org/vlc/",
        "descricao": "VLC é um reprodutor multimídia gratuito e de código aberto.",
        "categoria": "MULTIMIDIA",
        "gratuito": true,
        "comentarios": "VLC é ótimo para reproduzir qualquer tipo de mídia.",
        "inseridoEm": Date.now(),
        "idUsuario": 1001
      }]

      proximoId = 5

      pegarIdUsuario(email:string) {
        const {id} = this.authService.pegarUsuarioPorEmail(email)
        return id
      }

    inserir(dadosPrograma: CriarProgramaDTO, emailUsuario: string){
        const idUsuario = this.pegarIdUsuario(emailUsuario)
        const programa = {id: this.proximoId++, ...dadosPrograma, idUsuario: idUsuario}
        this.programas.push(programa);
        return programa
    }

    obterTodos(email:string){
        const id = this.pegarIdUsuario(email)
        return this.programas.filter(programa=>+programa.idUsuario === +id)
    }

    obterUm(id:number, emailUsuario: string){
        const idUsuario = this.pegarIdUsuario(emailUsuario)
        return this.programas.find(programa => (programa.id === id && programa.idUsuario === idUsuario));
    }

    atualizar(id:number, programaAtualizado:AtualizarProgramaDTO, emailUsuario:string){
        const idUsuario = this.pegarIdUsuario(emailUsuario)
        const indice = this.programas.findIndex(programa => programa.id === id && programa.idUsuario === idUsuario);
        const programaNovo = {...this.programas[indice], ...programaAtualizado}
        console.log(programaAtualizado)
        this.programas[indice] = programaNovo
        return programaNovo
    }

    deletar(id:number, emailUsuario:string){
        const idUsuario = this.pegarIdUsuario(emailUsuario)
        const indice = this.programas.findIndex(programa => (programa.id === id && programa.idUsuario === idUsuario));
        const programa = this.programas.splice(indice, 1);
        return programa;
    }
}
