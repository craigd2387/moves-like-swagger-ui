const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const chai = require("chai");
const expect = chai.expect;
const dotenv = require("dotenv");
const AuthService = require("../../../service/authService");

dotenv.config();


const FAKE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDAwNDY2MTYsImlhdCI6MTY5OTk2MDIxNiwiaXNzIjoib3JnLmthaW5vcy5lYSIsInN1YiI6InRlc3RAa2Fpbm9zLmNvbSJ9.t3OBTTyG3grL9Im9A2DE9ATED47qgD7Y3S_Lw_91MYU"

const LOGIN_CREDENTIALS = {
    username: "test@kainos.com",
    password: "thisisatestpassword"
}

describe("Auth service unit tests",function() {
    
    describe("Get Token",() => {
        it("should return a valid token when correct credentials are passed", async() => {
            var mock = new MockAdapter(axios);
            const URL = process.env.API_URL + "/login"
            mock.onGet(URL).reply(200, FAKE_JWT);
    
            const token = await authService.login(LOGIN_CREDENTIALS);
    
            expect(token).to.deep.equal(FAKE_JWT)
        })
    })
})
