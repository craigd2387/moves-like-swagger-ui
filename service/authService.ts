import axios from 'axios';
import Login from '../model/login';
import * as dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.API_URL

export async function login(login:Login): Promise<string> {
    try {
        const response = await axios.post(API_URL + "/api/login",login);

        return response.data;
    } catch(e) {
        if(!e.response){
            throw new Error("Could not login");
        }

        if(e.response.status == 404 || e.response.status == 401){çç
            return null;
        }

        throw new Error("Could not login");
    }
}
