import { Application, Request, Response } from 'express';
import JobRole from '../model/jobRole';
import getJobRoles from '../service/JobService';

export default function (app: Application) {
  app.get('/jobs', async (req: Request, res: Response) => {
    try {
      // Call the getJobRoles function directly
      const jobRoles: JobRole[] = await getJobRoles();

      // Render the response with jobRoles
      res.render('list-job-roles', { jobRoles });
    } catch (e) {
      res.locals.errormessage = 'An error occured fetching the data!';
      res.render('list-job-roles', { jobRoles: [] });
      return;
    }
  });
}
