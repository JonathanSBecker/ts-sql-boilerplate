import SystemError from './SystemError';

export default class PaymentRequiredError extends SystemError {
  statusCode = 402;

  message = 'Payment Required.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}
