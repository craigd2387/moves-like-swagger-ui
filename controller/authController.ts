import { Application, Request, Response } from 'express';
import Login from '../model/login';
import authService = require('../service/authService');

export default function (app:Application) {
  app.get('/login', async (req:Request, res: Response) => {
    res.render('login-page');
  });

  app.post('/login', async (req:Request, res:Response) => {
    const data: Login = req.body;

    try {
      const token = await authService.login(data);

      if (!token) {
        res.locals.errormessage = 'Invalid Credentials';
        res.render('login-page', req.body);
        return;
      }

      req.session.token = token;
      res.redirect('/');
    } catch (e) {
      console.error(e);
      res.locals.errormessage = e.message;
      res.render('login-page', req.body);
    }
  });
}
