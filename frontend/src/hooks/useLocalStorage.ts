import { Usuario } from "@/model/Usuario";
export interface AuthOperations<T> {
	apagarInfo: () => Promise<void>;
	pegarNomeEmail: () => { nome: string; email: string } | undefined;
	salvarInfo: (u: Usuario) => void;
	pegarToken: () => string | undefined;
}

export function useLocalStorage<T>(): AuthOperations<T> {
	const chaveLocalStorage = "info-software";

	async function apagarInfo() {
		if (typeof window === "undefined") {
			return;
		}
		localStorage.removeItem(chaveLocalStorage);
	}

	function pegarNomeEmail() {
		if (typeof window === "undefined") {
			return;
		}
		const { nome, email } = JSON.parse(
			localStorage.getItem(chaveLocalStorage) || "{}"
		);
		return { nome, email } ;
	}

	function salvarInfo(u: Usuario) {
		if (typeof window === "undefined") {
			return;
		}
		localStorage.setItem(chaveLocalStorage, JSON.stringify(u));
	}

	function pegarToken() {
		if (typeof window === "undefined") {
			return;
		}
		const { token } = JSON.parse(
			localStorage.getItem(chaveLocalStorage) ?? "{}"
		);
		return token;
	}

	return {
		apagarInfo,
		pegarNomeEmail,
		salvarInfo,
		pegarToken,
	};
}
