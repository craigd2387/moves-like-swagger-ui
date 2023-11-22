import * as dotenv from 'dotenv';
import JobRole from '../model/jobRole';
// import jobSpecificationResponse model
import JobSpecificationResponse from '../model/jobSpecificationResponse';
// import axios
const axios = require('axios');

dotenv.config();
const { API_URL } = process.env;

// Function to get all job roles from the server
export async function getJobRoles(): Promise<JobRole[]> {
  try {
    const response = await axios.get(`${API_URL}/api/job-roles`);

    return response.data;
  } catch (e) {
    console.error('Error:', e.message);
    throw new Error('Something went wrong while fetching job roles. Please try again later.');
  }
}

// getJobSpec method
export async function getJobSpec(id: number): Promise<JobSpecificationResponse> {
  try {
    // axios call to api
    const response = await axios.get(`${API_URL}/api/job-specification/${id}`);
    if (response.data == null) {
      throw new Error();
    }
    // return response
    return response.data;
  } catch (e) {
    if (!e.response) {
      // if no response i.e. API is down
      throw new Error('Something went wrong');
    } else if (e.response.status === 500) {
      // if status 500 returned from API
      throw new Error('Failed to get job');
    } else {
      // if empty data error thrown in try block
      throw new Error('Job does not exist');
    }
  }
}

// Delete a job with a specified ID
export async function deleteJob(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/api/job-roles/${id}`);
  } catch (e) {
    if (!e.response || e.response.status === 500) {
      throw new Error('Something went wrong: failed to delete job');
    }

    if (e.response.status === 404) {
      throw new Error('The job you are trying to delete does not exist');
    }
  }
}
