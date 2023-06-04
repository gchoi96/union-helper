import { JobInfo } from "@core/types/JobInfo";

export interface CharacterInfo {
    nickName: string;
    job: JobInfo | undefined;
    level: number;
    image: string;
}
