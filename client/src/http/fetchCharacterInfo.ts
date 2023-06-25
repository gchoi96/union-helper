import { CharacterInfo } from "@/core/types/CharacterInfo";
import { FetchCharacterInfoResponse } from "@/core/types/Response";
import { convertResponseToCharacterInfo } from "@/core/utils";
import axios, { AxiosResponse } from "axios";
const createUrl = (nickName: string) => `http://localhost:4000/character/?nickName=${nickName}`;

export interface FetchCharacterInfosResult {
    successList: CharacterInfo[];
    failureList: CharacterInfo[];
}

export const fetchCharacterInfos = async (nickNames: string[]): Promise<FetchCharacterInfosResult> => {
    const characterInfos = await Promise.all(
        nickNames.map((nickName) => axios.get<any, AxiosResponse<FetchCharacterInfoResponse>>(createUrl(nickName)))
    ).then((characters) => characters.map((character) => convertResponseToCharacterInfo(character.data)));
    console.log(characterInfos)
    const result: FetchCharacterInfosResult = {
        successList: [],
        failureList: [],
    };
    characterInfos.forEach((characterInfo) => {
        if (!characterInfo.job) result.failureList.push(characterInfo);
        else result.successList.push(characterInfo);
    });

    return result;
};

export const fetchCharacterInfo = async (nickName: string): Promise<CharacterInfo> => {
    const { data: characterInfo } = await axios.get(createUrl(nickName));
    return convertResponseToCharacterInfo(characterInfo);
};
