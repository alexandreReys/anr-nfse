const bcrypt = require('bcryptjs');
const utils = require('../utils');
const services = require('../services');
const { ErrorsMapped } = require('../config/errors-mapped');
const Props = require('../models/props');

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, ['worldId', 'ueIdentifier', 'name']);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const props = await Props
      .query('worldId').eq(req.body.worldId)
      .where('name').eq(req.body.name)
      .exec();
    
    if (props.length > 0) {
      ErrorsMapped.Custom.message = 'Prop already registered';
      return ErrorsMapped.Custom;
    }
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canUpdate(req) {
  try {
    const prop = await Props.get(req.params.id);
    if (prop === undefined || !prop) {
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

  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canDelete(req) {
  try {
    const prop = await Props.get(req.params.id);
    if (prop === undefined || !prop) {
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

exports.create = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const error = await canCreate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    const prop = await Props.create(req.body);

    let response = { prop };

    if (req.version === 'v2') {
      response = { prop: { info: prop } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.listByWorld = async (req, res, next) => {
  try {
    const props = await Props
      .query('worldId').eq(req.params.worldId)
      .exec();

    let response = { props };

    if (req.version === 'v2') {
      let propss = [];
      for (const prop of props) {
        propss.push( { prop } )
      }
      response = { props: propss }
    }
    
    return res.json(response);      
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.listAll = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const props = await Props.scan().exec();

    let response = { props };

    if (req.version === 'v2') {
      let propss = [];
      for (const prop of props) {
        propss.push( { prop } )
      }
      response = { props: propss }
    }
    
    return res.json(response);      
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.update = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const error = await canUpdate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    delete req.body.id

    const prop = await Props.update(
      { id: req.params.id },
      req.body
    );

    let response = { prop };

    if (req.version === 'v2') {
      response = { prop: { info: prop } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const error = await canDelete(req);
    if (error) {
      return utils.sendError(error, next);
    }

    await Props.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.get = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const prop = await Props.get(req.params.id);
    if (prop === undefined || !prop) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { prop };

    if (req.version === 'v2') {
      response = { prop: { info: prop } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.removeTests = async (req, res, next) => {
  try {
    await services.removePropTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
