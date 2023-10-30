import express, { Request, Response } from "express";
import cors from "cors";

import { AddressInfo } from "net";
import connection from "./connection";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    const atores = await connection.raw(`SELECT * FROM ator`);
    res.send(atores[0]);
  } catch (e: any) {
    res.send(e.sqlMessage || e.message)
  }
});

app.put("/actor/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { nome, salario } = req.body;
    await connection("ator").update({
      nome,
      salario
    }).where({ id })
    res.send("Ator atualizado com sucesso")
  } catch (e) {
    res.send(e.sqlMessage || e.message)
  }
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
