import { Command } from '../../@types';
import clearAll from './clearAll';
import showAttendanceInfo from './showAttendanceInfo';

const commands: Record<Command, () => unknown> = {
	SHOW_REPORT: showAttendanceInfo,
	CLEAR_ALL: clearAll,
};

export default commands;
