import express, { NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import { carRouter } from './routes/CarRouter';
import { passRouter } from './routes/PassRouter';
import { lotRouter } from './routes/LotRouter';
import { historyRouter } from './routes/HistoryRouter';
import { embeddedRouter } from './routes/EmbeddedRouter';
import dotenv from 'dotenv';
import passport = require('passport');
import { configurePassport } from './utils/passport';
import { passwordRouter } from './routes/Password';
import { redirectRouter } from './routes/Redirect';
import { Request, Response } from 'express';
import path from 'path';
import { Sequelize } from 'sequelize';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Helmet from 'helmet';
import { initializeTables } from './utils/passport';

const app = express();
app.use(Helmet());

// Set environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const password: string = process.env.DATABASE_PASSWORD as string;
const database: string = process.env.DATABASE_NAME as string;
const dbUsername: string = process.env.DATABASE_USERNAME as string;
const sessionSecret: string = process.env.SESSION_SECRET as string;
const dbHost: string = process.env.DATABASE_HOST as string;
const environment: string = process.env.NODE_ENV as string;
const testDatabase: string = process.env.DATABASE_TEST_NAME as string;

let dbName: string;
if (environment === 'development') {
    dbName = testDatabase;
} else {
    dbName = database;
}

// Allow server to receive CORS requests
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
    next();
});

// Let server attempt to reconnect to sequelize on failure
const retryOptions = {
    match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
    ],
    name: 'query',
    backoffBase: 100,
    backoffExponent: 1.1,
    timeout: 60000,
    max: Infinity,
};

// Initialize and configure PostgreSQL
export const sequelize = new Sequelize(dbName, dbUsername, password, {
    host: dbHost,
    dialect: 'postgres',
    port: 5432,
    retry: retryOptions,
});
initializeTables().then(() => app.emit('db_ready'));

// Configure express session
app.use(cookieParser());
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
    }),
);

// Passport config
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// General config
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
    }),
);
app.use(
    bodyParser.json({
        limit: '50mb',
    }),
);

app.use('/auth', profileRouter);
app.use('/auth/password', passwordRouter);
app.use('/redirect/', redirectRouter);
app.use('/car', carRouter);
app.use('/lot', lotRouter);
app.use('/pass', passRouter);
app.use('/history', historyRouter);
app.use('/embedded', embeddedRouter);

// For production
app.use(express.static(path.join(__dirname, '../../build_client/')));
app.get('*', (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../../build_client/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

export default app;
