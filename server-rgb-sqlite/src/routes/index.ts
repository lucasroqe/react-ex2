import { Request, Response, Router } from 'express';

import rgb from "./rgb";

const routes = Router();

routes.use("/", rgb);

// Captura qualquer método HTTP ou URL que não foi atendido anteriormente
routes.use("*", function(_: Request, res: Response){
  res.json({ error: "Requisição desconhecidak" });
});

export default routes;
