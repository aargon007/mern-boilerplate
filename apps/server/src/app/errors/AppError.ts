class AppError extends Error {
  public statusCode: number;
  public errorMessage: string;
  public errorDetails: string | null;

  constructor(
    statusCode: number,
    message: string,
    errorMessage: string = '',
    errorDetails: string | null = null,
    stack = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.errorDetails = errorDetails;
    if (stack) {
      this.stack = stack;
    }
  }
}

export default AppError;
