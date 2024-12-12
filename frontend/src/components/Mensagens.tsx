"use client";
import { useMensagens } from "@/hooks/useMensagens";
import { Botao } from "./template/Botao";

export default function MensagensComponent() {
	const { mensagens, removerMensagem } = useMensagens();

	return (
		<div className="fixed top-4 right-4 w-80 z-50">
			<ul className="space-y-2 bg-transparent">
				{mensagens.map((mensagem, index) => (
					<li
						key={index}
						className="bg-red-500 text-white p-3 rounded flex justify-between items-center"
					>
						<span>{mensagem}</span>
						<Botao
							onClick={() => removerMensagem(index)}
							texto="X"
							className="ml-4 bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
