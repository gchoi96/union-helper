import { fetchCharacterInfo } from "../../crawler/fetchCharacterInfo"

export default class CharacterService {

  async findOne(nickName: string) {
    return await fetchCharacterInfo(nickName, false);
  }

  async renew(nickName: string) {
    return await fetchCharacterInfo(nickName, true);
  }
}
