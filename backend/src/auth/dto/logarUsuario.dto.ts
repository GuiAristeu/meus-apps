import {IsString, IsEmail} from "class-validator"

export class LogarUsuarioDTO{
    @IsEmail()
    email:string;

    @IsString()
    senha:string;
}