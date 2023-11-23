import axios from 'axios';
import * as dotenv from 'dotenv';
import JobRole from '../model/jobRole';
import CreateJobRole from '../model/createJobRole';
import  createJobValidator =require("../validator/createJobValidator") 

dotenv.config();

const { API_URL } = process.env;

// Function to get all job roles from the server
export async function getJobRoles(): Promise<JobRole[]> {
  try {
    const response = await axios.get(`${API_URL}/api/job-roles`);
    return response.data;
  } catch (e) {
    console.error('Error:', e);
    throw new Error('Something went wrong while fetching job roles. Please try again later.');
  }
}

export async function createJobRole(createJobRole:CreateJobRole): Promise<Number> {

  const error: string = createJobValidator.validateCreateJobRole(createJobRole)

  if(error){
      throw new Error(error)
  }
  try{
      const response= await axios.post('http://localhost:8080/api/create-job/', createJobRole)
      return response.data

  } catch (e){
      throw new Error ('Could not create job')
  }
}
