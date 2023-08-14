import { JOB_GROUP, JOB_NAME } from "#enums/job";
import { Ability } from "#types/ability";

export default interface Job {
  name: JOB_NAME;
  group: JOB_GROUP
  ability: Ability
}