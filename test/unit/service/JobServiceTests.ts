import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { JobService, JobRole } from '../../../service/JobService';

describe('JobService', function () {
  describe('getJobRoles', function () {
    it('should return job roles from response', async () => {
      const mock = new MockAdapter(axios);

      const jobRole: JobRole = {
        jobId: 1,
        jobName: "Trainee Software Engineer"
      };

      const data: JobRole[] = [jobRole];

      const jobServiceInstance = new JobService();
      mock.onGet(jobServiceInstance.URL).reply(200, data);

      const results = await jobServiceInstance.getJobRoles();

      expect(results[0]).to.deep.equal(jobRole);
    });

    it('should throw an exception when 500 error returned from axios', async () => {
      const mock = new MockAdapter(axios);

      const jobServiceInstance = new JobService();

      mock.onGet(jobServiceInstance.URL).reply(500);

      let error: string | undefined;
      try {
        await jobServiceInstance.getJobRoles();
      } catch (e: any) {
        error = e.message;
      }

      expect(error).to.equal('Something went wrong while fetching job roles. Please try again later.');
    });
  });
});
