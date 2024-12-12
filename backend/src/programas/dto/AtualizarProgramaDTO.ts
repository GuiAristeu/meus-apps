import {IsNotEmpty, IsString, IsBoolean, IsOptional} from "class-validator"

export class AtualizarProgramaDTO{
    @IsOptional()
    @IsString()
    Nome?:string
    @IsOptional()
    @IsString()
    Site?:string
    @IsOptional()
    @IsString()
    Descrição?:string
    @IsOptional()
    @IsString()
    Categoria?:string
    @IsOptional()
    @IsBoolean()
    Gratuito?:boolean
    @IsOptional()
    @IsString()
    Comentários?:string
}