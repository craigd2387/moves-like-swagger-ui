import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

export default function authMiddleware(req:Request, res:Response, next: NextFunction) {
  if (!req.session.token || req.session.token.length === 0) {
    res.redirect('/login');
    return;
  }

  const JWT = jose.decodeJwt(req.session.token as string);
  const TODAY_IN_SECONDS = Date.now() / 1000;

  if (JWT) {
    if(!JWT.exp){
      return;
    }
    
    if (TODAY_IN_SECONDS >= JWT.exp) {
      req.session.token = undefined;
      res.redirect('/login');
      return;
    }
  } else {
    res.redirect("/login")
    return;
  }

  next();
}
