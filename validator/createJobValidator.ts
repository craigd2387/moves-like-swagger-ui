import CreateJobRole from "../model/createJobRole";

export function validateCreateJobRole(createJobRole:CreateJobRole): string{
    if(createJobRole.jobName.length < 1 || createJobRole.jobName.length > 80){
        return "Name must be between 1 and 80 characters.";
    }

    if(createJobRole.jobSpecification.length < 1){
        return "Job specification is empty";
    }

    if(createJobRole.jobSharepointLink.length < 1){
        return "Sharepoint link is empty"
    }

    return null;
}