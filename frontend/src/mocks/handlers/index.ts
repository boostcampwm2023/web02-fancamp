import { handlers as postHandlers } from './post';
import { handlers as commentHandlers } from './comment';
import { handlers as userHandlers } from './user';

export const handlers = [...postHandlers, ...commentHandlers, ...userHandlers];
