import SystemError from './SystemError';

export default class NotFoundError extends SystemError {
  statusCode = 404;

  message = 'Resource not found.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
