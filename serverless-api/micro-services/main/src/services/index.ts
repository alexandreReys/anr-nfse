import { Request } from "express";

import * as jwt from 'jsonwebtoken';
import { ErrorsMapped } from '../config/errors-mapped';
import * as utils from '../utils';

import * as Guests from '../models/guests';
import * as Users from '../models/users';
import * as Events from '../models/event';
import * as Worlds from '../models/worlds';
import * as Props from '../models/props';

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

export const getSubscribedEvents = async (userId) => {
  const events = [];
  let resp;

  const guests = await Guests.scan('userId').eq(userId).exec();

  for (const guest of guests) {
    
    ////////////////////////////////////////////////////////////////
    //  EVENTS
    ////////////////////////////////////////////////////////////////

    // if (!guest.confirmed) {
    //   continue;
    // }

    const event = await Events.get(guest.eventId);
    if (!event) {
      await Guests.delete(guest.id);
      continue;
    }

    ////////////////////////////////////////////////////////////////
    //  EVENT MASTERS AND PLAYERS
    ////////////////////////////////////////////////////////////////

    let eventPlayers = [];
    const eventGuests = await Guests.query('eventId').eq(event.id).exec();
    for (const eventGuest of eventGuests) {
      const options = {
        attributes: [
          'id', 'firstName', 'lastName', 'email', 'avatarType', 'avatar', 'profileImage'
        ]
      };

      const user = await Users.get(eventGuest.userId, options)
      eventPlayers.push({ ...user, role: eventGuest.role });
    };

    const eventAdmins = eventPlayers.filter(item => item.role === 'MASTER' || item.role === 'ADMIN');

    ////////////////////////////////////////////////////////////////
    //  WORLDS
    ////////////////////////////////////////////////////////////////
    
    let eventWorlds = [];
    const worlds = await Worlds.query('eventId').eq(event.id).exec();
    for (const world of worlds) {

      ////////////////////////////////////////////////////////////////
      //  WORLD MASTERS AND PLAYERS
      ////////////////////////////////////////////////////////////////

      let worldPlayers = [];
      const worldGuests = await Guests.query('worldId').eq(world.id).exec();
      for (const worldGuest of worldGuests) {
        const options = {
          attributes: [
            'id', 'firstName', 'lastName', 'email', 'avatarType', 'avatar', 'profileImage'
          ]
        };

        const user = await Users.get(worldGuest.userId, options)
        worldPlayers.push({ ...user, role: worldGuest.role });
      };

      const worldAdmins = worldPlayers.filter(item => item.role === 'MASTER' || item.role === 'ADMIN');

      const props = await Props.query('worldId').eq(world.id).exec();

      eventWorlds.push({ info: world, admins: worldAdmins, players: worldPlayers, props: props});
    }

    events.push({ info: event, admins: eventAdmins, players: eventPlayers, worlds: eventWorlds });
  }

  return events;
};

export const removeEventTests = async () => {
  const events = await Events.scan('name').eq('Automatic Unit Test').exec();
  if (events.length > 0) {
    let idsToDelete = [];
    events.forEach((event) => idsToDelete.push(event.id));
    console.log('Removing Events Tests:', idsToDelete);
    await Events.batchDelete(idsToDelete);
  }
}

export const removeWorldTests = async () => {
  const worlds = await Worlds.scan('name').eq('Automatic Unit Test').exec();
  if (worlds.length > 0) {
    let idsToDelete = [];
    worlds.forEach((world) => idsToDelete.push(world.id));
    console.log('Removing Worlds Tests:', idsToDelete);
    await Worlds.batchDelete(idsToDelete);
  }
}

export const removeGuestTests = async () => {
  const guests = await Guests.scan('role').eq('Automatic Unit Test').exec();
  if (guests.length > 0) {
    let idsToDelete = [];
    guests.forEach((guest) => idsToDelete.push(guest.id));
    console.log('Removing Guests Tests:', idsToDelete);
    await Guests.batchDelete(idsToDelete);
  }
}

export const removePropTests = async () => {
  const props = await Props.scan('ueIdentifier').eq('Automatic Unit Test').exec();
  if (props.length > 0) {
    let idsToDelete = [];
    props.forEach((prop) => idsToDelete.push(prop.id));
    console.log('Removing Props Tests:', idsToDelete);
    await Props.batchDelete(idsToDelete);
  }
}

export const removeUserTests = async () => {
  const users = await Users.scan('email').eq('test@test.com').exec();
  if (users.length > 0) {
    let idsToDelete = [];
    users.forEach((user) => idsToDelete.push(user.id));
    console.log('Removing Users Tests:', idsToDelete);
    await Users.batchDelete(idsToDelete);
  }
}
