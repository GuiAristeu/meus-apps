import { Body, Get, Module, Post } from '@nestjs/common';
import { ProgramasController } from './programas.controller';
import { ProgramasService } from './programas.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [ProgramasController],
  providers: [ProgramasService, AuthService]
})
export class ProgramasModule {}
