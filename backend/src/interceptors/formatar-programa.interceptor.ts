import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

function formatarPrograma(programa: any, ){
  if(!programa?.inseridoEm){
    throw new Error("Programa não existe")
  }
  const dataFormatada = new Intl.DateTimeFormat("pt-BR").format(programa.inseridoEm)
          return {...programa, 
            inseridoEm: dataFormatada,
            gratuito: programa.gratuito ? "Sim" : "Não"
          }
}

@Injectable()
export class FormatarProgramaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((observer) => {
      next.handle().subscribe({
        next: (dadosParaFormatar)=>{
          try {
            if(Array.isArray(dadosParaFormatar)){
              const dadosFinais = dadosParaFormatar.map(formatarPrograma)
              observer.next(dadosFinais)
            }else{
              observer.next(formatarPrograma(dadosParaFormatar))
            }
            observer.complete()
            
          } catch (error) {
            const resposta = context.switchToHttp().getResponse()
            return resposta.status(404).json({mensagem: error.message})
          }
        }
      })
    })
  }
}
