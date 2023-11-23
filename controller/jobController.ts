import { Application, Request, Response } from 'express';
import * as jose from 'jose'; // handles jwt
import JobRole from '../model/jobRole';
import roleAccess from '../middleware/authorisedRoles';
import UserRole from '../model/userRole';
import JobSpecificationResponse from '../model/jobSpecificationResponse';
import { getJobSpec, getJobRoles, deleteJob } from '../service/jobService';

export default function (app: Application) {
  // route to view list of job roles
  app.get('/jobs', roleAccess([UserRole.Admin, UserRole.User]), async (req: Request, res: Response) => {
    try {
      // decode current jwt and store role of current user
      const JWT = jose.decodeJwt(req.session.token as string);
      const jwtRole : UserRole = UserRole[JWT.role as keyof typeof UserRole];

      // Call the getJobRoles function directly
      const jobRoles: JobRole[] = await getJobRoles();

      // Render the response with jobRoles and role of user logged in
      res.render('list-job-roles', { jobRoles, role: jwtRole });
    } catch (e) {
      req.flash('error', 'An error occurred, unable to fetch the data');
      res.render('list-job-roles', { jobRoles: [] });
    }
  });

  // route to get job specification
  app.get('/job-specification/:id', roleAccess([UserRole.Admin, UserRole.User]), async (req: Request, res: Response) => {
    let jobSpec: JobSpecificationResponse;
    try {
      // decode current jwt and store role of current user
      const JWT = jose.decodeJwt(req.session.token as string);
      const jwtRole : UserRole = UserRole[JWT.role as keyof typeof UserRole];
      // call to job service class
      jobSpec = await getJobSpec(Number(req.params.id));
      // show returned data in job-specification page and pass in current user role
      res.render('job-specification', { jobSpec, role: jwtRole });
    } catch (e) {
      console.error(e);
      // render job-specification page passing in relevant error message
      res.render('job-specification', { error: e.message });
    }
  });

  // route to delete a job
  app.post('/jobs/:id', roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await deleteJob(Number(id));
      req.flash('success', 'Job deleted successfully!'); // Need to use flash message here so it persists after the redirect (res.locals are lost on redirect)
      res.redirect('/jobs');
    } catch (e) {
      console.error(e.message);
      req.flash('error', e.message);
      res.redirect('back'); // Redirect back to the same page
    }
  });
}
