// import jobSpecificationResponse model
import JobSpecificationResponse from '../model/jobSpecificationResponse';
// import axios
const axios = require('axios');

// getJobSpec method
export default async function getJobSpec(id: number): Promise<JobSpecificationResponse> {
  try {
    console.log(`get job spec ${id}`)
    // axios call to api
    const response = await axios.get(`http://localhost:8080/api/job-specification/${id}`);
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
