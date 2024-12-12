import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramasModule } from './programas/programas.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: 
  [ProgramasModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: "ola",
      signOptions: {expiresIn: "1d"}
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
