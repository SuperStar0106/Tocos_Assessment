import httpStatus from 'http-status';

export class CustomError extends Error {
  errorCode?: number;
  reasonCode: string;

  constructor(message: string, errorCode?: number, reasonCode?: string) {
    super();

    this.message = message;

    this.errorCode = errorCode ? errorCode : httpStatus.BAD_REQUEST;
    this.reasonCode = reasonCode;
  }
}
