import { JobInfo } from "@core/types/JobInfo";

export interface CharacterInfo {
    nickname: string;
    job: JobInfo | undefined;
    level: number;
    image: string;
}
