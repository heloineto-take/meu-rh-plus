import { Command } from '../../@types';
import showAttendanceInfo from './showAttendanceInfo';

const commands: Record<Command, () => unknown> = {
	SHOW_REPORT: showAttendanceInfo,
};

export default commands;
