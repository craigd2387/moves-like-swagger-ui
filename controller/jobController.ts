import { Application, Request, Response } from 'express';
// import jobSpecificationResponse model
import JobSpecificationResponse from '../model/jobSpecificationResponse';
// import job service class
import getJobSpec from '../service/jobService';

export default function (app: Application) {
  // route to get job specification
  app.get('/job-specification/:id', async (req: Request, res: Response) => {
    let jobSpec: JobSpecificationResponse;
    try {
      // call to job service class
      jobSpec = await getJobSpec(Number(req.params.id));
      // show returned data in job-specification page
      res.render('job-specification', { jobSpec });
      console.log(jobSpec);
    } catch (e) {
      console.error(e);
      // render job-specification page passing in relevant error message
      res.send('error');
      console.log(jobSpec);
    }
  });
}
