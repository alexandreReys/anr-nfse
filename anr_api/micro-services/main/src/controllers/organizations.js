import bcrypt from 'bcryptjs';
import * as utils from '../utils';
import * as services  from '../services'
import { ErrorsMapped } from '../config/errors-mapped';
import Organizations from '../models/organizations';

////////////////////////////////////////////////////////////////////////
//  AUXILIARY FUNCTIONS
////////////////////////////////////////////////////////////////////////

async function canCreate(req, origin) {
  try {
    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    const error = utils.checkRequiredFields(req.body, ['name', 'nationalRegistration', 'phoneNumber', 'email']);
    if (error) return error;

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    const organizations = await Organizations
      .query('nationalRegistration').eq(req.body.nationalRegistration)
      .exec();
    
    if (organizations.length > 0) {
      ErrorsMapped.Custom.message = 'Organization already registered';
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
    const organization = await Organizations.get(req.params.id);
    if (organization === undefined || !organization) {
      return ErrorsMapped.RecordNotExist;
    }

    ////////////////////////////////////////////////////////////////////////
    //  CHECK FIELDS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  NORMALIZATIONS
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    //  VALIDATIONS
    ////////////////////////////////////////////////////////////////////////

    if ('nationalRegistration' in req.body) {
      const organizations = await Organizations
        .query('nationalRegistration').eq(req.body.nationalRegistration)
        .exec();
    
      if (organizations.length > 0 && organizations[0].id !== req.params.id) {
        ErrorsMapped.Custom.message = 'Organization already registered';
        return ErrorsMapped.Custom;
      }
    }

    return null;

  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return ErrorsMapped.Custom;
  }
}

async function canDelete(req) {
  try {
    let organization = await Organizations.get(req.params.id);
    if (organization === undefined || !organization) {
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

    const organization = await Organizations.create(req.body);

    return res.json(organization);  
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

    delete req.body.id

    const organization = await Organizations.update(
      { id: req.params.id },
      req.body
    );

    return res.json(organization);  
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

    const organization = await Organizations.delete(req.params.id);

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const listAll = async (req, res, next) => {
  try {
    const organizations = await Organizations.scan().exec();

    let response = { organizations };

    if (req.version === 'v2') {
      let organizationss = [];
      for (const organization of organizations) {
        organizationss.push( { organization } )
      }
      response = { organizations: organizationss }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const get = async (req, res, next) => {
  try {
    const organization = await Organizations.get(req.params.id);
    if (organization === undefined || !organization) {
      return utils.sendError(ErrorsMapped.RecordNotExist, next);
    }

    let response = { organization };

    if (req.version === 'v2') {
      response = { organization: { info: organization } }
    }
    
    return res.json(response);  
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};

export const removeTests = async (req, res, next) => {
  try {
    await services.removeOrganizationTests();

    return res.json({ message: 'success' });
  } catch (error) {
    ErrorsMapped.Custom.message = error;
    return utils.sendError(ErrorsMapped.Custom, next);
  }
};
