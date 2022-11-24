export type Sender = 'REACT' | 'CONTENT';
export type Command = 'SHOW_REPORT';

export interface ChromeMessage {
	from: Sender;
	command: Command;
}
