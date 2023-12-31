export const ERR_MESSAGE = Object.freeze({
  POST_NOT_FOUND_BY_ID: 'Post with ID not found',
  NOT_POST_OWNER: 'Not Post Owner',
  POST_WRITER_IS_NOT_MASTER: 'Post writer is not master',
  COMMENT_NOT_FOUND_BY_ID: 'Comment with ID not found',
  NOT_COMMENT_OWNER: 'Not Comment Owner',
  NOT_SUBSCRIBED: 'Not Subscribed',
  NO_MORE_MESSAGE: 'No More Message',
  USER_NOT_FOUND_BY_ID: 'User with ID not found',
} as const);
