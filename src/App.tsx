import Home from './components/Home';
import WrongTabWarning from './components/WrongTabWarning';
import useTab from './lib/hooks/useTab';
import { getIsClockingsTab } from './lib/utils/chrome';

function App() {
	const tab = useTab();
	const isClockingsTab = getIsClockingsTab(tab);

	return (
		<div className="w-80 dark:bg-stone-900 dark:text-stone-50 bg-white p-2.5">
			{isClockingsTab ? <Home /> : <WrongTabWarning />}
		</div>
	);
}

export default App;
