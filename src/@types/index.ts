export type Sender = 'REACT' | 'CONTENT';
export type Command = 'SHOW_REPORT' | 'CLEAR_ALL';

export interface ChromeMessage {
	from: Sender;
	command: Command;
}
