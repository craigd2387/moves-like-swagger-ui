import { JobRole } from "../model/jobRole";

const axios = require('axios'); 

module.exports.getJobRoles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-roles')
        return response.data
    } catch (e) {
        throw new Error ('Something went wrong while fetching job roles. Please try again later.')
    }
}