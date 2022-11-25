import { XCircle } from 'phosphor-react';

const WrongTabWarning = () => {
	return (
		<div className="flex flex-col gap-2.5 items-center py-10">
			<XCircle className="h-14 w-14 dark:text-stone-200 text-stone-700" weight="duotone" />
			<div className="text-center">
				<p className="dark:text-stone-200 text-stone-700 font-medium">
					{`Você não está na aba "Espelho de ponto" do portal Meu RH`}
				</p>
				<p className="dark:text-stone-400 text-stone-500">
					Essa extensão funciona apenas nessa aba do portal
				</p>
			</div>
		</div>
	);
};

export default WrongTabWarning;
