import axios from 'axios';
import { showSnackbarError } from '@/components/snackbar';


const delay = (amount = 750) => new Promise( resolve => setTimeout(resolve, amount));

type SignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await axios.post('http://localhost:3000/auth/v1/login', data);
    return response.data;
  } catch (error) {
    showSnackbarError('Credenciais invalidas !!');
    return null;
  }
}

// export async function recoverUserInformation() {
//   const response = await axios.get('http://localhost:3000/api/v1/users');
//   return response.data;
// }

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Alexandre Nunes Reys',
      email: 'anr.alexandre@gmail.com',
      avatar_url: 'https://github.com/alexandreReys.png',
      password: '',
    }
  }
}


// import { v4 as uuid } from 'uuid';

// type SignInRequestData = {
//   email: string;
//   password: string;
// };

// const delay = (amount = 750) => new Promise( resolve => setTimeout(resolve, amount));

// export async function signInRequest(data: SignInRequestData) {
//   await delay()

//   return {
//     token: uuid(),
//     user: {
//       name: 'Alexandre Nunes Reys',
//       email: 'anr.alexandre@gmail.com',
//       avatar_url: 'https://github.com/alexandreReys.png',
//       password: '',
//     }
//   }
// }

// export async function recoverUserInformation() {
//   await delay()

//   return {
//     user: {
//       name: 'Alexandre Nunes Reys',
//       email: 'anr.alexandre@gmail.com',
//       avatar_url: 'https://github.com/alexandreReys.png',
//       password: '',
//     }
//   }
// }

