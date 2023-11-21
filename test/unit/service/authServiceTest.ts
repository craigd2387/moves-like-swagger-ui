import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const dotenv = require('dotenv');

import login from '../../../service/authService';
import { expect } from 'chai';

dotenv.config();

const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAwNDY2MTYsImlhdCI6MTY5OTk2MDIxNiwiaXNzIjoib3JnLmthaW5vcy5lYSIsInN1YiI6InRlc3RAa2Fpbm9zLmNvbSJ9.t3OBTTyG3grL9Im9A2DE9ATED47qgD7Y3S_Lw_91MYU';

const LOGIN_CREDENTIALS = {
  username: 'test@kainos.com',
  password: 'thisisatestpassword',
};

describe('Auth service unit tests', () => {
  describe('Get Token', () => {
    it('should return a valid token when correct credentials are passed', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/api/login`;
      // when credentials posted, respond with status 200 and fake jwt
      mock.onPost(URL).reply(200, FAKE_JWT);
      // call on login method in auth service with login credentials
      const token = await login(LOGIN_CREDENTIALS);
      // check fake jwt returned when call to service
      expect(token).to.equal(FAKE_JWT);
    });
  });

  describe('Get Token', () => {
    it('should return 401 when invalid credentials are passed', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/api/login`;
      // respond with 401 unauthorized when credentials posted
      mock.onPost(URL).reply(401);
      // call on login method in auth service with login credentials
      const token = await login(LOGIN_CREDENTIALS);
      // check null token returned
      expect(token).to.deep.equal(null);
    });
  });

  describe('Get Token', () => {
    it('should throw exception when 500 error returned by server', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/api/login`;
      // respond with 500 internal server error when credentials posted
      mock.onPost(URL).reply(500);

      let error = null
      try {
        // call on login method in auth service with login credentials
        await login(LOGIN_CREDENTIALS);
      } catch(e){
        error = e.message;
      }
      // error returned from auth service to be could not login
      expect(error).to.equal("Could not login");
    });
  });
});
