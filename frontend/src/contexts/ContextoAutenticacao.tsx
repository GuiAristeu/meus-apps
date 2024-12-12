"use client";
import { useAPI } from "@/hooks/useAPI";
import { Usuario } from "@/model/Usuario";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, ReactNode } from "react";

export interface ContextoAutenticacaoProps {
	cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
	logar: (email: string, senha: string) => Promise<boolean>;
	temLogado: () => boolean;
	deslogar: () => Promise<void>;
	pegarInfoUsuario: () => any;
}

export const ContextoAutenticacao = createContext<
	ContextoAutenticacaoProps | undefined
>(undefined);

export const AutenticacaoProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const API = useAPI();

	const { apagarInfo, pegarNomeEmail, pegarToken, salvarInfo } =
		useLocalStorage();

	async function logar(emailUsuario: string, senha: string) {
		const usuario: Usuario | null = await API.logar(emailUsuario, senha);
		if (!usuario) {
			return false;
		}
		salvarInfo(usuario);
		return true;
	}

	async function cadastrar(
		nomeUsuario: string,
		emailUsuario: string,
		senha: string
	) {
		const usuario: Usuario | null = await API.cadastrar(
			nomeUsuario,
			emailUsuario,
			senha
		);
		if (!usuario) {
			return false;
		}
		return logar(emailUsuario, senha);
	}

	async function deslogar() {
		return apagarInfo();
	}

	function pegarInfoUsuario() {
		return pegarNomeEmail();
	}

	function temLogado() {
		return !!pegarToken();
	}

	return (
		<ContextoAutenticacao.Provider
			value={{
				logar,
				cadastrar,
				deslogar,
				temLogado,
				pegarInfoUsuario,
			}}
		>
			{children}
		</ContextoAutenticacao.Provider>
	);
};
