import { Request, Response } from "express";
import { initDB } from "./database";

interface Row {
  id: number;
  r: number;
  g: number;
  b: number;
}

class RGBController {
  // retorna o último registro
  private getLast = (): Promise<Row | null> => {
    const db = initDB(); 
    const query = `SELECT id, r, g, b FROM tbrgb ORDER BY id DESC LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.get(query, [], (err, row: Row | undefined) => {
        if (err) {
          console.error("Erro ao buscar o último registro", err.message);
          reject(err); // Rejeita a promise em caso de erro
        } else {
          // Retorna o registro ou null se não existir
          resolve(row || null);
        }
      });
    });
  };

  // retorna o primeiro registro
  private getFirst = (): Promise<Row | null> => {
    const db = initDB();
    const query = `SELECT id, r, g, b FROM tbrgb ORDER BY id ASC LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.get(query, [], (err, row: Row | undefined) => {
        if (err) {
          console.error("Erro ao buscar o primeiro registro", err.message);
          reject(err); // Rejeita a promise em caso de erro
        } else {
          // Retorna o registro ou null se não existir
          resolve(row || null);
        }
      });
    });
  };

  // retorna o registro que possui o id especificado
  private getById = (id:number): Promise<Row | null> => {
    const db = initDB();
    const query = `SELECT id, r, g, b FROM tbrgb WHERE id = ? ORDER BY id DESC LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row: Row | undefined) => {
        if (err) {
          console.error("Erro ao buscar o último registro", err.message);
          reject(err); // Rejeita a promise em caso de erro
        } else {
          // Retorna o registro ou null se não existir
          resolve(row || null);
        }
      });
    });
  };

  // retorna o registro especificado pelo parâmetro id ou o último registro
  public get = async (req: Request, res: Response): Promise<void> => {
    const id = req.query.id as string;
    try {
      const lastRow = await this.getLast();
      if (lastRow) {
        if( !id || parseInt(id) >= lastRow.id ){
          res.json(lastRow); // Retorna o último registro encontrado
        }
        else{
          const row = await this.getById(parseInt(id));
          if(row){
            res.json(row);
          } else {
            const row = await this.getFirst();
            if( row ){
              res.json(row);
            }
            else{
              res.json({ id: 0, r: 0, g: 0, b: 0 });
            }
          }
        }
      } else {
        res.json({ id: 0, r: 0, g: 0, b: 0 });
      }
    } catch (err: any) {
      res.json({ id: 0, r: 0, g: 0, b: 0 });
    }
  }

  public async save(req: Request, res: Response): Promise<void> {
    try {
      const { r, g, b } = req.body;
      if (
        typeof r === "number" &&
        typeof g === "number" &&
        typeof b === "number"
      ) {
        const query = `INSERT INTO tbrgb (r, g, b) VALUES (?, ?, ?)`;
        const db = initDB();
        db.run(query, [r, g, b], function (err) {
          if (err) {
            res.json({ error: err.message });
          } else {
            res.json({ id: this.lastID, r, g, b });
          }
        });
      } else {
        res.json({ error: "Os valores de r, g e b devem ser números" });
      }
    } catch (e: any) {
      res.json({ error: e.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id; 
  
    const db = initDB();
    
    if (id === "*") {
      const query = `DELETE FROM tbrgb`;
  
      db.run(query, function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "Todos os registros foram deletados com sucesso", deletedRows: this.changes });
        }
      });
  
    } else {
      const parsedId = parseInt(id); 
  
      const query = `DELETE FROM tbrgb WHERE id = ?`;
  
      db.run(query, [parsedId], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
          res.status(404).json({ error: "Registro não encontrado" });
        } else {
          res.json({ message: "Registro deletado com sucesso", id: parsedId });
        }
      });
    }
  }
}

const controller = new RGBController();
export default controller;
