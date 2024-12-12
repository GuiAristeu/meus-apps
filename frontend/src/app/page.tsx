"use client";
import { useState } from "react";
import { Entrada } from "@/components/inputs";
import { Botao } from "@/components/template/Botao";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [registrar, setRegistrar] = useState(false);
	const { logar, cadastrar, temLogado } = useAutenticacao();
	const router = useRouter();

	useEffect(() => {
		if (temLogado()) {
			router.push("/programas");
		}
	}, []);

	return (
		<div className="h-screen flex items-center justify-center bg-rose-100">
			<div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">
					{registrar ? "Registrar" : "Login"}
				</h2>
				{registrar && (
					<Entrada
						texto="Nome"
						nome="nome"
						valor={nome}
						valorMudou={setNome}
						className="mb-4"
					/>
				)}
				<Entrada
					texto="Email"
					nome="email"
					valor={email}
					valorMudou={setEmail}
					className="mb-4"
				/>
				<Entrada
					texto="Senha"
					nome="senha"
					tipo="password"
					valor={senha}
					valorMudou={setSenha}
					className="mb-4"
				/>
				<Botao
					className="w-full py-2 mb-4 "
					texto={registrar ? "Cadastrar" : "Logar"}
					onClick={async () => {
						let sucesso: any;
						if (registrar) {
							sucesso = await cadastrar(nome, email, senha);
						} else {
							sucesso = await logar(email, senha);
						}
						if (!sucesso) return;
						router.push("/programas");
					}}
				/>
				<Botao
					className="w-full py-2 "
					texto={registrar ? "Já tem conta?" : "Não tem conta?"}
					onClick={() => setRegistrar(!registrar)}
				/>
			</div>
		</div>
	);
}
