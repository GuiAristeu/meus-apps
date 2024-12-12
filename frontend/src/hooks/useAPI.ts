import { useEffect, useState } from "react";
import Requisicao from "@/utils/Requisicao";
import { Programa } from "@/model/Programa";
import { Usuario } from "@/model/Usuario";
import { useMensagens } from "./useMensagens";
import { useLocalStorage } from "./useLocalStorage";

export interface Operacoes {
	programas: Programa[];
	salvar: (programa: Programa) => Promise<void>;
	excluir: (id: number) => Promise<void>;
	obterTodos: () => Promise<void>;
	obterPorId: (id: number) => Promise<Programa>;
	logar: (email: string, senha: string) => Promise<Usuario>;
	cadastrar: (nome: string, email: string, senha: string) => Promise<Usuario>;
}

export function useAPI() {
	const endpointProgramas = "programas";
	const endpointAuth = "auth";
	const [programas, setProgramas] = useState<Programa[]>([]);
	const { adicionarMensagem } = useMensagens();
	const { pegarToken } = useLocalStorage();

	useEffect(() => {
		const token = pegarToken();
		if (token) {
			Requisicao.adicionarToken(token);
		}
		obterTodos();
	}, []);

	async function obterTodos() {
		try {
			const dados = await Requisicao.get(`/${endpointProgramas}`);
			setProgramas(dados);
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	async function obterPorId(id: string) {
		try {
			const programa = await Requisicao.get(`/${endpointProgramas}/${id}`);
			return programa;
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	async function excluir(id: string) {
		try {
			await Requisicao.delete(`/${endpointProgramas}/${id}`);
			await obterTodos();
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	async function salvar(programa: Programa) {
		try {
			if ((programa as any).id) {
				await Requisicao.put(
					`/${endpointProgramas}/${(programa as any).id}`,
					programa
				);
			} else {
				await Requisicao.post(`/${endpointProgramas}`, programa);
			}
			await obterTodos();
			return true
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	async function logar(email: string, senha: string) {
		try {
			const dados = await Requisicao.post(`${endpointAuth}/login`, {
				email,
				senha,
			});
			if (dados.token) {
				Requisicao.adicionarToken(dados.token);
			}
			return { nome: dados.nome, email: dados.email, token: dados.token };
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	async function cadastrar(nome: string, email: string, senha: string) {
		try {
			const dados = await Requisicao.post(`${endpointAuth}/cadastrar`, {
				nome,
				email,
				senha,
			});
			return { nome: dados.nome, email: dados.email, token: dados.token };
		} catch (error: any) {
			adicionarMensagem(error.message);
			return null;
		}
	}

	return {
		programas,
		salvar,
		excluir,
		obterTodos,
		obterPorId,
		logar,
		cadastrar,
	};
}
