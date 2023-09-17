const bcrypt = require('bcryptjs');
const utils = require('../utils');
const { ErrorsMapped } = require('../config/errors-mapped');
const User = require('../models/users');

////////////////////////////////////////////////////////////////////////
//  Auxiliary functions
////////////////////////////////////////////////////////////////////////

async function canRegister(req, origin) {
  try {
    let error = {};

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    if ( origin === 'Register' ) {
      error = utils.checkRequiredFields(req.body, ['password', 'email', 'firstName', 'lastName']);
      if (error) return error;
    };

    if ( origin === 'SocialLogin' ) {
      error = utils.checkRequiredFields(req.body, ['wixId', 'email', 'firstName', 'lastName']);
      if (error) return error;
    };

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    // utils.normalizeFields(req.body, [
    //   { name: 'dateField1',   type: 'date' },
    //   { name: 'integerField', type: 'integer' },
    //   { name: 'booleanField', type: 'boolean' }
    // ]);

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    req.body.email = req.body.email.toLowerCase();
    const users = await User.query('email').eq(req.body.email).exec();
    
    if (users.length > 0) {
      ErrorsMapped.Custom.message = 'Email already registered';
      return ErrorsMapped.Custom;
    }
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canSocialLogin(req) {
  try {
    let error = {};

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    error = utils.checkRequiredFields(req.body, ['wixId', 'email', 'firstName', 'lastName']);
    if (error) return error;

  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

////////////////////////////////////////////////////////////////////////
//  Endpoints
////////////////////////////////////////////////////////////////////////

exports.login = async (req, res, next) => {
  try {
    const body = req.body;

    if (!body || !('email' in body) || !('password' in body))
      return utils.sendError(ErrorsMapped.InvalidCredentials, next);

    let users = await User.query('email').eq(body.email).exec();

    if (!users || (users && users.length === 0))
      return utils.sendError(ErrorsMapped.InvalidCredentials, next);

    const user = users[0];

    if (bcrypt.compareSync(body.password, user.password)) {
      const token = utils.getToken({
        email: user.email,
        id: user.id,
        wixId: user.wixId,
        role: user.role,
      });

      if (user.token !== undefined) delete user.token;

      delete user.password;
      delete user.wixId;
  
      let response = { user, token };
  
      if (req.version === 'v2') {
        response = { user: { info: user }, token }
      }
      
      return res.json(response);
    } else {
      return utils.sendError(ErrorsMapped.InvalidCredentials, next);
    }      
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.social = async (req, res, next) => {
  try {
    let user = {};

    const err = await canSocialLogin(req);
    if (err) return utils.sendError(err, next);

    // if ( !('email' in req.body) || !('wixId' in req.body) || !req.body.email || !req.body.wixId ) {
    //   console.log('Error: Email and wixId are required');
    //   return utils.sendError(ErrorsMapped.InvalidCredentials, next);
    // }

    req.body.email = req.body.email.toLowerCase();

    let users = await User.query('email').eq(req.body.email).exec();

    if (users !== undefined && (users.length > 0)) {
      user = users[0];
    } else {
      const err = await canRegister(req, 'SocialLogin');
      if (err) return utils.sendError(err, next);

      req.body.password = bcrypt.hashSync(':$aÇ5g~&2:$aç5g^&2', 10);
      user = await registerUser(req.body);
    }

    const token = utils.getToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      role: user.role,
    });

    if (user.token !== undefined) delete user.token;

    delete user.password;
    delete user.wixId;

    let response = { user, token };

    if (req.version === 'v2') {
      response = { user: { info: user }, token }
    }
    
    return res.json(response);
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.register = async (req, res, next) => {
  try {
    const err = await canRegister(req, 'Register');
    if (err) return utils.sendError(err, next);

    if ('email' in req.body) req.body.email = req.body.email.toLowerCase();

    if (req.files) {
      req.files.forEach((file) => {
        req.body[file.fieldname] = utils.s3CloudfrontLocation(file);
      });
    }

    const error = null; //await canCreate(req);
    if (error) {
      if (req.files) {
        const names = req.files.map((file) => {
          return file.key;
        });
        await removeFiles(names);
      }
      return utils.sendError(error, next);
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    // req.body.token = utils.getToken({ email: req.body.email });

    utils.normalizeImage(req.body, 'profileImage');

    const user = await registerUser(req.body);
  
    if (user.token !== undefined) delete user.token;
    delete user.password;
    const token = utils.getToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      role: user.role,
    });
    
    if (user.token !== undefined) delete user.token;

    delete user.password;
    delete user.wixId;

    let response = { user, token };

    if (req.version === 'v2') {
      response = { user: { info: user }, token }
    }
    
    return res.json(response);
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

async function registerUser(data) {
  return await User.create(data);    
}
