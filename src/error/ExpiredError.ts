import SystemError from './SystemError';

// 410 is technically "Gone", but is applicable for expirations
export default class ExpiredError extends SystemError {
  statusCode = 410;

  message = 'Expired';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, ExpiredError.prototype);
  }
}
