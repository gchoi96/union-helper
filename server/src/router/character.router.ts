import express from "express";
import UserController from "../api/character/character.controller";
const router = express.Router();
const controller = new UserController();

router.get("/", (req, res) => {
  controller.findOne(req, res)
});

export default router;
