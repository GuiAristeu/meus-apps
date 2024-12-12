import { cn } from "@/utils/cn";
import Link from "next/link";

interface BotaoProps {
	texto: string;
	className?: string;
	onClick?: () => void;
	href?: string;
}

export function Botao(props: BotaoProps) {
	const LinkHref = () => (
		<Link href={props.href!} className="w-full h-full">
			{props.texto}
		</Link>
	);
	return (
		<button
			onClick={props.onClick}
			className={cn(
				" bg-rose-600 text-white  hover:bg-rose-700 px-4 py-2 rounded-md my-2",
				props.className
			)}
		>
			{props.href ? <LinkHref /> : props.texto}
		</button>
	);
}
