import axios from "axios";
import * as cheerio from "cheerio";
import { SEARCH_RANKING_URL1, SEARCH_RANKING_URL2 } from "../constants";
import { CharacterInfo } from "../types/CharacterInfo";
import cache from "../core/cache/cache";
const createUrl = (nickname: string, isReboot = false) =>
    (isReboot ? SEARCH_RANKING_URL2 : SEARCH_RANKING_URL1) + nickname;
export const fetchCharacterInfo = async (
    nickname: string,
    renew: boolean
): Promise<CharacterInfo | undefined> => {
    if (!renew && cache.get(nickname)) return cache.get(nickname);
    let characterInfo: CharacterInfo;

    try {
        characterInfo = extractCharacterInfoFromHTML(
            nickname,
            (await axios.get(createUrl(nickname))).data
        );
    } catch (err) {
        characterInfo = extractCharacterInfoFromHTML(
            nickname,
            (await axios.get(createUrl(nickname, true))).data
        );
    }
    cache.set(nickname, characterInfo);
    return characterInfo;
};

const extractCharacterInfoFromHTML = (nickname: string, html: string) => {
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
    return { nickname, job, image, level };
};
