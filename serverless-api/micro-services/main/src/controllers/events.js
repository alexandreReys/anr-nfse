const bcrypt = require('bcryptjs');
const utils = require('../utils');
const services = require('../services');
const { ErrorsMapped } = require('../config/errors-mapped');
const Events = require('../models/event');
const Worlds = require('../models/worlds');
const Guests = require('../models/guests');

////////////////////////////////////////////////////////////////////////
//  Auxiliary functions
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, [
      'name', 'startDate', 'endDate', 'minAge', 'private'
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

    const events = await Events
      .scan('name').eq(req.body.name)
      .where('startDate').eq(req.body.startDate)
      .where('endDate').eq(req.body.endDate)
      .exec();
    
    if (events.length > 0) {
      return ErrorsMapped.EventAlreadyExists;
    }
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canUpdate(req) {
  try {
    const event = await Events.get(req.params.id);
    if (event === undefined || !event) {
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
    const event = await Events.get(req.params.id);
    if (event === undefined || !event) {
      return ErrorsMapped.RecordNotExist;
    }

    const worlds = await Worlds
      .query('eventId').eq(event.id)
      .exec()
    if (worlds.length > 0) {
      ErrorsMapped.Custom.message = 'Event has Worlds';
      return ErrorsMapped.Custom;
    }
    
    const guests = await Guests
      .query('eventId').eq(event.id)
      .exec()
    if (guests.length > 0) {
      ErrorsMapped.Custom.message = 'Event has Guests';
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
    const token = services.getTokenData(req);
    if (token.error) {
      return utils.sendError(token.error, next);
    }    
    const tokenUserId = token.data.id;

    const error = await canCreate(req);
    if (error) {
      return utils.sendError(error, next);
    }

    /////////////////////////////////////////////////////////////////////////////////////
    // Create Event
    /////////////////////////////////////////////////////////////////////////////////////
    
    req.body.owner = tokenUserId;
    let event = await Events.create(req.body);
    if (!event) {
      ErrorsMapped.Custom.message = 'Error when trying to create Event';
      return utils.sendError(ErrorsMapped.Custom, next);
    }
    
    /////////////////////////////////////////////////////////////////////////////////////
    // createWorld
    /////////////////////////////////////////////////////////////////////////////////////
    
    const worldResponse = await createWorld(event);
    if (worldResponse.error) {
      return utils.sendError(worldResponse.error, next);
    }  
    const world = { info: worldResponse.data };
    
    /////////////////////////////////////////////////////////////////////////////////////
    // updateDefaultWorld
    /////////////////////////////////////////////////////////////////////////////////////
    
    const eventResponse = await updateDefaultWorld(event.id, world.info.id);
    if (eventResponse.error) {
      return utils.sendError(eventResponse.error, next);
    }  
    event = eventResponse.data;
    
    /////////////////////////////////////////////////////////////////////////////////////
    // response
    /////////////////////////////////////////////////////////////////////////////////////
    
    let response = { event, world };
    if (req.version === 'v2') {
      response = { event: { info: event }, world }
    }
    
    return res.json(response);  

  } catch (error) {
    console.log(error);
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }

  async function createWorld(event) {
    try {
      const worldData = {
        eventId: event.id,
        name: event.name + ' - World',
        startDate: event.startDate,
        endDate: event.endDate,
        minAge: event.minAge,
        private: event.private,
        owner: event.owner,
        friendlyId: event.friendlyId,
      }

      let world;
      try {
        world = await Worlds.create(worldData);
      } catch (error) {
        console.log(error);
        ErrorsMapped.Custom.message = 'Error when trying to create World';
        return {error: ErrorsMapped.Custom};
      }

      return { data: world };

    } catch (error) {
      console.log(error);
      ErrorsMapped.Custom.message = error;
      return {error: ErrorsMapped.Custom};
    }
  }

  async function updateDefaultWorld(eventId, worldId) {
    try {
      let event;
      try {
        event = await Events.update({ id: eventId }, { defaultWorld: worldId });
      } catch (error) {
        console.log(error);
        ErrorsMapped.Custom.message = 'Error when trying to updade event/defaultWorld';
        return {error: ErrorsMapped.Custom};
      }

      return { data: event };
    } catch (error) {
      console.log(error);
      ErrorsMapped.Custom.message = error;
      return {error: ErrorsMapped.Custom};
    }
  }
};

exports.listAll = async (req, res, next) => {
  try {
    let events;
    const userRole = services.getTokenUserRole(req);
    
    if (userRole.isAdmin === false) {
      events = await eventsOwnerOrInvited(userRole.userId);
    } else {
      if (req.params.listAll === undefined) {
        events = await Events.scan().exec();
      } else {
        if (req.params.listAll === 'false') {
          events = await eventsOwner(userRole.userId);
        } else {
          events = await Events.scan().exec();
        };
      };
    };
    
    let response = { events };

    if (req.version === 'v2') {
      let eventss = [];
      for (const event of events) {
        eventss.push( { event } )
      }
      response = { events: eventss }
    }
    
    return res.json(response); 
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }

  async function eventsOwnerOrInvited(userId) {
    let eventsInvited = [];
    const guests = await Guests
      .query('userId').eq(userId)
      .exec();

    if (guests.length > 0) {
      for (const guest of guests) {
        const event = await Events.get(guest.eventId);
        if (event) eventsInvited.push(event);
      };
    }

    const eventsUserIsOwner = await eventsOwner(userId);
    
    const combinedArray = [...eventsInvited, ...eventsUserIsOwner];
    
    const uniqueIds = {};

    const events = combinedArray.filter(obj => {
      if (!uniqueIds[obj.id]) {
        uniqueIds[obj.id] = true;
        return true;
      }
      return false;
    });

    return(events);
  };

  async function eventsOwner(userId) {
    const events = await Events.scan().exec();
    const response = events.filter(event => event.owner === userId);
    return(response);
  };
};

exports.subscribed = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const events = await services.getSubscribedEvents(userId);

    let response = { events };

    if (req.version === 'v2') {
      let eventss = [];
      for (const event of events) {
        eventss.push( { event } )
      }
      response = { events: eventss }
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

    const event = await Events.update(
      { id: req.params.id },
      req.body
    );

    let response = { event };

    if (req.version === 'v2') {
      response = { event: { info: event } }
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

    const event = await Events.get(req.params.id);
    if (event === undefined || !event) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { event };

    if (req.version === 'v2') {
      response = { event: { info: event } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.checkIfUserIsInEvent = async (req, res, next) => {
  try {
    const token = services.getTokenData(req);
    if (token.error) {
      return utils.sendError(token.error, next);
    }    
    const userId = token.data.id;
    
    const events = await Guests
      .query('userId').eq(userId)
      .where('eventId').eq(req.params.eventId)
      .exec();

    const userInEvent = events.length > 0;

    return res.json({ userInEvent });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const error = await canDelete(req);
    if (error) {
      return utils.sendError(error, next);
    }

    await Events.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.removeTests = async (req, res, next) => {
  try {
    await services.removeEventTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

exports.removeAllTests = async (req, res, next) => {
  try {
    await services.removeUserTests();
    await services.removeEventTests();
    await services.removeWorldTests();
    await services.removeGuestTests();
    await services.removePropTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
