export type Sender = 'REACT' | 'CONTENT';
export type Command = 'SHOW_REPORT' | 'CLEAR_ALL' | 'GET_IS_ACTIVE';

export interface ChromeMessage {
	from: Sender;
	command: Command;
}
