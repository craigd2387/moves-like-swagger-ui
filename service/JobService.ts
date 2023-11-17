import axios from 'axios';
import * as dotenv from 'dotenv';
import JobRole from '../model/jobRole';

dotenv.config();

const { API_URL } = process.env;

// Function to get all job roles from the server
export default async function getJobRoles(): Promise<JobRole[]> {
  try {
    const response = await axios.get(`${API_URL}/api/job-roles`);
    return response.data;
  } catch (e) {
    console.error('Error:', e);
    throw new Error('Something went wrong while fetching job roles. Please try again later.');
  }
}
