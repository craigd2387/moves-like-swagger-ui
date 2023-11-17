import BandLevel from './bandLevel';

export default interface JobRole {
  jobId: number,
  jobName: string,
  bandLevel: BandLevel
  jobCapabilityName: string
}
