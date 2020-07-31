import { NextFunction } from 'express';

export default function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}
