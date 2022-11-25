import { useEffect, useState } from 'react';
import { activateChanges, deactivateChanges, sendCommand } from '../lib/utils/chrome';
import Switch from './Switch';

//  TODO:
// - Repo Button
// - Bug Report Button

const Home = () => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		sendCommand('GET_IS_ACTIVE', (response) => {
			if (typeof response !== 'boolean') return;

			setActive(response);
		});
	}, []);

	const onClickSwitch = () => {
		setActive((oldValue) => {
			const newValue = !oldValue;

			if (newValue) {
				activateChanges();
			} else {
				deactivateChanges();
			}

			return newValue;
		});
	};

	return (
		<>
			<div className="flex w-full items-center justify-between">
				<div className="font-bold text-lg">Meu RH+</div>
				<Switch value={active} onClick={onClickSwitch} />
			</div>
		</>
	);
};

export default Home;
