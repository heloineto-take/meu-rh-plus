import clearAll from './clearAll';

const renderHeader = () => {
	const header = document.querySelector('#table-timesheet > thead > tr');
	const newHeader = document.createElement('th');

	if (header === null) {
		throw Error("couldn't get header element");
	}

	header.insertBefore(newHeader, header.children[1]);

	newHeader.outerHTML = `
    <th class="meu-rh-plus-injected clocking-label-column clocking-header-column text-center color-labels-base" style="font-weight: bold;width: 219px;max-width: 25%;font-size: 10px;color: #0c9abe;border-color: rgba(12,154,190,.4);">
        INFO
    </th>
    `;
};

const getDayInfo = (row: HTMLTableRowElement) => {
	const dayAndMonth = row.querySelector('#lbl-reference-date')?.textContent;
	const weekday = row.querySelector('.week-day.po-hidden-sm')?.textContent;

	if (typeof dayAndMonth !== 'string') {
		throw Error("couldn't get day and month");
	}
	if (typeof weekday !== 'string') {
		throw Error("couldn't get weekday");
	}

	const [day, month] = dayAndMonth.split('/').map((each) => Number(each));

	return {
		day,
		month,
		weekday,
	};
};

const timeStrToDate = (timeStr: string) => {
	const [hours, minutes] = timeStr.split(':').map((str) => Number(str));

	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
};

const elementToTime = (element: Element) => {
	if (element.textContent === null) {
		throw Error("couldn't get element's textContent");
	}

	return timeStrToDate(element.textContent.trim()).getTime();
};

function getTimeWorked(row: HTMLTableRowElement, options = { includeNow: true }) {
	const timeElements = [...row.querySelectorAll('.clocking.mouse-pointer')];

	const sortedElements = timeElements.sort((a, b) => elementToTime(a) - elementToTime(b));

	// TODO: REVISE THIS LOGIC. IT'S LIKELY WRONG
	const startsWithExit = sortedElements[0]?.parentElement?.parentElement
		?.querySelector('.direction')
		?.textContent?.trim()
		.startsWith('S');

	if (startsWithExit) {
		timeElements.shift();
	}

	const times = timeElements.map((timeElem) => elementToTime(timeElem)).sort();

	if (times.length % 2 !== 0) {
		if (options.includeNow) times.push(new Date().getTime());
		else times.pop();
	}

	let totalMs = 0;
	for (let i = 0; i < times.length; i += 2) {
		totalMs += times[i + 1] - times[i];
	}

	return totalMs;
}

const msToHm = (milliseconds: number) => {
	const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = seconds >= 30 ? minutes + 1 : minutes;
	minutes = minutes % 60;

	return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

function renderReport(
	row: HTMLTableRowElement,
	report: { timeWorked: string; timeRemaining: string; endTime?: string }
) {
	const newCell = document.createElement('td');

	row.insertBefore(newCell, row.children[1]);

	newCell.outerHTML = `
    <td class="meu-rh-plus-injected column-day" style="font-size: 14px;">
        <div>
            <a
                id="lbl-reference-date"
                class="mouse-pointer"
                style="font-weight: bold"
                >Time Worked:</a
            >
            <span class="week-day po-hidden-sm">${report.timeWorked} h</span>
        </div>
        <div>
            <a
                id="lbl-reference-date"
                class="mouse-pointer"
                style="font-weight: bold"
                >Remaining:</a
            >
            <span class="week-day po-hidden-sm">${report.timeRemaining} h</span>
        </div>
        ${
			report.endTime !== undefined
				? `<div>
                        <a
                            id="lbl-reference-date"
                            class="mouse-pointer"
                            style="font-weight: bold"
                        >
                            Without stops, ends:
                        </a>
                        <span class="week-day po-hidden-sm">${report.endTime}</span>
                    </div>`
				: ''
		}
    </td>
    `;
}

const showRowAttendanceInfo = (row: HTMLTableRowElement) => {
	const timeElements = [...row.querySelectorAll('.clocking.mouse-pointer')].filter(
		(clocking) => clocking.textContent !== null && clocking.textContent.trim() !== ''
	);

	if (timeElements.length === 0) {
		return;
	}

	const { day, month } = getDayInfo(row);

	const now = new Date();

	const isToday = now.getDate() === Number(day) && now.getMonth() + 1 === Number(month);

	const workedMs = getTimeWorked(row);
	const timeWorked = msToHm(workedMs);

	let remainingMs = 8 * 60 * 60 * 1000 - workedMs;
	if (remainingMs < 0) {
		remainingMs = 0;
	}

	const timeRemaining = msToHm(remainingMs);

	let endTime;

	if (isToday) {
		const endDate = new Date(Date.now() + remainingMs);
		endTime = endDate.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	renderReport(row, { timeWorked, timeRemaining, endTime });
};

const getIsLoading = () => {
	const loadingScreen = document.querySelector('.loading-screen');

	if (loadingScreen === null) {
		throw Error("couldn't get loading screen");
	}

	return (loadingScreen as HTMLElement).style.display !== 'none';
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitFor = async (func: () => boolean, options = { attempts: 10, sleepMs: 1000 }) => {
	for (let i = 0; i <= options.attempts; i++) {
		const result = func();

		if (result) {
			break;
		}

		await sleep(options.sleepMs);
	}

	throw Error('waitFor exceeded max attempts');
};

const showAttendanceInfo = async () => {
	await waitFor(() => getIsLoading());

	clearAll();

	renderHeader();

	const rowsNodes = document.querySelector(`#table-timesheet > tbody`)?.querySelectorAll('tr');

	if (rowsNodes === undefined) {
		throw Error("couldn't get rows");
	}

	const rows = [...rowsNodes];

	for (const row of rows) {
		showRowAttendanceInfo(row);
	}

	return;
};

export default showAttendanceInfo;
