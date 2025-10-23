import SystemError from './SystemError';

export default class ConflictError extends SystemError {
  statusCode = 409;

  message = 'A conflict has occurred.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
