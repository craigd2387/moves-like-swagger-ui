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
      jobSpec = await getJobSpec(parseInt(req.params.id, 10));
      // show returned data
      res.send(jobSpec);
    } catch (e) {
      console.error(e);
    }
  });
}
