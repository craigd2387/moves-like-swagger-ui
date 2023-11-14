const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');

const { expect } = chai;
const dotenv = require('dotenv');
const AuthService = require('../../../service/authService');
const { assert } = require('console');
const { EmbeddedJWK } = require('jose');

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

      const token = await AuthService.login(LOGIN_CREDENTIALS);

      expect(token).to.deep.equal(FAKE_JWT);
    });
  });

  describe('Get Token', () => {
    it('should return 401 when invalid credentials are passed', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/login`;
      mock.onGet(URL).reply(401);

      const token = await AuthService.login(LOGIN_CREDENTIALS);
      expect(token).to.deep.equal(null);
    });
  });

  describe('Get Token', () => {
    it('should throw exception when 500 error returned by server', async () => {
      const mock = new MockAdapter(axios);
      const URL = `${process.env.API_URL}/login`;
      mock.onGet(URL).reply(500);

      expect(AuthService.login(LOGIN_CREDENTIALS)).to.throw('Could not login');
    });
  });
});
