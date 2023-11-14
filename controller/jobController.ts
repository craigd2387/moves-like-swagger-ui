import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobRole";
import { JobService } from "../service/JobService";

module.exports = function (app: Application) {
  app.get('/jobs', async (req: Request, res: Response) => {
    try {
      const jobServiceInstance = new JobService();
      const jobRoles: JobRole[] = await jobServiceInstance.getJobRoles();

      // Return a success response with the job roles
      res.status(200).render('list-job-roles', { jobRoles });
    } catch (error) {
      console.error(error);

      // Handle different types of errors
      if (error.response && error.response.status === 500) {
        // Axios error with status code 500
        res.status(500).send('Internal Server Error');
      } else {
        // Other errors
        res.status(500).render('error', { error: error.message });
      }
    }
  });
};
