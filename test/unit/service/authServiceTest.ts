import axios from 'axios';
const MockAdapter = require('axios-mock-adapter');
const dotenv = require('dotenv');

import login from '../../../service/authService';
import { expect } from 'chai';

// const AuthService = require("../../../service/authService")

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
      const URL = `${process.env.API_URL}/login`;
      mock.onGet(URL).reply(200, FAKE_JWT);

      const token = await login(LOGIN_CREDENTIALS);

      expect(token).to.deep.equal(FAKE_JWT);
    });
  });

  describe('Get Token', () => {
    it('should return 401 when invalid credentials are passed', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/login`;
      mock.onGet(URL).reply(401);

      const token = await login(LOGIN_CREDENTIALS);
      expect(token).to.deep.equal(null);
    });
  });

  describe('Get Token', () => {
    it('should throw exception when 500 error returned by server', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/login`;
      mock.onGet(URL).reply(500);

      expect(login(LOGIN_CREDENTIALS)).to.throw('Could not login');
    });
  });
});
