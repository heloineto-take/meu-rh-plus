const renderHeader = () => {
	const header = document.querySelector('#table-timesheet > thead > tr');
	const newHeader = document.createElement('th');

	header.insertBefore(newHeader, header.children[1]);

	newHeader.outerHTML = `
    <th class="clocking-label-column clocking-header-column text-center color-labels-base" style="font-weight: bold;width: 219px;max-width: 25%;font-size: 10px;color: #0c9abe;border-color: rgba(12,154,190,.4);">
        INFO
    </th>
    `;
};

const showAttendanceInfo = () => {
	renderHeader();
};

export default showAttendanceInfo;
