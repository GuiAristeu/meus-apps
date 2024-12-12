import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { CriarProgramaDTO } from './dto/CriarProgramaDTO';
import { AtualizarProgramaDTO } from './dto/AtualizarProgramaDTO';
import { AdionarInseridoEmPipe } from 'src/pipes/adionar-inserido-em.pipe';
import { FormatarProgramaInterceptor } from 'src/interceptors/formatar-programa.interceptor';
import { CriarProgramaFilter } from 'src/filters/criar-programa.filter';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { EmailUsuario } from 'src/pegar-email/pegar-email.decorator';

@Controller('programas')
@UseGuards(JwtGuard)
export class ProgramasController {
    constructor(private readonly ProgramasService: ProgramasService) {}

  @Post()
  // @UsePipes(AdionarInseridoEmPipe)
  @UseFilters(CriarProgramaFilter)
  inserirUm(@Body(AdionarInseridoEmPipe) dadosPrograma: CriarProgramaDTO, @EmailUsuario() email:string){
    return this.ProgramasService.inserir(dadosPrograma, email);
  }

  @Get()
  @UseInterceptors(FormatarProgramaInterceptor)
  obterTodos(@EmailUsuario() email:string){
    return this.ProgramasService.obterTodos(email);
  }

  @Get(":id")
  @UseInterceptors(FormatarProgramaInterceptor)
  obterUm(@Param("id") id:string, @EmailUsuario() email:string){
    return this.ProgramasService.obterUm(+id, email)
  }

  @Put(":id")
  @UseInterceptors(FormatarProgramaInterceptor)
  Atualizar(@Param("id") id:string, @Body() programaAtualizado:AtualizarProgramaDTO, @EmailUsuario() email:string){
      return this.ProgramasService.atualizar(+id, programaAtualizado, email)
  }

  @Delete(":id")
  deletar(@Param("id") id:string, @EmailUsuario() email:string){
      return this.ProgramasService.deletar(+id, email)
  }
}
