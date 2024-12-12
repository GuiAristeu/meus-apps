interface SelectProps {
	opcoes: string[];
	onSelect: (selectedOption: string) => void;
	texto: string;
}

export function Select({ opcoes, onSelect, texto }: SelectProps) {
	return (
		<div className="relative flex items-center gap-4 my-2 w-min">
			<span>{texto}:</span>
			<select
				onChange={(event: any) => onSelect(event.target.value)}
				className="block appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			>
				{opcoes.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M7 10l5 5 5-5H7z" />
				</svg>
			</div>
		</div>
	);
}
