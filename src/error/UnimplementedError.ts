import SystemError from './SystemError';

export default class UnimplementedError extends SystemError {
  statusCode = 501;

  message = 'Endpoint unimplemented.';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, UnimplementedError.prototype);
  }
}
