from . import app
from flask import render_template, jsonify, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from .models import Usuario, Produtos, Frete
from .db import db
import re

lm = LoginManager(app)
lm.login_view = 'login'
lm.login_message = 'Você precisa fazer login para acessar esta página.'
lm.login_message_category = 'warning'

@lm.user_loader
def user_loader(id):
    usuario = db.session.query(Usuario).filter_by(id=id).first()
    return usuario

@app.route("/")
def index():

    produtos_db = Produtos.query.all()

    produtos = []

    for produto in produtos_db:
        produtos.append({
            "id": produto.id,
            "nome": produto.nome,
            "ingredientes": produto.ingredientes,
            "beneficios": produto.beneficios,
            "preco": produto.preco
        })

    return render_template("index.html", produtos=produtos)

@app.route("/login", methods = ['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    
    elif request.method == 'POST':
        email = request.form['emailForm']
        senha = request.form['senhaForm']

        user = db.session.query(Usuario).filter_by(email=email).first()
        if not user:
            flash('Usuário não encontrado', 'error')
            return redirect(url_for('login'))
        
        if not check_password_hash(user.senha, senha):
            flash('Senha incorreta', 'error')
            return redirect(url_for('login'))
        
        login_user(user)

        flash('Logado com sucesso', 'success')

        return redirect(url_for('index'))

@app.route("/cadastro", methods = ['GET', 'POST'])
def cadastro():
    if request.method == 'GET':
        return render_template("cadastro.html")
    elif request.method == 'POST':
        nome = request.form['nomeForm']
        email = request.form['emailForm']
        senha = request.form['senhaForm']
        confirmar_senha = request.form['confirmSenhaForm']

        if senha != confirmar_senha:
            return flash('As senhas não coincidem!', 'error')

        senha_hash = generate_password_hash(senha)

        novo_usuario = Usuario(nome=nome, email=email, senha=senha_hash)
        db.session.add(novo_usuario)
        db.session.commit()

        login_user(novo_usuario)

        flash('Conta criada com sucesso!', 'success')

        return redirect(url_for('index'))
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Deslogado com sucesso', 'error')
    return redirect(url_for('index'))

@app.route("/produtos", methods = ['GET'])
def produtos():
    produtos = Produtos.query.all()
    return render_template("produtos.html", produtos=produtos)

@app.route("/produto/<int:id>", methods = ['GET'])
def produto(id):
    
    produto = Produtos.query.get_or_404(id)
    return render_template("produto.html", produto=produto)

@app.route('/adicionar_carrinho/<int:id>', methods=['POST'])
def adicionar_carrinho(id):

    produto = Produtos.query.get_or_404(id)

    quantidade = int(request.form.get('quantidade', 1))

    if 'carrinho' not in session:
        session['carrinho'] = []

    carrinho = session['carrinho']

    produto_existe = False

    for item in carrinho:
        if item['id'] == produto.id:
            item['quantidade'] += quantidade
            produto_existe = True
            break

    if not produto_existe:
        item = {
            'id': produto.id,
            'nome': produto.nome,
            'preco': float(produto.preco),
            'imagem': f'/static/img/lata{produto.id}.png',
            'quantidade': quantidade,
            'selecionado': True
        }
        carrinho.append(item)

    session['carrinho'] = carrinho

    flash('Produto adicionado ao carrinho!', 'success')
    return redirect(url_for('produto', id=produto.id))

@app.route('/adicionar_carrinho_erro/<int:id>', methods=['POST'])
def adicionar_carrinho_erro(id):

    produto = Produtos.query.get_or_404(id)

    flash('Faça login para comprar!', 'error')
    return redirect(url_for('produto', id=produto.id))

def calcular_total(carrinho):

    subtotal = sum(
        item["preco"] * item["quantidade"]
        for item in carrinho
    )

    envio = 10

    total = subtotal + envio

    return subtotal, envio, total

@app.route("/aumentar/<int:index>", methods=["POST"])
def aumentar(index):

    carrinho = session.get("carrinho", [])

    carrinho[index]["quantidade"] += 1

    session["carrinho"] = carrinho

    subtotal = sum(
        item["preco"] * item["quantidade"]
        for item in carrinho
    )

    quantidade_itens = sum(
        item["quantidade"]
        for item in carrinho
    )

    frete = Frete.query.first()

    total = subtotal + frete.preco

    return jsonify({
        "quantidade": carrinho[index]["quantidade"],
        "subtotal": round(subtotal, 2),
        "total": round(total, 2),
        "quantidade_itens": quantidade_itens,
        "envio": frete.preco
    })

@app.route("/diminuir/<int:index>", methods=["POST"])
def diminuir(index):

    carrinho = session.get("carrinho", [])

    if carrinho[index]["quantidade"] > 1:
        carrinho[index]["quantidade"] -= 1

    session["carrinho"] = carrinho

    subtotal = sum(
        item["preco"] * item["quantidade"]
        for item in carrinho
    )

    quantidade_itens = sum(
    item["quantidade"]
    for item in carrinho
    )

    frete = Frete.query.first()

    total = subtotal + frete.preco

    return jsonify({
        "quantidade": carrinho[index]["quantidade"],
        "subtotal": round(subtotal, 2),
        "total": round(total, 2),
        "quantidade_itens": quantidade_itens,
        "envio": frete.preco
    })

@app.route('/selecionar/<int:index>', methods=['POST'])
def selecionar(index):

    carrinho = session.get('carrinho', [])

    carrinho[index]['selecionado'] = not carrinho[index].get('selecionado', True)

    session['carrinho'] = carrinho

    session.modified = True

    return redirect(url_for('carrinho'))

@app.route('/remover_carrinho/<int:index>')
def remover_carrinho(index):

    carrinho = session.get('carrinho', [])

    if index < len(carrinho):
        carrinho.pop(index)

    session['carrinho'] = carrinho

    return redirect(url_for('carrinho'))

@app.route("/carrinho")
def carrinho():

    carrinho = session.get('carrinho', [])

    subtotal = 0

    quantidade_itens = 0

    frete = Frete.query.first()

    for item in carrinho:

        if item.get('selecionado', True):

            subtotal += item['preco'] * item['quantidade']
            quantidade_itens += item['quantidade']

    envio = frete.preco
    total = subtotal + envio

    return render_template(
        "carrinho.html",
        carrinho=carrinho,
        subtotal=round(subtotal, 2),
        envio=round(envio, 2),
        total=round(total, 2),
        quantidade_itens=quantidade_itens,
        frete=frete
    )

@app.route('/limpar_carrinho')
def limpar():

    session.pop('carrinho', None)

    return 'Carrinho limpo'

@app.route("/endereco", methods=['GET', 'POST'])
@login_required
def endereco():

    carrinho = session.get('carrinho', [])

    subtotal = 0
    quantidade_itens = 0

    for item in carrinho:

        if item.get('selecionado', True):

            subtotal += item['preco'] * item['quantidade']

            quantidade_itens += item['quantidade']

    envio = 10

    total = subtotal + envio

    if request.method == 'POST':

        regex = {

            'nome': r'^[A-Za-zÀ-ÿ\s]{3,100}$',

            'telefone': r'^\(\d{2}\)\s\d{4,5}-\d{4}$',

            'cep': r'^\d{5}-\d{3}$',

            'estado': r'^[A-Za-zÀ-ÿ\s]{2,30}$',

            'cidade': r'^[A-Za-zÀ-ÿ\s]{2,50}$',

            'bairro': r'^[A-Za-zÀ-ÿ0-9\s]{2,50}$',

            'rua': r'^[A-Za-zÀ-ÿ0-9\s,.-]{5,100}$',

            'numero': r'^[0-9]{1,6}$',

            'complemento': r'^[A-Za-zÀ-ÿ0-9\s,.-]{0,100}$'
        }

        for campo, pattern in regex.items():

            valor = request.form.get(campo, '').strip()

            if not re.match(pattern, valor):

                flash(f'Campo inválido: {campo}')

                return redirect(url_for('endereco'))

        endereco = {

            'nome': request.form.get('nome'),
            'telefone': request.form.get('telefone'),
            'cep': request.form.get('cep'),
            'estado': request.form.get('estado'),
            'cidade': request.form.get('cidade'),
            'bairro': request.form.get('bairro'),
            'rua': request.form.get('rua'),
            'numero': request.form.get('numero'),
            'complemento': request.form.get('complemento')
        }

        session['endereco'] = endereco

        flash('Endereço salvo com sucesso!', 'success')
        return redirect(url_for('pagamento'))

    return render_template(
        "endereco.html",
        carrinho=carrinho,
        subtotal=subtotal,
        envio=envio,
        total=total,
        quantidade_itens=quantidade_itens
    )

@app.route("/pagamento")
@login_required
def pagamento():
    return render_template("pagamento.html")

@app.route('/pagamento/indisponivel')
@login_required
def pagamento_indisponivel():

    flash('Pagamentos não disponíveis', 'error')
    return redirect(url_for('pagamento'))