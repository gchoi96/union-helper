import axios from "axios";
import * as cheerio from "cheerio";
import { SEARCH_RANKING_URL } from "../constants";
import { CharacterInfo } from "../types/CharacterInfo";
import cache from "../core/cache/cache";
const createUrl = (nickName: string) => SEARCH_RANKING_URL + nickName;
export const fetchCharacterInfo = async (
    nickName: string,
    renew: boolean
): Promise<CharacterInfo> => {
    if (!renew && cache.has(nickName)) {
        const cachedData = cache.get(nickName);
        if (cachedData) return cachedData;
    }
    const response = await axios.get(createUrl(nickName));
    const characterInfo: CharacterInfo = extractCharacterInfoFromHTML(
        nickName,
        response.data
    );
    cache.set(nickName, characterInfo);
    return characterInfo;
};

const extractCharacterInfoFromHTML = (nickName: string, html: string) => {
    const $ = cheerio.load(html, { decodeEntities: true });
    const $tdList = $(".search_com_chk");
    const detail = $tdList.children(".left");
    const job = detail
        .children("dl")
        .children("dd")
        .text()
        .replaceAll(" ", "")
        .split("/")[1];
    const image = detail.children(".char_img").children("img")[0].attribs.src;
    const level = Number(
        $tdList.children("td").first().next().next().text().split(".")[1]
    );
    return { nickName, job, image, level };
};
