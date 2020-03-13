import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import globalRouter from 'routers/globalRouter';
import helmet from 'helmet';
import path from 'path';
dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', globalRouter);
app.listen(PORT, () => console.log(`server is running at ${PORT}`));
