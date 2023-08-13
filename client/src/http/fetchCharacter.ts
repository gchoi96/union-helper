import { JOB_MAP } from "#constants/maps";
import { Character } from "#types/character";
import axios, { AxiosResponse } from "axios";
const createUrl = (nickname: string) => `http://localhost:4000/character/?nickname=${nickname}`;

export interface FetchResult {
    success: Character[];
    fail: Character[];
}

interface Response {
    nickname: string;
    level: string;
    image: string;
    job: string;
}

// nickname: string;
// job: Job | undefined;
// level: number;
// image: string;
// isUsed: boolean;
// isMobile: boolean;

const convertResponseToCharacter = (character: Response) => ({
    nickname: character.nickname,
    job: JOB_MAP[character.job],
    level: Number(character.level),
    image: character.image,
    isUsed: false,
    isMobile: false,
});

export const fetchCharacters = async (nicknames: string[]): Promise<FetchResult> => {
    const characters = await Promise.all(
        nicknames.map((nickname) => axios.get<any, AxiosResponse<Response>>(createUrl(nickname)))
    ).then((characters) => characters.map(({ data: character }) => convertResponseToCharacter(character)));
    const result: FetchResult = {
        success: [],
        fail: [],
    };
    characters.forEach((character) => {
        if (!character.job) result.fail.push(character);
        else result.success.push(character);
    });

    return result;
};

export const fetchCharacterInfo = async (nickname: string): Promise<Character> => {
    const { data: characterInfo } = await axios.get(createUrl(nickname));
    return convertResponseToCharacter(characterInfo);
};
