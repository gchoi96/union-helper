import { CharacterInfo } from "@/core/types/CharacterInfo";
import { FetchCharacterInfoResponse } from "@/core/types/Response";
import { convertResponseToCharacterInfo } from "@/core/utils";
import axios, { AxiosResponse } from "axios";
const createUrl = (nickname: string) =>
    `http://localhost:4000/character/?nickname=${nickname}`;

// 캐릭터마다 조회 시간 차이가 많이나는데,,, 한번에 가져오는 API를 만들어야할까?
export const fetchCharacterInfos = (nicknames: string[]): Promise<CharacterInfo[]> => {
    return Promise.all(
        nicknames.map((nickname) =>
            axios.get<any, AxiosResponse<FetchCharacterInfoResponse>>(createUrl(nickname))
        )
    ).then((characters) =>
        characters.map((character) => convertResponseToCharacterInfo(character.data))
    );
};

export const fetchCharacterInfo = async (nickname: string): Promise<CharacterInfo> => {
    const { data: characterInfo } = await axios.get(createUrl(nickname));
    return convertResponseToCharacterInfo(characterInfo);
};
