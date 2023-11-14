import axios from 'axios';
import { JobRole } from "../model/jobRole";
axios.defaults.baseURL = process.env.API_URL;

export class JobService {
  URL = '/api/job-roles/';

  async getJobRoles(): Promise<JobRole[]> {
    try {
      const response = await axios.get(this.URL);
      return response.data;
    } catch (e) {
      console.error('Error:', e);
      throw new Error('Something went wrong while fetching job roles. Please try again later.');
    }
  }
}

export { JobRole }; // Export the job role interface
