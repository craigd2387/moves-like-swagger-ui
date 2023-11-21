import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose'; // handles jwt
import UserRole from '../model/userRole';

export default function roleAccess(roles:UserRole[]) {
  return (req:Request, res:Response, next: NextFunction) => {
    console.log(req.session);

    // if no session token, redirect to login page
    if (!req.session.token) {
      res.redirect('/login');
      return;
    }

    // if session token is empty, redirect to login page
    if (req.session.token.length === 0) {
      res.redirect('/login');
      return;
    }

    // decodes jwt stored in session token
    const JWT = jose.decodeJwt(req.session.token as string);
    if (!JWT) {
      // if decode was unsuccessful, redirect to login page
      res.redirect('/login');
      return;
    }

    if (!JWT.role) {
      // if jwt doesn't have a role, redirect to login page
      res.redirect('/login');
      return;
    }

    const jwtRole : UserRole = UserRole[JWT.role as keyof typeof UserRole];

    if (roles.includes(jwtRole)) {
      // if jwt role matches a role in array of roles, move to next step
      next();
      return;
    }
    // if no match for jwt role found in role array, return 403 forbidden
    res.sendStatus(403);
  };
}
