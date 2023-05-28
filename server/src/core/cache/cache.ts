import { LRUCache } from "lru-cache";
import { CharacterInfo } from "../../types/CharacterInfo";
const options = {
    max: 2000,
    maxAge: 1000 * 60 * 60 * 24,
    length: 1,
};

const cache = new LRUCache<string, CharacterInfo>(options);

export default cache;
