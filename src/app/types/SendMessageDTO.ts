import { Message } from './Message';

export type SendMessageDTO = {
  recipient: string;
  text: string;
};

export type SendMessageResponseDTO = {
  message: Message;
};
