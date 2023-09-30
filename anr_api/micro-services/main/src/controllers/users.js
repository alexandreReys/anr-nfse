import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as services  from '../services'
import { ErrorsMapped } from '../config/errors-mapped';
import Users from '../models/users';

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canUpdate(req) {
  try {
    const user = await Users.get(req.params.id);
    if (user === undefined || !user) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    // if (!!req.body.email) {
    //   ErrorsMapped.Custom.message = 'Changing Email is not allowed';
    //   return ErrorsMapped.Custom;
    // }

    if (!!req.body.password) {
      ErrorsMapped.Custom.message = 'Changing Password is not allowed';
      return ErrorsMapped.Custom;
    }

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  CHECK PERMISSION
    ////////////////////////////////////////////////////////////////////////

    // if (!(await utils.isUserAdminOrOwner(req, user.id)))
    //   return ErrorsMapped.NoPermissionToUpdate;

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    return null;
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canDelete(req) {
  try {
    let user = await Users.get(req.params.id);
    if (user === undefined || !user) {
      return ErrorsMapped.RecordNotExist;
    }
    return null;
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }
}

////////////////////////////////////////////////////////////////////////
//  ENDPOINTS
////////////////////////////////////////////////////////////////////////

export const create = async (req, res, next) => {
  try {
    delete req.body.id

    const user = await Users.create(req.body);

    delete user.password

    return res.json(user);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const update = async (req, res, next) => {
  try {
    const error = await canUpdate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    delete req.body.id
    delete req.body.password

    const user = await Users.update(
      { id: req.params.id },
      req.body
    );

    delete user.password

    return res.json(user);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const remove = async (req, res, next) => {
  try {
    const error = await canDelete(req);
    if (error) {
      return utils.sendError(error, next);
    }

    const user = await Users.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const listAll = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const users = await Users.scan().exec();

    let response = { users };

    if (req.version === 'v2') {
      let userss = [];
      for (const user of users) {
        userss.push( { user } )
      }
      response = { users: userss }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const user = await Users.get(req.params.id);
    if (user === undefined || !user) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { user };

    if (req.version === 'v2') {
      response = { user: { info: user } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const me = async (req, res, next) => {
  try {
    const token = services.getTokenData(req);

    if (token.error) {
      return utils.sendError(token.error, next);
    }

    const user = await Users.get(token.data.id);
    if (user === undefined || !user) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    if (user.token !== undefined) delete user.token;

    delete user.password;
    delete user.wixId;

    let response = { user, token: token.data.token };

    if (req.version === 'v2') {
      response = { user: { info: user }, token: token.data.token }
    }
    
    return res.json(response);    
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const removeTests = async (req, res, next) => {
  try {
    await services.removeUserTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
