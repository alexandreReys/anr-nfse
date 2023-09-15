const bcrypt = require('bcryptjs');
const utils = require('../utils');
const services = require('../services');
const { ErrorsMapped } = require('../config/errors-mapped');
const Guests = require('../models/guests');
import Users from '../models/users';

////////////////////////////////////////////////////////////////////////
//  Auxiliary functions
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, ['eventId', 'userId']);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    // utils.normalizeField(req.body, '', 'date');

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const guests = await Guests
      .query('eventId').eq(req.body.eventId)
      .where('userId').eq(req.body.userId)
      .exec();
    
    if (guests.length > 0) {
      ErrorsMapped.Custom.message = 'Guest already registered';
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
    const guest = await Guests.get(req.params.id);
    if (guest === undefined || !guest) {
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
    const guest = await Guests.get(req.params.id);
    if (guest === undefined || !guest) {
      return ErrorsMapped.RecordNotExist;
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

    const guest = await Guests.create(req.body);

    // return res.json({ guest });

    let response = { guest };

    if (req.version === 'v2') {
      response = { guest: { info: guest } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.listByEvent = async (req, res, next) => {
  try {
    const guests = await Guests
      .query('eventId').eq(req.params.eventId)
      .exec();

    let guestsUsers = [];
    for (const guest of guests) {
      const user = await Users.get(guest.userId);
      let guestUser = null;
      if (!!user) {
        guestUser = { ...guest, user };
      }
      guestsUsers.push( { guest: guestUser } )
    }

    let response = { guests: guestsUsers };
  
    return res.json(response);     
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.listAll = async (req, res, next) => {
  try {
    // req.body.user = utils.getUser(req);

    const guests = await Guests.scan().exec();

    // return res.json({guests});

    let response = { guests };

    if (req.version === 'v2') {
      let guestss = [];
      for (const guest of guests) {
        guestss.push( { guest } )
      }
      response = { guests: guestss }
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

    const guest = await Guests.update(
      { id: req.params.id },
      req.body
    );

    // return res.json({ guest });

    let response = { guest };

    if (req.version === 'v2') {
      response = { guest: { info: guest } }
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

    const guest = await Guests.get(req.params.id);
    if (guest === undefined || !guest) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { guest };

    if (req.version === 'v2') {
      response = { guest: { info: guest } }
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

    await Guests.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.removeTests = async (req, res, next) => {
  try {
    await services.removeGuestTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
