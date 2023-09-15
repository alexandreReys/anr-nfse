const bcrypt = require('bcryptjs');
const utils = require('../utils');
const services = require('../services');
const { ErrorsMapped } = require('../config/errors-mapped');
const Events = require('../models/event');
const Worlds = require('../models/worlds');
const Props = require('../models/props');

////////////////////////////////////////////////////////////////////////
//  Auxiliary functions
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, [
      'eventId', 'name', 'startDate', 'endDate', 'minAge', 'private'
    ]);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    utils.normalizeField(req.body, 'startDate', 'date');
    utils.normalizeField(req.body, 'endDate', 'date');
    utils.normalizeField(req.body, 'minAge', 'integer');
    utils.normalizeField(req.body, 'private', 'boolean');

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const event = await Events.get(req.body.eventId);
    if (!event) {
      return ErrorsMapped.EventNotFound;
    }

    const worlds = await Worlds
      .scan('name').eq(req.body.name)
      .where('startDate').eq(req.body.startDate)
      .where('endDate').eq(req.body.endDate)
      .exec();
    if (worlds.length > 0) {
      return ErrorsMapped.WorldAlreadyExists;
    }
    
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canUpdate(req) {
  try {
    const world = await Worlds.get(req.params.id);
    if (world === undefined || !world) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    utils.normalizeFields(req.body, [
      { name: 'startDate', type: 'date' },
      { name: 'endDate',   type: 'date' },
      { name: 'minAge',    type: 'integer' },
      { name: 'private',   type: 'boolean' }
    ]);

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
    const world = await Worlds.get(req.params.id);
    if (world === undefined || !world) {
      return ErrorsMapped.RecordNotExist;
    }

    const props = await Props
      .query('worldId').eq(world.id)
      .exec()
    if (props.length > 0) {
      ErrorsMapped.Custom.message = 'World has Props';
      return ErrorsMapped.Custom;
    }
    
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

////////////////////////////////////////////////////////////////////////
//  Endpoints
////////////////////////////////////////////////////////////////////////

exports.create = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const error = await canCreate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    const world = await Worlds.create(req.body);
    
    let response = { world };

    if (req.version === 'v2') {
      response = { world: { info: world } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.listByEvent = async (req, res, next) => {
  try {
    const worlds = await Worlds
      .query('eventId').eq(req.params.eventId)
      .exec();

    let response = { worlds };

    if (req.version === 'v2') {
      let worldss = [];
      for (const world of worlds) {
        worldss.push( { world: world } )
      }
      response = { worlds: worldss }
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

    const worlds = await Worlds.scan().exec();

    // return res.json({worlds});

    let response = { worlds };

    if (req.version === 'v2') {
      let worldss = [];
      for (const world of worlds) {
        worldss.push( { world } )
      }
      response = { worlds: worldss }
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

    const world = await Worlds.update(
      { id: req.params.id },
      req.body
    );

    let response = { world };

    if (req.version === 'v2') {
      response = { world: { info: world } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.get = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const world = await Worlds.get(req.params.id);
    if (world === undefined || !world) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { world };

    if (req.version === 'v2') {
      response = { world: { info: world } }
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

    await Worlds.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.removeTests = async (req, res, next) => {
  try {
    await services.removeWorldTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
