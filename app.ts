import { Request, Response } from 'express';
import express = require('express');
import path = require('path');
import nunjucks = require('nunjucks');

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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/', async (req: Request, res: Response) => {
  res.render('index');
});

require('./controller/jobController')(app);