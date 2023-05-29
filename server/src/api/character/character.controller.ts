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
        const { nickName, renew } = req.query as unknown as GetCharacterInputs;
        try {
            const character = await (renew === "1"
                ? this.service.renew(nickName)
                : this.service.findOne(nickName));
            this.sendSuccessResponse(res, character);
        } catch (err) {
            res.status(200).send({nickName, level: 0, image: "", job: ""});
            console.error(err)
        }
    }
}
