export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnAuthorizeError extends Error {
  statusCode = 401;
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "UnAuthorizeError";
  }
}
