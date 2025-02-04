class AppError extends Error {
  public StatusCod: number;

  constructor(StatusCod: number, message: string, stack = '') {
    super(message);
    this.StatusCod = StatusCod;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
