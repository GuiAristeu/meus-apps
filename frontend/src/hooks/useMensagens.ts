import {
	ContextoMensagens,
	ContextoMensagensProps,
} from "@/contexts/ContextoMensagens";
import { useContext } from "react";
export const useMensagens = (): ContextoMensagensProps => {
	const context = useContext(ContextoMensagens);
	if (!context) {
		throw new Error("useMensagens must be used within a MensagensProvider");
	}
	return context;
};
