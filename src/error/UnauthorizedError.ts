import SystemError from './SystemError';

export default class UnauthorizedError extends SystemError {
  statusCode = 401;

  message = 'Unauthorized.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
