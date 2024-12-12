import {IsNotEmpty, IsString, IsBoolean, IsOptional} from "class-validator"

export class CriarProgramaDTO{
    @IsNotEmpty({message: "nome"})
    @IsString({message: "nome"})
    nome:string
    @IsNotEmpty({message: "site"})
    @IsString({message: "site"})
    site:string
    @IsNotEmpty({message: "descricao"})
    @IsString({message: "descricao"})
    descricao:string
    @IsNotEmpty({message: "categoria"})
    @IsString({message: "categoria"})
    categoria:string
    // @IsBoolean({message: "gratuito"})
    gratuito?:boolean
    @IsOptional()
    @IsString()
    comentarios?:string
}