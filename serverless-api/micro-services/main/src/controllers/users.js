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

    if (
      req.body.wixId !== undefined &&
      req.body.wixId !== user.wixId
    ) {
      let users = await Users
        .query('wixId').eq(req.body.wixId)
        .exec();
      if (users.length > 0) return ErrorsMapped.RecordAlreadyExists;
    }

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
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

////////////////////////////////////////////////////////////////////////
//  ENDPOINTS
////////////////////////////////////////////////////////////////////////

export const update = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const error = await canUpdate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    delete req.body.id
    delete req.body.email
    delete req.body.password

    const user = await Users.update(
      { id: req.params.id },
      req.body
    );

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

export const remove = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

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

    const users = await Users.scan()
      .attributes(["id","firstName","lastName","email","avatarType","avatar","profileImage","wixId","role"])
      .exec();

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
