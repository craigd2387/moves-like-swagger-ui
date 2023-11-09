import {Request, Response} from "express"
const express = require ('express')
const path = require('path')
const nunjucks = require('nunjucks')

const app = express();

const appViews = path.join(__dirname, '/views')
//const appViews = path.join(__dirname, '/templates')

const nunjucksConfig={
    autoescape: true,
    noCache: true,
    express: app
}

nunjucks.configure(appViews, nunjucksConfig)

app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use (express.json())
app.use(express.urlencoded({ extended: true}))
app.listen(3000, () =>{
    console.log('Server listening on port 3000')
})

app.get('/', async(req: Request, res: Response) =>{
    res.render('index');
})