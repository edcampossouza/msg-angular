type Participant = {
  username: string;
  userId: number;
};

export type Message = {
  messageId: number;
  createdAt: string;
  text: string;
  sender: Participant;
  receiver: Participant;
};
