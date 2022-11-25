import { Command } from '../../@types';
import clearAll from './clearAll';
import getIsActive from './getIsActive';
import showAttendanceInfo from './showAttendanceInfo';

const commands: Record<Command, () => unknown> = {
	SHOW_REPORT: showAttendanceInfo,
	CLEAR_ALL: clearAll,
	GET_IS_ACTIVE: getIsActive,
};

export default commands;
