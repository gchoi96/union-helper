import express from "express";
import { DEFAULT_PORT } from "./constants";
import characterRouter from "./router/character.router"
const app = express();
const port = process.env.PORT || DEFAULT_PORT;

app.use("/character", characterRouter);

app.listen(port, ()=>{
  console.log(`Server ready at http://localhost:${port}`);
})