"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAutenticacao } from "@/hooks/useAutenticacao";

export default function ({ children }: any) {
	const { temLogado, pegarInfoUsuario } = useAutenticacao();
	const { nome, email } = pegarInfoUsuario();
	const router = useRouter();

	useEffect(() => {
		if (!temLogado()) {
			router.push("/");
		}
	});
	return (
		<div>
			<header className="flex justify-between items-center bg-rose-700 text-white">
				<h1 className="text-3xl font-bold tracking-tight p-8 text-center align-middle w-full h-full">
					Meus Softwares
				</h1>
			</header>
			<main className="max-w-7xl mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-lg">
				<div className="text-center w-full text-xl">
					Você está logado como{" "}
					<strong>
						{nome} ({email})
					</strong>
				</div>
				{children}
			</main>
		</div>
	);
}
