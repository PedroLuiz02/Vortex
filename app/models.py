import sqlite3

def connect():
    conn = sqlite3.connect("instance/database.db")
    conn.execute("PRAGMA foreign_keys = ON")
    conn.row_factory = sqlite3.Row
    return conn

def buscar_produtos_carrinho():
    conn = connect()
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT produtos.nome, produtos.preco, itens_carrinho.quantidade
    FROM itens_carrinho
    JOIN produtos ON produtos.id = itens_carrinho.produto_id WHERE itens_carrinho.carrinho_id = 1;
    """)

    conn.commit()
    conn.close()