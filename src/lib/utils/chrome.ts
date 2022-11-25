import { ChromeMessage, Command } from '../../@types';

const CLOCKINGS_URLS = [
	'https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML/web/app/RH/PortalMeuRH/#/timesheet/clockings',
	'https://curupirasa132885.rm.cloudtotvs.com.br/FrameHTML//Web/App/RH/PortalMeuRH/#/timesheet/clockings',
];

export const sendCommand = (command: Command, responseCallback?: (response: unknown) => void) => {
	if (chrome.tabs === undefined) {
		return;
	}

	const message: ChromeMessage = {
		from: 'REACT',
		command: command,
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

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			chrome.tabs.sendMessage(currentTabId, message, responseCallback ?? (() => {}));
		}
	);
};

export const getIsClockingsTab = (tab: chrome.tabs.Tab | undefined) =>
	tab?.url !== undefined && CLOCKINGS_URLS.includes(tab.url);

export const activateChanges = () => {
	sendCommand('SHOW_REPORT');
};

export const deactivateChanges = () => {
	sendCommand('CLEAR_ALL');
};
