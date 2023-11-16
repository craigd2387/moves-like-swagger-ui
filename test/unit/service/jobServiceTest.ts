import JobSpecificationResponse from '../../../model/jobSpecificationResponse';
import getJobSpec from '../../../service/jobService';
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const chai = require('chai');


const expect = chai.expect;

describe('jobService', function () {
  // test getEmployees method
  describe('getJobSpec', function () {
    // return JobSpecResponse object from API
    it('should return a job specification object from response', async () => {
      // mock axios
      const mock = new MockAdapter(axios);
      const id: number = 1; 
      const data = JobSpecificationResponse;

      // when api called, retrurn status code 200 and job spec response object
      mock.onGet(`http://localhost:8080/api/job-specification/${id}`).reply(200, data);

      // call to get job spec in job service class
      const results = await getJobSpec(id);

      expect(results).to.equal(JobSpecificationResponse);
    });

    // throw exception when no response returned from API (API goes down)
    it('should throw exception when no response from api', async () => {
      let error;
      // mock axios
      const mock = new MockAdapter(axios);
      const id: number = 1;

      // return no response from API
      mock.onGet(`http://localhost:8080/api/job-specification/${id}`).networkError();

      try {
        // call getJobSpec method
        await getJobSpec(id);
      } catch (e) {
        // catch error message thrown when error caught my job service
        error = e.message;
      }
      expect(error).to.equal('Something went wrong');
    });

    // throw exception when 500 error returned from API
    it('should throw exception when 500 error returned from axios', async () => {
      let error;
      // mock axios
      const mock = new MockAdapter(axios);
      const id: number = 1;

      // return status code 500 when call made to API
      mock.onGet(`http://localhost:8080/api/job-specification/${id}`).reply(500);

      try {
        // call getJobSpec method
        await getJobSpec(id);
      } catch (e) {
        // catch error message thrown when error caught my job service
        error = e.message;
      }
      expect(error).to.equal('Failed to get job');
    });

    // throw exception when no data returned from API
    it('should throw exception when empty data returned from axios', async () => {
      let error;
      // mock axios
      const mock = new MockAdapter(axios);
      const id: number = 1;
      // return no data when call made to API
      mock.onGet(`http://localhost:8080/api/job-specification/${id}`).reply();

      try {
        // call getJobSpec method
        await getJobSpec(id);
      } catch (e) {
        // catch error message thrown when error caught
        error = e.message;
      }
      expect(error).to.equal('Job does not exist');
    });
  }); // end of describe getJobSpec
}); // end of describe jobService
