from flask import Flask
import os
from .models import connect

app = Flask(__name__)

os.makedirs("instance", exist_ok=True)

# criar as tabelas quando iniciar
conn = connect()
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,           
    email TEXT NOT NULL UNIQUE,           
    senha TEXT NOT NULL          
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS produtos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    ingredientes TEXT NOT NULL,
    preco REAL NOT NULL,
    estoque INTEGER NOT NULL
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS carrinhos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS itens_carrinho(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carrinho_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,

    FOREIGN KEY(carrinho_id) REFERENCES carrinhos(id),
    FOREIGN KEY(produto_id) REFERENCES produtos(id)
);
""")

conn.commit()
conn.close()

print("Tabelas verificadas/criadas com sucesso!")

from . import routes