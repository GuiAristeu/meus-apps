import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class CriarProgramaFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const mensagem = `Programa inválido. Propriedades faltando ou incorretas: ${exception.response.message}`
    console.log(exception.response.message)
    const resposta = host.switchToHttp().getResponse()
    return resposta.status(400).json({
      mensagem
    })
  }
}
