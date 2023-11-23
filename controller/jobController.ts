import { Application, Request, Response } from 'express';
import JobRole from '../model/jobRole';
import { getJobRoles } from '../service/JobService';
import { createJobRole } from '../service/JobService';
import CreateJobRole from '../model/createJobRole';

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
    }
  });

  app.post('/create-job', async (req: Request, res: Response)=>{
    let data: CreateJobRole=req.body
    let id: Number
  
    try{
        //jobService call to API returns id number of job created
        id = await createJobRole(data)
        res.redirect('/job-specification/'+id)
    }catch(e){
        console.error(e);
  
        res.locals.errormessage= e.message
  
        res.render('create-job', req.body)
  
    }
  })
}


