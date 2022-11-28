import showAttendanceInfo from './commands/showAttendanceInfo';

export {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	console.log('onUpdated', tabId, changeInfo, tab);
	void showAttendanceInfo();
});
