"use client";
import Tabela from "@/components/Tabela";
import { Botao } from "@/components/template/Botao";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { useRouter } from "next/navigation";

export default function Home() {
	const { deslogar } = useAutenticacao();
	const router = useRouter();

	return (
		<>
			<Botao
				href="/programas/criar"
				texto="Adicionar Software"
				className="mr-3"
			></Botao>
			<Botao
				className="bg-neutral-700 hover:bg-neutral-900"
				texto="Logout"
				onClick={() => {
					const sucesso = deslogar();
					if (!sucesso) return;
					router.push("/");
				}}
			/>
			<Tabela acoes />
		</>
	);
}
