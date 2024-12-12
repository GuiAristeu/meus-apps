"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Categoria } from "@/model/Programa";
import { Entrada, Checkbox, Select } from "./inputs";
import { Botao } from "./template/Botao";
import { useAPI } from "@/hooks/useAPI";

interface FormularioProps {
	id?: string;
}

const camposFormulario = [
	{ tipo: "text", nome: "nome", texto: "Nome" },
	{ tipo: "text", nome: "site", texto: "Site" },
	{ tipo: "text", nome: "descricao", texto: "Descrição" },
	{ tipo: "checkbox", nome: "gratuito", texto: "Gratuito?" },
	{
		tipo: "select",
		nome: "categoria",
		texto: "Categoria",
		opcoes: Object.values(Categoria),
	},
	{ tipo: "text", nome: "comentarios", texto: "Comentários" },
];

export default function Formulario(props: FormularioProps) {
	const router = useRouter();
	const { salvar, obterPorId } = useAPI();
	const id = props.id ?? "";
	const [valores, setValores] = useState<any>({
		categoria: Categoria.UTILITARIO,
	});

	useEffect(() => {
		(async () => {
			if (props.id) {
				const p = await obterPorId(id);
				if (!p) {
					return;
				}
				setValores({ ...p, gratuito: p.gratuito === "Sim" ? true : false });
			}
		})();
	}, [props.id]);

	const handleChange = (nome: string, valor: any) => {
		setValores((prev: any) => ({ ...prev, [nome]: valor }));
	};

	const renderCampo = (campo: any) => {
		switch (campo.tipo) {
			case "checkbox":
				return (
					<Checkbox
						key={campo.nome}
						texto={campo.texto}
						valor={valores[campo.nome] ? true : false}
						valorMudou={(valor: any) => handleChange(campo.nome, valor)}
					/>
				);
			case "select":
				return (
					<Select
						key={campo.nome}
						texto={campo.texto}
						opcoes={campo.opcoes}
						onSelect={(valor: any) => handleChange(campo.nome, valor)}
					/>
				);
			default:
				return (
					<Entrada
						key={campo.nome}
						texto={campo.texto}
						valor={valores[campo.nome] || ""}
						valorMudou={(valor: any) => handleChange(campo.nome, valor)}
					/>
				);
		}
	};

	return (
		<div>
			{!valores && <p>Carregando...</p>}
			{id && valores && <Entrada somenteLeitura texto="Id" valor={id} />}
			{id && valores["inseridoEm"] && (
				<Entrada
					somenteLeitura
					texto="InseridoEm"
					valor={valores["inseridoEm"]}
				/>
			)}

			{valores && camposFormulario.map((campo) => renderCampo(campo))}

			<div className="flex justify-end mt-7">
				<Botao
					className="mr-2"
					onClick={async () => {
						const sucesso = await salvar({ id, ...valores });
						if (!sucesso) return;
						router.push("/programas");
					}}
					texto={id ? "Alterar" : "Salvar"}
				/>
				<Botao href="/programas" texto="Cancelar" />
			</div>
		</div>
	);
}
