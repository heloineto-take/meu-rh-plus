import { useEffect, useState } from 'react';
import { ChromeMessage, Sender } from './@types';
import Switch from './components/Switch';
import WrongTabWarning from './components/WrongTabWarning';

const DEFAULT_URL =
	'https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/#/timesheet/clockings';

function App() {
	const [tab, setTab] = useState<chrome.tabs.Tab>();
	const [chromeResponse, setChromeResponse] = useState<unknown>();

	useEffect(() => {
		if (chrome.tabs === undefined) {
			return;
		}

		chrome.tabs.query(
			{
				active: true,
				lastFocusedWindow: true,
			},
			(tabs) => {
				setTab(tabs[0]);
			}
		);
	}, []);

	/**
	 * Send message to the content script
	 */
	const sendTestMessage = () => {
		if (chrome.tabs === undefined) {
			return;
		}

		const message: ChromeMessage = {
			from: Sender.React,
			message: 'Hello from React',
		};

		chrome.tabs.query(
			{
				active: true,
				currentWindow: true,
			},
			(tabs) => {
				const currentTabId = tabs[0].id;

				if (typeof currentTabId !== 'number') {
					return;
				}

				chrome.tabs.sendMessage(currentTabId, message, (response) => {
					setChromeResponse(response);
				});
			}
		);
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
}

export default App;
