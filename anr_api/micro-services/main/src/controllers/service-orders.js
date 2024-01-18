import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as services  from '../services'
import { ErrorsMapped } from '../config/errors-mapped';
import ServiceOrders from '../models/serviceOrders';
import Customers from '../models/customers';
import Services from '../models/services';

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(
      req.body, [
        'organizationId', 
        'description',
        'customerId',
        'serviceId',
      ]);

    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    return;

  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }
}

async function canUpdate(req) {
  try {
    const serviceOrder = await ServiceOrders.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    if (serviceOrder === undefined || !serviceOrder) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    return;
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }

  return null;
}

async function canDelete(req) {
  try {
    const serviceOrder = await ServiceOrders.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });
    
    if (serviceOrder === undefined || !serviceOrder) {
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
    
    const serviceOrder = await ServiceOrders.create(req.body);

    return res.json({ serviceOrder });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    const serviceOrder = await ServiceOrders.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id
    });

    if (serviceOrder === undefined || !serviceOrder) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    return res.json({ serviceOrder });  
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

    const serviceOrder = await ServiceOrders.update(
      {
        organizationId: req.params.organizationId,
        id: req.params.id
      },
      req.body
    );
    
    return res.json({ serviceOrder });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};


export const list = async (req, res, next) => {
  try {
    const serviceOrders = await ServiceOrders
    .query('organizationId').eq(req.params.organizationId)
    .all().exec();

    let response = [];

    for (const serviceOrder of serviceOrders) {
      const customer = await Customers.get({ 
        organizationId: req.params.organizationId, 
        id: serviceOrder.customerId, 
      });
  
      const service = await Services.get({ 
        organizationId: req.params.organizationId, 
        id: serviceOrder.serviceId,
      });

      response.push({ ...serviceOrder, customerName: customer.name, serviceDescription: service.description })
    }

    return res.json({ serviceOrders: response });  
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

    const serviceOrder = await ServiceOrders.delete({ 
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
    await services.removeCustomerTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
