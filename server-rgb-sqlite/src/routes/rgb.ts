import { Router, Request, Response } from "express";
import controller from "../controllers/RGBController";

const routes = Router();

// http://localhost:3011/get?id=5
routes.get("/get", controller.get);

// http://localhost:3011/save
routes.post("/save", controller.save);

routes.delete("/delete/:id", controller.delete);

// Captura qualquer método HTTP ou URL que não foi atendido anteriormente
routes.use("*", function(_: Request, res: Response){
  res.json({ error: "Requisição desconhecida" });
});

export default routes;
