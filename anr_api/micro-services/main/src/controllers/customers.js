import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as services  from '../services'
import { ErrorsMapped } from '../config/errors-mapped';
import Customers from '../models/customers';

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, ['organizationId', 'name']);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const customers = await Customers
    .query('name').eq(req.body.name)
    .where('organizationId').eq(req.body.organizationId)
    .exec();
    
    if (customers.length > 0) {
      ErrorsMapped.Custom.message = 'Customer already registered';
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
    const customer = await Customers.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });

    if (customer === undefined || !customer) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
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
    const customer = await Customers.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id 
    });
    
    if (customer === undefined || !customer) {
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
    
    const customer = await Customers.create(req.body);

    return res.json({ customer });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    const customer = await Customers.get({ 
      organizationId: req.params.organizationId, 
      id: req.params.id
    });

    if (customer === undefined || !customer) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    return res.json({ customer });  
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

    const customer = await Customers.update(
      {
        organizationId: req.params.organizationId,
        id: req.params.id
      },
      req.body
    );
    
    return res.json({ customer });  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const listByCustomer = async (req, res, next) => {
  try {
    const customers = await Customers
    .query('organizationId').eq(req.params.organizationId)
    .all().exec();

    return res.json({ customers });  
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

    const customer = await Customers.delete({ 
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
