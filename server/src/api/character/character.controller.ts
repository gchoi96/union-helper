import express, { Router } from "express";
import CharacterService from "./character.service";
import GetCharacterInputs from "../../types/GetCharacterInputs";
export default class CharacterController {
    router: Router;
    service = new CharacterService();

    constructor() {
        this.router = express.Router();
    }

    getRouter() {
        return this.router;
    }
    sendSuccessResponse(res: any, data: any) {
        res.status(200).json(data);
    }

    async findOne(req: express.Request, res: express.Response) {
        console.log(req.query);
        const { nickName, renew } = req.query as unknown as GetCharacterInputs;
        const character = await (renew === "1"
            ? this.service.renew(nickName)
            : this.service.findOne(nickName));
        if (!character) throw new Error("캐릭터 정보를 찾을 수 없습니다.");
        this.sendSuccessResponse(res, character);
    }
}
