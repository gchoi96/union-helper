import axios from "axios";
import * as cheerio from "cheerio";
import { SEARCH_RANKING_URL1, SEARCH_RANKING_URL2 } from "../constants";
import { CharacterInfo } from "../types/CharacterInfo";
import cache from "../core/cache/cache";
const createUrl = (nickName: string, isReboot = false) =>
    (isReboot ? SEARCH_RANKING_URL2 : SEARCH_RANKING_URL1) + nickName;
export const fetchCharacterInfo = async (
    nickName: string,
    renew: boolean
): Promise<CharacterInfo | undefined> => {
    if (!renew && cache.get(nickName)) return cache.get(nickName);
    let characterInfo: CharacterInfo;

    try {
        characterInfo = extractCharacterInfoFromHTML(
            nickName,
            (await axios.get(createUrl(nickName))).data
        );
    } catch (err) {
        characterInfo = extractCharacterInfoFromHTML(
            nickName,
            (await axios.get(createUrl(nickName, true))).data
        );
    }
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
