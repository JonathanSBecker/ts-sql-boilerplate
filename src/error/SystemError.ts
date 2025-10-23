export default class SystemError extends Error {
  public statusCode = 500;

  public message = 'An internal error has occurred';

  constructor(msg?: string) {
    super(msg);

    if (msg) {
      this.message = msg;
    }

    Object.setPrototypeOf(this, SystemError.prototype);
  }
}
