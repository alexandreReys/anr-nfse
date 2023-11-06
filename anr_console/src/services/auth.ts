// import axios from 'axios';
import { api } from '../services/api';
import { showSnackbarError } from '@/components/snackbar';

const delay = (amount = 750) => new Promise( resolve => setTimeout(resolve, amount));

type SignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest(data: SignInRequestData) {
  try {
    let user = {};
    let token = null;

    const loginResponse = await api.post('/auth/v1/login', data);
    if (!!loginResponse) {
      user = loginResponse.data.user;
      token = loginResponse.data.token;
    }

    let response = { user, token }
    const organizationData = await getOrganizationData(token, user.organizationId);
    if (!!organizationData) {
      response.organization = organizationData;
    } else {
      showSnackbarError('Login error. Failed to acquire organization Informations !');
      return null;
    };

    return response;
  } catch (error) {
    showSnackbarError('Credenciais invalidas !!');
    return null;
  }
}

export async function recoverUserInformation(token: string) {
  await delay()

  const config = { headers: { 'Authorization': token } };
  const userResponse = await api.get(`/api/v1/users/me`, config);
  if (!!userResponse) {
    console.log('recoverUserInformation.userResponse.data', userResponse.data);
  };
  
  const organizationId = userResponse.data.user.organizationId;
  
  const organizationData = await getOrganizationData(token, organizationId);
  if (!!organizationData) {
    console.log('recoverUserInformation.organizationData', organizationData);
  };
  
  const userData = {
    ...userResponse.data.user,
    organizationName: organizationData.name,
  }

  const response = {
    user: userData,
    organization: organizationData,
    token
  }
  
  return response;
}

async function getOrganizationData(token: string, organizationId: string) {
  const config = { headers: { 'Authorization': token } };
  const organization = await api.get(`/api/v1/organizations/${organizationId}`, config);
  if (!!organization) {
    return organization.data.organization;
  };

  return null;
}