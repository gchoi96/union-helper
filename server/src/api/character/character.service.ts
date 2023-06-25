import { fetchCharacterInfo } from "../../crawler/fetchCharacterInfo"

export default class CharacterService {

  async findOne(nickname: string) {
    console.log(nickname)
    return await fetchCharacterInfo(nickname, false);
  }

  async renew(nickname: string) {
    return await fetchCharacterInfo(nickname, true);
  }
}
