import { User } from './User';

export type LoginResponseDTO = {
  user: User;
  token: string;
};
