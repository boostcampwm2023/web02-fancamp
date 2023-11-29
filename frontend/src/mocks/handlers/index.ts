import { handlers as postHandlers } from './post';
import { handlers as commentHandlers } from './comment';
import { handlers as userHandlers } from './user';
import { handlers as chatrHandlers } from './chat';

export const handlers = [
  ...postHandlers,
  ...commentHandlers,
  ...userHandlers,
  ...chatrHandlers,
];
