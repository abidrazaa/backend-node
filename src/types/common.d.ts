import jwt from 'jsonwebtoken';
import { Request, Response, Router, NextFunction } from 'express';

export type RouterMap = { [key: string]: Router };

export interface WithAuthRequest<a, b, c, d> extends Request<a, b, c, d> {
  user: jwt.JwtPayload;
}

export type BaseRequestHandler<B = BaseBody, Q = BaseQuery, P = BaseParams> = (
  req: Request<P, BaseBody, B, Q>,
  res: Response,
  next: NextFunction,
) => Promise<Response<Anything, Record<string, Anything>>>;

export type WithAuthRequestHandler<B = BaseBody, Q = BaseQuery, P = BaseParams> = (
  req: WithAuthRequest<P, BaseBody, B, Q>,
  res: Response,
  next: NextFunction,
) => Promise<Response<Anything, Record<string, Anything>>>;

export type BaseMiddleWare<B = BaseBody, Q = BaseQuery, P = BaseParams> = (
  req: Request<P, BaseBody, B, Q>,
  res: Response,
  next: NextFunction,
) => void;

export type WithAuthRequestMiddleware<B = BaseBody, Q = BaseQuery, P = BaseParams> = (
  req: WithAuthRequest<P, BaseBody, B, Q>,
  res: Response,
  next: NextFunction,
) => void;

export type BaseParams = Record<string, string>;

export type BaseBody = object;

export type BaseQuery = {
  _search: string;
  _limit: string;
  _page: string;
  _sort: string;
  _order: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Anything = any;
