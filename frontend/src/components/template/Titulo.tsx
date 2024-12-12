export function Titulo(props: any) {
	return (
		<div className="mx-auto max-w-7xl pb-4">
			<h2 className="text-2xl font-bold tracking-tight text-neutral-900">
				{props.children}
			</h2>
		</div>
	);
}
