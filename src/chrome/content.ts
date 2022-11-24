import { ChromeMessage } from '../@types';
import commands from './commands';

const listener = (
	message: ChromeMessage,
	sender: chrome.runtime.MessageSender,
	sendResponse: (response?: unknown) => void
) => {
	console.log('[content.js] message received:', {
		message,
		sender,
	});

	if (sender.id !== chrome.runtime.id || message.from !== 'REACT') {
		return;
	}

	const command = commands[message.command];

	const response = command();

	sendResponse(response);
};

chrome.runtime.onMessage.addListener(listener);
