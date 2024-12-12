interface CheckboxProps {
	texto: string;
	valor: boolean;
	valorMudou: (novoValor: boolean) => void;
}

export function Checkbox({ texto, valor, valorMudou }: CheckboxProps) {
	const handleChange = () => {
		const novoValor = valor ? false : true;
		valorMudou(novoValor);
	};

	return (
		<label className="flex items-center gap-2 my-2">
			<span>{texto}</span>
			<input
				type="checkbox"
				checked={valor}
				onChange={handleChange}
				className="form-checkbox"
			/>
		</label>
	);
}
