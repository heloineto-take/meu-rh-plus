import { useState } from 'react';
import classNames from '../lib/utils/classNames';

const Switch = () => {
	const [on, setOn] = useState(true);

	return (
		<button
			className={classNames(
				'relative inline-flex h-8 w-16 items-center rounded-full py-2 px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900',
				on
					? 'bg-slate-700 text-slate-400 focus-visible:ring-slate-500'
					: 'bg-emerald-600 text-emerald-200 focus-visible:ring-emerald-800'
			)}
			onClick={() => setOn((value) => !value)}
		>
			<div
				className={classNames(
					'mt-[0.2rem] h-6 w-6 transform text-sm font-bold transition-transform',
					on ? 'scale-0 duration-300' : 'scale-100 duration-500'
				)}
			>
				ON
			</div>
			<div
				className={classNames(
					'mt-[0.2rem] h-6 w-6 transform text-sm font-bold transition-transform',
					on ? 'scale-100 duration-300' : 'scale-0 duration-500'
				)}
			>
				OFF
			</div>
			<span
				className={classNames(
					'absolute top-1/2 left-1 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-white transition duration-500',
					on ? '' : 'translate-x-[2rem]'
				)}
			/>
		</button>
	);
};

export default Switch;
