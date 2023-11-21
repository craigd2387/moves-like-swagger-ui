import axios from 'axios';
import * as dotenv from 'dotenv';
import Login from '../model/login';

dotenv.config();

const { API_URL } = process.env;

// login function. pass in credentials, if valid returns token string
export default async function login(credential:Login): Promise<string | null> {
  try {
    const response = await axios.post(`${API_URL}/api/login`, credential);
    // return token
    return response.data;
  } catch (e) {
    if (!e.response) {
      throw new Error('Could not login');
    }

    if (e.response.status === 404 || e.response.status === 401) {
      return null;
    }

    throw new Error('Could not login');
  }
}
