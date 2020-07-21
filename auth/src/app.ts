import express from 'express';
import 'express-async-errors'; // handles the promise of async method if we throw any error in it
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // Setting true so that it will trust req from k8s services

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false // Will change to true later 
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// If anything other than above route called,
// Throw not found error 
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };