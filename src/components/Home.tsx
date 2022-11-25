import useTab from '../lib/hooks/useTab';
import { getIsClockingsUrl, sendCommand } from '../lib/utils/chrome';
import Switch from './Switch';
import WrongTabWarning from './WrongTabWarning';

//  TODO:
// - Repo Button
// - Bug Report Button

const Home = () => {
	const tab = useTab();

	const isCorrectUrl = getIsClockingsUrl(tab);

	// useEffect(() => {
	// 	if (!isCorrectUrl) {
	// 		return;
	// 	}

	// 	sendCommand('SHOW_REPORT');
	// }, [isCorrectUrl]);

	chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
		if (info.status === 'complete' && getIsClockingsUrl(tab)) {
			console.log('BUNKERS!');
			sendCommand('SHOW_REPORT');
		}
	});

	return (
		<div className="w-80 dark:bg-stone-900 dark:text-stone-50 bg-white p-2.5">
			{isCorrectUrl ? (
				<>
					<div className="flex w-full items-center justify-between">
						<div className="font-bold text-lg">Meu RH+</div>
						<Switch />
					</div>
					<button onClick={() => sendCommand('SHOW_REPORT')}>SHOW_REPORT</button>
				</>
			) : (
				<WrongTabWarning />
			)}
		</div>
	);
};

export default Home;
