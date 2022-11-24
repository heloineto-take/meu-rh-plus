import { XCircle } from 'phosphor-react';

const WrongTabWarning = () => {
	return (
		<div className="flex flex-col gap-2.5 items-center py-10">
			<XCircle className="h-14 w-14 dark:text-slate-200 text-slate-700" weight="duotone" />
			<div className="text-center">
				<p className="dark:text-slate-200 text-slate-700 font-medium">
					Você não está no portal Meu RH
				</p>
				<p className="dark:text-slate-400 text-slate-500">
					Essa extensão funciona apenas no portal
				</p>
			</div>
		</div>
	);
};

export default WrongTabWarning;
