import { Request, Response } from 'express';
import express = require('express');
import path = require('path');
import nunjucks = require('nunjucks');
import * as dotenv from "dotenv";
import session = require('express-session');

dotenv.config();

const app = express();

const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app,
};

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', 'html');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: process.env.CACHE_SECRET, cookie: { maxAge: 60000 }}));

declare module "express-session" {
  interface SessionData {
    token: String
  }
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/', async (req: Request, res: Response) => {
  res.render('index');
});

require("./controller/authController")(app);