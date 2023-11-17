import { Application, Request, Response } from 'express';
// import jobSpecificationResponse model
import JobRole from '../model/jobRole';
import JobSpecificationResponse from '../model/jobSpecificationResponse';
// import job service class
import { getJobSpec, getJobRoles } from '../service/jobService';

export default function (app: Application) {
  // route to view list of job roles
  app.get('/jobs', async (req: Request, res: Response) => {
    try {
      // Call the getJobRoles function directly
      const jobRoles: JobRole[] = await getJobRoles();

      // Render the response with jobRoles
      res.render('list-job-roles', { jobRoles });
    } catch (e) {
      res.locals.errormessage = 'An error occured fetching the data!';
      res.render('list-job-roles', { jobRoles: [] });
    }
  });

  // route to get job specification
  app.get('/job-specification/:id', async (req: Request, res: Response) => {
    let jobSpec: JobSpecificationResponse;
    try {
      // call to job service class
      jobSpec = await getJobSpec(Number(req.params.id));
      // show returned data in job-specification page
      res.render('job-specification', { jobSpec });
    } catch (e) {
      console.error(e);
      // render job-specification page passing in relevant error message
      res.render('job-specification', { error: e.message });
    }
  });
}
