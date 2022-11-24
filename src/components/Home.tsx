import { useState } from 'react';
import useTab from '../lib/hooks/useTab';
import { sendCommand } from '../lib/utils/chrome';
import Switch from './Switch';
import WrongTabWarning from './WrongTabWarning';

const DEFAULT_URL =
	'https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/#/timesheet/clockings';

const Home = () => {
	const tab = useTab();

	const [chromeResponse, setChromeResponse] = useState<unknown>();

	const sendTestMessage = () => {
		sendCommand('SHOW_REPORT', (response) => setChromeResponse(response));
	};

	return (
		<div className="w-80 dark:bg-slate-900 dark:text-slate-50 bg-white p-2.5">
			{tab?.url === DEFAULT_URL ? (
				<>
					<div className="flex w-full items-center justify-between">
						<div className="font-bold">Meu RH+</div>
						<Switch />
					</div>
					<div className="flex flex-col items-center">
						<button onClick={sendTestMessage}>SEND MESSAGE</button>
						{typeof tab !== undefined ? tab?.url : null}
						{JSON.stringify(chromeResponse)}
					</div>
				</>
			) : (
				<WrongTabWarning />
			)}
		</div>
	);
};

export default Home;
