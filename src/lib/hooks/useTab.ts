import { useEffect, useState } from 'react';

const useTab = () => {
	const [tab, setTab] = useState<chrome.tabs.Tab>();

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

	return tab;
};

export default useTab;
