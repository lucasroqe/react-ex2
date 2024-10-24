import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_NAME || "bd.sqlite";

export function initDB() {
  // Abre ou cria o banco de dados
  return new sqlite3.Database(db_name);
}

// Função para criar a tabela RGB
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS tbrgb (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      r INTEGER,
      g INTEGER,
      b INTEGER
    )
  `;  

  const db = initDB();
  db.run(query, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela", err.message);
    } else {
      console.log('Tabela "tbrgb" criada ou já existe');
    }
  });
}