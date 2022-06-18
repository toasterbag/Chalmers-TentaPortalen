export type ResponseCode =
  | InformationCode
  | SuccessCode
  | RedirectionCode
  | ErrorCode
  | ServerErrorCode;

export enum InformationCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
}

export enum SuccessCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthorativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
}

export enum RedirectionCode {
  MultipleChoices = 301,
  MovedPermanently = 302,
  Found = 303,
  SeeOther = 304,
  NotModified = 305,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
}

export enum ErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodsNotAllowed = 405,
  NotAcceptable = 406,
  PRoxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  URITooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatsfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
}

export enum ServerErrorCode {
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
}
