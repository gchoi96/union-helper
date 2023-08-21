import express from "express";
import { DEFAULT_PORT } from "./constants";
import characterRouter from "./router/character.router";

const app = express();
const port = process.env.PORT || DEFAULT_PORT;


app.all("/*", function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use("/character", characterRouter);

app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}`);
});
