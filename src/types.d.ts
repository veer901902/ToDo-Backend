declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}

// if we won't include this we can't use req.user in express in typescript