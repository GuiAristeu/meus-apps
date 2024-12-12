"use client";
import Formulario from "@/components/Formulario";
import { Titulo } from "@/components/template/Titulo";
import { useParams } from "next/navigation";

export default function Novo() {
	const { id }: any = useParams();
	return (
		<>
			<Titulo>Editando {id}</Titulo>
			<Formulario id={id} />
		</>
	);
}
