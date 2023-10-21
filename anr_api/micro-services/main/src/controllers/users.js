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
    const user = await Users.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    if (user === undefined || !user) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    if (!!req.body.password) {
      ErrorsMapped.Custom.message = 'Changing Password is not allowed';
      return ErrorsMapped.Custom;
    }

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
    const user = await Users.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });
    
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
    delete req.body.id;
    
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const user = await Users.create(req.body);

    delete user.password

    return res.json(user);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    const user = await Users.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id
    });

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

export const update = async (req, res, next) => {
  try {
    const error = await canUpdate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    delete req.body.organizationId
    delete req.body.id
    delete req.body.password

    const user = await Users.update(
      {
        organizationId: req.params.organizationId,
        id: req.params.id
      },
      req.body
    );

    delete user.password

    return res.json(user);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const listByOrganization = async (req, res, next) => {
  try {
    const users = await Users.query('organizationId').eq(req.params.organizationId).exec();

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

export const remove = async (req, res, next) => {
  try {
    const error = await canDelete(req);
    if (error) {
      return utils.sendError(error, next);
    }

    const user = await Users.delete({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
