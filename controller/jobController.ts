import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobRole";

const jobService = require ('../service/jobService')

module.exports = function(app: Application){

    app.get('/jobs', async (req: Request, res: Response) => {
        let data: JobRole[];

        try {
            data = await jobService.getJobRoles()
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message
        }

        res.render('list-job-roles', { jobRoles: data });
        
    })
    
}