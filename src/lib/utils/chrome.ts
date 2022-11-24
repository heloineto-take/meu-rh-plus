import { ChromeMessage, Command } from '../../@types';

export const sendCommand = (command: Command, responseCallback: (response: unknown) => void) => {
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

			chrome.tabs.sendMessage(currentTabId, message, responseCallback);
		}
	);
};
