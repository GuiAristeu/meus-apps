export enum Categoria {
	UTILITARIO = "utilitario",
	JOGO = "jogo",
	PRODUTIVIDADE = "produtividade",
	EDUCACAO = "educacao",
	OUTROS = "outros",
}

export interface Programa {
	id: string;
	nome: string;
	site: string;
	descricao: string;
	categoria: Categoria;
	gratuito: boolean;
	inseridoEm: Date;
	comentarios: string;
	idUsuario: string;
}
