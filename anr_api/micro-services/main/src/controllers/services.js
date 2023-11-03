import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as services  from '../services'
import { ErrorsMapped } from '../config/errors-mapped';
import Services from '../models/services';

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, ['organizationId', 'description']);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const services = await Services
    .query('description').eq(req.body.description)
    .where('organizationId').eq(req.body.organizationId)
    .exec();
    
    if (services.length > 0) {
      ErrorsMapped.Custom.message = 'Service already registered';
      return ErrorsMapped.Custom;
    }

    return null;

  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }
}

async function canUpdate(req) {
  try {
    const service = await Services.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    if (service === undefined || !service) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

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
    const service = await Services.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });
    
    if (service === undefined || !service) {
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
    const error = await canCreate(req);
    if (error) {
      return utils.sendError(error, next);
    }
    
    delete req.body.id
    
    const service = await Services.create(req.body);

    return res.json({ service });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    const service = await Services.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id
    });

    if (service === undefined || !service) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    const response = { service: service };
    
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

    const service = await Services.update(
      {
        organizationId: req.params.organizationId,
        id: req.params.id
      },
      req.body
    );
    
    return res.json({ service });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const listByOrganization = async (req, res, next) => {
  try {
    const services = await Services
    .query('organizationId').eq(req.params.organizationId)
    .all().exec();

    let response = { services };
    
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

    const service = await Services.delete({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const removeTests = async (req, res, next) => {
  try {
    await services.removeServiceTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
