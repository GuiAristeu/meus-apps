import { cn } from "@/utils/cn";

interface EntradaProps {
	tipo?: "text" | "number" | "calendar" | "password";
	texto: string;
	valor: any;
	nome?: string;
	somenteLeitura?: boolean;
	className?: string;
	valorMudou?: (valor: any) => void;
}

export function Entrada(props: EntradaProps) {
	return (
		<div className={cn("flex flex-col", props.className)}>
			<label className="mb-2" htmlFor={props.nome}>
				{props.texto}
			</label>
			<input
				type={props.tipo ?? "text"}
				value={props.valor}
				name={props.nome}
				readOnly={props.somenteLeitura}
				onChange={(e) => props.valorMudou?.(e.target.value)}
				className={cn(
					`
                    border border-rose-800 rounded-lg
                    focus:outline-none px-4 py-2 mb-2`,
					{
						"focus:bg-white": !props.somenteLeitura,
						"bg-gray-100": props.somenteLeitura,
					}
				)}
			/>
		</div>
	);
}
