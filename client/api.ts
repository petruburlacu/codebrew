import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import * as cookieParser from 'cookie-parser';
import fetch from 'node-fetch';

export const api = express.Router();

api.use(
  cors({
    origin: true,
    credentials: true,
  })
);

api.use(bodyParser.json());
api.use(cookieParser());

const hash = crypto.createHash('sha512');
api.post('/auth/register', async (req, res) => {
  const username = req.body.username
  const email = req.body.email;
  const password = hash
    .update(req.body.password)
    .digest('hex');
  const response: any = await registerFromStrapi(username, email, password);
  res.send(response);
});

api.post('/auth/login', async (req, res) => {
  const identifier = req.body.identifier
  const password = req.body.password;
  const response: any = await authenticateFromStrapi(identifier, password);
  if (!response || !response.jwt) {
    res.sendStatus(401);
  } else {
    res.cookie('authentication', response.jwt, {
      maxAge: 600 * 1000,
      httpOnly: true,
    });
    delete response.user.id;
    res.send(response);
  }
});

api.get('/auth/isAuthenticated', (req, res) => {
  res.status(200).send({authenticated: !!req.cookies.authentication});
});

api.get('/auth/signOut', (req, res) => {
  res.cookie('authentication', '', {
    maxAge: -1,
    httpOnly: true
  });
  res.status(200).send({status: 'Signed out'});
});

async function registerFromStrapi(username: string, email: string, password: string) {
  console.log('Inside registerFromStrapi')
  const data = JSON.stringify({username, email, password});
  const response = await fetch('http://localhost:28002/api/auth/local/register', {
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
}

async function authenticateFromStrapi(identifier: string, password: string) {
  console.log('Inside authenticateFromStrapi');
  const data = JSON.stringify({identifier, password});
  const response = await fetch('http://localhost:28002/api/auth/local', {
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
}