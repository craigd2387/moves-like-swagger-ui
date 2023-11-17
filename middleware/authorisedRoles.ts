import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import UserRole from '../model/userRole';

export default function roleAccess(role:UserRole[]) {
  return (req:Request, res:Response, next: NextFunction) => {
    console.log(req.session);
    if (!req.session.token) {
      res.redirect('/login');
      return;
    }

    if (req.session.token.length === 0) {
      res.redirect('/login');
      return;
    }

    const JWT = jose.decodeJwt(req.session.token as string);
    if (!JWT) {
      res.redirect('/login');
      return;
    }

    if (!JWT.role) {
      res.redirect('/login');
      return;
    }

    const jwtRole : UserRole = UserRole[JWT.role as keyof typeof UserRole];

    for (let i = 0; i < role.length; i += 1) {
      if (role[i] === jwtRole) {
        next();
        return;
      }
    }

    res.sendStatus(403);
  };
}
