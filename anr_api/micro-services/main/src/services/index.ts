import { Request } from "express";

import * as jwt from 'jsonwebtoken';
import { ErrorsMapped } from '../config/errors-mapped';
import * as utils from '../utils';
import * as Users from '../models/users';


export const checkReqVersion = (req: Request) => {
  switch (true) {
    case req.path.includes('/v1/'):
      return 'v1';
      break;
    case req.path.includes('/v2/'):
      return 'v2';
      break;
    default:
      return 'v0';
      break;
  };
};

function getAuthorizerInfo(req) {
  return !!req.requestContext.authorizer.email
    ? req.requestContext.authorizer
    : req.requestContext.authorizer.claims;
};

export const getTokenUserRole = (req: Request) => {
  const tokenInfo = getAuthorizerInfo(req);
  const roles = tokenInfo.role ? tokenInfo.role.split('|') : [];
  return({
    email: tokenInfo.email,
    userId: tokenInfo.id,
    isAdmin: roles.includes('ADMIN'),
    roles
  })
};

export const getTokenData = (req: Request) => {
  try {
    let token = req.apiGateway.event.headers.Authorization;

    if (token === undefined || !token) {
      ErrorsMapped.Custom.message = 'Token is Required';
      return {error: ErrorsMapped.Custom};
    }

    token = token.replace('Bearer ', '');
    let tokenData;
    try {
      tokenData = jwt.verify(
        token, 
        process.env.JWT_SECRET
      );
    } catch (error) {
      console.log(error.message);
      ErrorsMapped.Custom.message = 'Token invalido';
      return {error: ErrorsMapped.Custom};
    }
    tokenData.token = token;

    return { data: tokenData }
  } catch (err) {
    console.log('err', err);
    ErrorsMapped.Custom.message = err.message;
    return {error: ErrorsMapped.Custom};
  };
};

export const removeUserTests = async () => {
  const users = await Users.scan('email').eq('test@test.com').exec();
  if (users.length > 0) {
    let idsToDelete = [];
    users.forEach((user) => idsToDelete.push(user.id));
    console.log('Removing Users Tests:', idsToDelete);
    await Users.batchDelete(idsToDelete);
  }
}
