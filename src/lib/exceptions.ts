export class Exception extends Error {
  code: number;
  constructor(message: string = "Something went wrong", code: number = 500) {
    super(message);
    this.code = code;
  }
}

export class BadRequest extends Exception {
  constructor(message: string = "Bad request", code: number = 400) {
    super(message, code);
  }
}

export class ServerException extends Exception {
  constructor(message: string = "Internal Server Error", code: number = 500) {
    super(message, code);
  }
}

export class TimeoutException extends Exception {
  constructor(
    message: string = "Request timeout, please try again.",
    code: number = 408
  ) {
    super(message, code);
  }
}

export class RatelimitException extends Exception {
  constructor(
    message: string = "Too many requests, try again later.",
    code: number = 429
  ) {
    super(message, code);
  }
}

export class ClientException extends Exception {
  constructor(
    message: string = "Instagram Client Exception",
    code: number = 400
  ) {
    super(message, code);
  }
}
