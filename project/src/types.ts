export interface Conversation {
  id: number;
  command: string;
  response: string;
  timestamp: string;
}

export enum AssistantState {
  IDLE = 'idle',
  LISTENING = 'listening',
  PROCESSING = 'processing',
  RESPONDING = 'responding'
}