import {IsString, IsEmail} from "class-validator"

export class CriarUsuarioDTO{
    @IsString()
    nome:string;

    @IsEmail()
    email:string;

    @IsString()
    senha:string;
}