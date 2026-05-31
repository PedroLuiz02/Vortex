from .db import db
from flask_login import UserMixin

class Usuario(UserMixin, db.Model):
    __tablename__= 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    senha = db.Column(db.String, nullable=False)

    carrinhos = db.relationship("Carrinho", backref="usuario", lazy=True)

class Produtos(db.Model):
    __tablename__ = "produtos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String, nullable=False)
    descricao = db.Column(db.String, nullable=False)
    ingredientes = db.Column(db.String, nullable=False)
    beneficios = db.Column(db.String, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    estoque = db.Column(db.Integer, nullable=False)

    itens_carrinho = db.relationship("ItemCarrinho", backref="produto", lazy=True)

class Carrinho(db.Model):
    __tablename__ = "carrinhos"

    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)

    itens = db.relationship("ItemCarrinho", backref="carrinho", lazy=True)

class ItemCarrinho(db.Model):
    __tablename__ = "itens_carrinho"

    id = db.Column(db.Integer, primary_key=True)
    carrinho_id = db.Column(db.Integer, db.ForeignKey("carrinhos.id"), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey("produtos.id"), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False, default=1)

class Frete(db.Model):
    __tablename__ = "frete"

    id = db.Column(db.Integer, primary_key=True)
    preco = preco = db.Column(db.Float, nullable=False)


def buscar_produtos_carrinho(carrinho_id):

    itens = ItemCarrinho.query.filter_by(carrinho_id=carrinho_id).all()

    for item in itens:
        print(item.produto.nome)
        print(item.produto.preco)
        print(item.quantidade)