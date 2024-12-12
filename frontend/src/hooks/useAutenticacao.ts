import {
	ContextoAutenticacao,
	ContextoAutenticacaoProps,
} from "@/contexts/ContextoAutenticacao";
import { useContext } from "react";
export const useAutenticacao = (): ContextoAutenticacaoProps => {
	const context = useContext(ContextoAutenticacao);
	if (!context) {
		throw new Error("useAutenticacao must be used within a AutenticacaoProvider");
	}
	return context;
};
