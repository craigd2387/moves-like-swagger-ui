import { Application, Request, Response } from 'express';
import axios from 'axios';
import Login from '../model/login';
import login from '../service/authService';

export default function (app:Application) {
  app.get('/login', async (req:Request, res: Response) => {
    // clear any existing jwt
    req.session.token = undefined;
    // render the login page on route login
    res.render('login-page');
  });

  // route to enter login details
  app.post('/login', async (req:Request, res:Response) => {
    const data: Login = req.body;

    try {
      // call to authservice to pass entered credentials to api. returns token string
      const token = await login(data);

      if (!token) {
        // if no token returned from api
        res.locals.errormessage = 'Invalid Credentials';
        // render login page with previous passed in credentials
        res.render('login-page', req.body);
        return;
      }

      // if token returned (valid login) store returned token in users session
      req.session.token = token;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      // once logged in direct user to home page
      res.redirect('/');
    } catch (e) {
      // if error returned from api, re-render login page
      console.error(e);
      res.locals.errormessage = e.message;
      res.render('login-page', req.body);
    }
  });
}
