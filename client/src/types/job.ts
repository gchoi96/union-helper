import { JOB_GROUP, JOB_NAME } from "#enums/job";

export default interface Job {
  name: JOB_NAME;
  group: JOB_GROUP
}