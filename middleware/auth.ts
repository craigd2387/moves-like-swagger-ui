import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose'; // handles json web tokens

export default function authMiddleware(req:Request, res:Response, next: NextFunction) {
  // if session token is missing or empty, redirect to login page
  if (!req.session.token || req.session.token.length === 0) {
    res.redirect('/login');
    return;
  }

  // decode jwt in session token
  const JWT = jose.decodeJwt(req.session.token as string);
  // current timestamp
  const TODAY_IN_SECONDS = Date.now() / 1000;

  // if jwt exists (decode successful)
  if (JWT) {
    // if jwt has no expiration
    if (!JWT.exp) {
      return;
    }
    // if jwt expired, clear session token and redirect to login page
    if (TODAY_IN_SECONDS >= JWT.exp) {
      req.session.token = undefined;
      res.redirect('/login');
      return;
    }
  } else {
    // if no jwt, redirect to login page
    res.redirect('/login');
    return;
  }

  // if all checks above have passed (valid jwt token), proceed with request
  next();
}
