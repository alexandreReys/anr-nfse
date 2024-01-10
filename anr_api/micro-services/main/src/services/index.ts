import { Request } from "express";

import * as jwt from 'jsonwebtoken';
import { ErrorsMapped } from '../config/errors-mapped';
import * as utils from '../utils';
import Users from '../models/users';
import Organizations from '../models/organizations';
import Services from '../models/services';
import Customers from '../models/customers';

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

export const getUserTokenInfo = (req: Request) => {
  const tokenInfo = getAuthorizerInfo(req);
  const roles = tokenInfo.role ? tokenInfo.role.split('|') : [];
  return({
    email: tokenInfo.email,
    organizationId: tokenInfo.organizationId,
    userId: tokenInfo.id,
    isAdmin: roles.includes('ADMIN'),
    roles
  })
};

export const getTokenData = (req: Request) => {
  try {
    let token = req.headers.authorization;

    if ( typeof token !== 'string' || !token ) {
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
    let idsToDelete:any[] = [];
    users.forEach((user) => idsToDelete.push(user.id));
    console.log('Removing Users Tests:', idsToDelete);
    await Users.batchDelete(idsToDelete);
  }
}

export const removeOrganizationTests = async () => {
  const organizations = await Organizations.scan('email').eq('test@test.com').exec();
  if (organizations.length > 0) {
    let idsToDelete:any[] = [];
    organizations.forEach((user) => idsToDelete.push(user.id));
    console.log('Removing Organizations Tests:', idsToDelete);
    (await Organizations as any).batchDelete(idsToDelete);
  }
}

export const removeServiceTests = async () => {
  const services = await Services.scan('email').eq('test@test.com').exec();
  if (services.length > 0) {
    let idsToDelete:any[] = [];
    services.forEach((service) => idsToDelete.push(service.id));
    console.log('Removing Services Tests:', idsToDelete);
    await Services.batchDelete(idsToDelete);
  }
}

export const removeCustomerTests = async () => {
  const customers = await Customers.scan('email').eq('test@test.com').exec();
  if (customers.length > 0) {
    let idsToDelete:any[] = [];
    customers.forEach((customer) => idsToDelete.push(customer.id));
    console.log('Removing Customers Tests:', idsToDelete);
    await Customers.batchDelete(idsToDelete);
  }
}
