"use client";
import Link from "next/link";
import { IconeEdicao, IconeLixo } from "./template/Icones";
import { useAPI } from "@/hooks/useAPI";

interface TabelaProps {
	acoes?: boolean;
}

export default function (props: TabelaProps) {
	const { programas, excluir } = useAPI();

	const colunas = [
		"id",
		"nome",
		"site",
		"descricao",
		"gratuito",
		"categoria",
		"comentarios",
		"inseridoEm",
		"idUsuario",
	];
	function gerarCabecalho() {
		return (
			<tr className="text-center fundo-gradiente">
				{colunas.map((coluna) => (
					<th key={coluna} className="p-4">
						{coluna.charAt(0).toUpperCase() + coluna.slice(1)}
					</th>
				))}
				{props.acoes && <th className="p-4">Ações</th>}
			</tr>
		);
	}

	function gerarLinhas() {
		if (programas.length === 0 || !programas || !programas.map) return null;

		return programas.map((item: any, i) => (
			<tr
				key={i}
				className={`${i % 2 === 0 ? "bg-rose-50" : "bg-rose-100"} text-center`}
			>
				{colunas.map((chave) => (
					<td key={chave} className="p-4">
						{item[chave]}
					</td>
				))}
				{props.acoes && acoes(item.id)}
			</tr>
		));
	}

	function acoes(id: string) {
		return (
			<td>
				<div className="flex">
					<button
						className={`
						flex justify-center programas-center
						text-green-700 rounded-full p-2 m-1
						hover:bg-rose-300
						`}
					>
						<Link href={`/programas/editar/${id}`}>{IconeEdicao}</Link>
					</button>

					<button
						onClick={() => {
							excluir(id);
						}}
						className={`
						flex justify-center programas-center
						text-red-700 rounded-full p-2 m-1
						hover:bg-rose-300
						`}
					>
						{IconeLixo}
					</button>
				</div>
			</td>
		);
	}

	return (
		<div className="flex flex-col programas-center">
			<table className="w-full overflow-hidden max-w-full">
				<thead className="text-rose-100 fundo-gradiente-azul">
					{gerarCabecalho()}
				</thead>
				<tbody>{gerarLinhas()}</tbody>
			</table>
		</div>
	);
}
