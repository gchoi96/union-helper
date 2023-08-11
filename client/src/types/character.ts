import Job from "#types/job";

export interface Character {
    nickname: string;
    job: Job | undefined;
    level: number;
    image: string;
    isUsed: boolean;
    isMobile: boolean;
}
