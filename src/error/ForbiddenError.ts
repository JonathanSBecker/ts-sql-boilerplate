import SystemError from './SystemError';

export default class ForbiddenError extends SystemError {
  statusCode = 403;

  message = 'Forbidden.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
