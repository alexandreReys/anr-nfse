declare namespace Express {
  export interface Request {
    apiGateway: {
      event: {
        headers: {
          Authorization: string;
        };
      };
    };
  }
}
