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
    const response = await api.post('/auth/v1/login', data);
    return response.data;
  } catch (error) {
    showSnackbarError('Credenciais invalidas !!');
    return null;
  }
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      email: 'anr.alexandre@gmail.com',
      firstName: 'Alexandre',
      lastName: 'Reys',
      profileImgUrl: 'https://github.com/alexandreReys.png',
      role: '',
      password: '',
    }
  }
}
