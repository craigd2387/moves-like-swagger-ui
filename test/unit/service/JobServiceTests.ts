import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import JobRole from '../../../model/jobRole';
import getJobRoles from '../../../service/jobService';

describe('JobService', function () {
  describe('getJobRoles', function () {
    it('should return job roles from response', async () => {
      const mock = new MockAdapter(axios);

      const URL = `${process.env.API_URL}/api/job-roles`;

      const jobRole: JobRole = {
        jobId: 1,
        jobName: "Trainee Software Engineer",
        jobCapabilityName: "Engineering"
      };

      const data: JobRole[] = [jobRole];

      mock.onGet(URL).reply(200, data);

      const results = await getJobRoles();

      expect(results[0]).to.deep.equal(jobRole);
    });

    it('should throw an exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios);
      
      const URL = `${process.env.API_URL}/api/job-roles`;

      mock.onGet(URL).reply(500);

      let error: string | undefined;
      try {
        await getJobRoles();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).to.equal('Something went wrong while fetching job roles. Please try again later.');
    });
  });
});