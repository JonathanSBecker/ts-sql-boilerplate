import SystemError from './SystemError';

export default class BadRequestError extends SystemError {
  statusCode = 400;

  message = 'Bad Request.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
