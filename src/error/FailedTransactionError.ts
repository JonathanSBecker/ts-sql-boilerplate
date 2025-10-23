import SystemError from './SystemError';

/**WARNING: This is an SMTP error, do not throw to users.*/
export default class FailedTransactionError extends SystemError {
  statusCode = 554;

  message = 'Transaction Failed.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, FailedTransactionError.prototype);
  }
}
