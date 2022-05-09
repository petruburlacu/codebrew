import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as crypto from 'crypto';
import * as cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import { LOGGER } from 'logger';

export const api = express.Router();

api.use(cors({ origin: true, credentials: true }));
api.use(bodyParser.json());
api.use(cookieParser());

const API: string = '/api'
const GET_REQUEST: string = 'GET';
const POST_REQUEST: string = 'POST';
const PUT_REQUEST: string = 'PUT';
const DELETE_REQUEST: string = 'DELETE';

const hash = crypto.createHash('sha512');
const AUTH_REGISTER: string = '/auth/register';
api.post(AUTH_REGISTER, async (req, res) => {
  logHttpRequest(POST_REQUEST, AUTH_REGISTER);
  const username = req.body.username
  const email = req.body.email;
  const password = hash.update(req.body.password).digest('hex');
  const response: any = await registerFromStrapi(username, email, password);
  res.send(response);
});

const AUTH_LOGIN: string = '/auth/login';
api.post(AUTH_LOGIN, async (req, res) => {
  logHttpRequest(POST_REQUEST, AUTH_LOGIN);
  const identifier = req.body.identifier
  const password = req.body.password;
  const response: any = await authenticateFromStrapi(identifier, password);
  if (!response || !response.jwt) {
    res.sendStatus(401);
  } else {
    const user = {
      username: response.user.username,
      email: response.user.email,
      token: response.jwt
    };
    res.cookie('authentication', user, { maxAge: 600 * 1000, httpOnly: true, sameSite: 'strict', secure: true });
    res.send(user);
  }
});

const AUTH_IS_AUTHENTICATED = '/auth/isAuthenticated';
api.get(AUTH_IS_AUTHENTICATED, (req, res) => {
  logHttpRequest(GET_REQUEST, AUTH_IS_AUTHENTICATED);
  const statusMessage = 'Authentication status: %s';
  if (req.cookies.authentication) {
    LOGGER.info(statusMessage, true)
    res.status(200).send(req.cookies.authentication);
  } else {
    LOGGER.info(statusMessage, false)
    res.sendStatus(401);
  }
});

const AUTH_SIGNOUT = '/auth/signOut';
api.get(AUTH_SIGNOUT, (req, res) => {
  logHttpRequest(GET_REQUEST, AUTH_SIGNOUT);
  res.cookie('authentication', '', { maxAge: -1, httpOnly: true, sameSite: 'strict' });
  res.status(200).send({status: 'Signed out'});
});

async function registerFromStrapi(username: string, email: string, password: string) {
  LOGGER.info('Inside registerFromStrapi');
  const data = JSON.stringify({username, email, password});
  const response = await fetch('http://localhost:28002/api/auth/local/register', {
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
}

async function authenticateFromStrapi(identifier: string, password: string) {
  LOGGER.info('Inside authenticateFromStrapi');
  const data = JSON.stringify({identifier, password});
  const response = await fetch('http://localhost:28002/api/auth/local', {
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'}
  });
  return response.json();
}

function logHttpRequest(requestType: string, endpoint: string) {
  LOGGER.info('%s %s%s', requestType, API, endpoint);
}