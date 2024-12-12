export default class Requisicao {
	static headers: any = {
		"Content-Type": "application/json",
	};

	static urlBase: string = process.env.NEXT_PUBLIC_API_URL || "";

	static set url(url: string) {
		const urlComBarra = url.endsWith("/") ? url : `${url}/`;
		Requisicao.urlBase = urlComBarra;
	}

	static async requisicaoGenerica(
		metodo: string,
		complementoURL: string,
		dadosBody?: any
	) {
		if (complementoURL.startsWith("/")) {
			complementoURL = complementoURL.substring(1);
		}
		try {
			const dados = await fetch(Requisicao.urlBase + `${complementoURL}`, {
				method: metodo,
				headers: Requisicao.headers,
				body: JSON.stringify(dadosBody),
			});

			const resultado = await dados.json();

			if (resultado.mensagem) {
				throw new Error(resultado.mensagem);
			}

			return resultado;
		} catch (error: any) {
			throw new Error(
				`Falha ao acessar a URL ${Requisicao.urlBase + `${complementoURL}`} ${
					error.message
				}`
			);
		}
	}

	static async get(complementoURL: string) {
		const resultado = await Requisicao.requisicaoGenerica(
			"GET",
			complementoURL
		);
		return resultado;
	}

	static async post(complementoURL: string, dadosBody: any) {
		const resultado = await Requisicao.requisicaoGenerica(
			"POST",
			complementoURL,
			dadosBody
		);
		return resultado;
	}

	static async put(complementoURL: string, dadosBody: any) {
		const resultado = await Requisicao.requisicaoGenerica(
			"PUT",
			complementoURL,
			dadosBody
		);
		return resultado;
	}

	static async patch(complementoURL: string, dadosBody: any) {
		const resultado = await Requisicao.requisicaoGenerica(
			"PATCH",
			complementoURL,
			dadosBody
		);
		return resultado;
	}

	static async delete(complementoURL: string) {
		const resultado = await Requisicao.requisicaoGenerica(
			"DELETE",
			complementoURL
		);
		return resultado;
	}

	static adicionarToken(token: string) {
		Requisicao.headers["Authorization"] = `Bearer ${token}`;
	}

	static removerToken() {
		delete Requisicao.headers["Authorization"];
	}
}
