class ErrorsMapped {}

//prettier-ignore
ErrorsMapped.Custom = {
  message: '',
  code: 1,
  status: 400,
  errorKey: ''
};
ErrorsMapped.RequestNotFound = {
  message: 'RequestNotFoundException',
  code: 1,
  status: 404,
  errorKey: 'RequestNotFoundException',
};ErrorsMapped.InvalidCredentials = {
  message: 'InvalidCredentialsException',
  code: 2,
  status: 401,
  errorKey: 'InvalidCredentialsException',
};
ErrorsMapped.EmailInUse = {
  message: 'EmailInUseException',
  code: 3,
  status: 409,
  errorKey: 'EmailInUseException',
};
ErrorsMapped.EmptyEmail = {
  message: 'EmptyEmailException',
  code: 4,
  status: 400,
  errorKey: 'EmptyEmailException',
};
ErrorsMapped.InvalidEmail = {
  message: 'InvalidEmailException',
  code: 5,
  status: 400,
  errorKey: 'InvalidEmailException',
};
ErrorsMapped.InvalidPassword = {
  message: 'InvalidPasswordException',
  code: 6,
  status: 401,
  errorKey: 'InvalidPasswordException',
};
ErrorsMapped.RecordNotExist = {
  message: 'RecordNotExistException',
  code: 7,
  status: 404,
  errorKey: 'RecordNotExistException',
};
ErrorsMapped.TokenExpired = {
  message: 'TokenExpiredException',
  code: 8,
  status: 401,
  errorKey: 'TokenExpiredException',
};
ErrorsMapped.AccessDenied = {
  message: 'AccessDeniedException',
  code: 9,
  status: 403,
  errorKey: 'AccessDeniedException',
};
ErrorsMapped.NoPermissionToDelete = {
  message: 'NoPermissionToDeleteException',
  code: 10,
  status: 403,
  errorKey: 'NoPermissionToDeleteException',
};
ErrorsMapped.NoPermissionToUpdate = {
  message: 'NoPermissionToUpdateException',
  code: 11,
  status: 403,
  errorKey: 'NoPermissionToUpdateException',
};
ErrorsMapped.RecordAlreadyExists = {
  message: 'RecordAlreadyExistsException',
  code: 12,
  status: 409,
  errorKey: 'RecordAlreadyExistsException',
};
ErrorsMapped.UserNotFound = {
  message: 'UserNotFoundException',
  code: 13,
  status: 404,
  errorKey: 'UserNotFoundException',
};
ErrorsMapped.BadRequest = {
  message: 'BadRequestException',
  code: 14,
  status: 400,
  errorKey: 'BadRequestException',
};
ErrorsMapped.OrganizationAlreadyExists = {
  message: 'Empresa já cadastrada',
  code: 15,
  status: 409,
  errorKey: 'OrganizationAlreadyExistsException',
};

exports.ErrorsMapped = ErrorsMapped;
