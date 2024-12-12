import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors:{
      origin: "http://localhost:3000"
  }});
  app.useGlobalPipes(new ValidationPipe({
    // exceptionFactory: (erros)=>{
    //   const propsComProblema = erros.map(erro=>erro.property)
    //   const mensagem = `Programa inválido. Propriedades faltando ou incorretas: ${propsComProblema.join(", ")}`
    //   return new BadRequestException(mensagem)
    // },
    stopAtFirstError:true,
    /** Garante que apenas os campos especificados no DTO passem adiante */
    whitelist:true
  }))
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
