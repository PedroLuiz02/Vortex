# ⚡ Vortex Energy

> E-commerce de energéticos desenvolvido para demonstrar conhecimentos em desenvolvimento Full Stack.

## 🌐 Demonstração

Acesse a aplicação:

https://vortex-liard-eight.vercel.app/

---

## 📖 Sobre o projeto

O Vortex Energy Store é um e-commerce desenvolvido com foco em oferecer uma experiência moderna para compra de energéticos.

O sistema permite que clientes naveguem pelos produtos, realizem cadastro, façam login e adicionar itens ao carrinho. O projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento web Full Stack, integração com banco de dados PostgreSQL e deploy em nuvem.

---

## Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Catálogo de produtos
- Pesquisa de produtos
- Carrinho de compras
- Gerenciamento de pedidos
- Área administrativa
- Cadastro, edição e exclusão de produtos
- Upload de imagens
- Banco de dados PostgreSQL
- Interface responsiva

---

## 🛠 Tecnologias

### Backend

- Python
![Python](https://img.shields.io/badge/Python-3.13-blue)
- Flask
![Flask](https://img.shields.io/badge/Flask-3.x-black)
- SQLAlchemy
- PostgreSQL
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
- Supabase
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

### Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript

### Deploy

- Vercel
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
- Supabase
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

---

## 📂 Estrutura do Projeto

```
Vortex/
│
├── app/
│   ├── static/
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   │
│   ├── templates/
│   │   ├── cadastro.html
│   │   ├── carrinho.html
│   │   ├── endereco.html
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── pagamento.html
│   │   ├── produto.html
│   │   └── produtos.html
│   │
│   ├── __init__.py
│   ├── create_db.py
│   ├── db.py
│   ├── models.py
│   └── routes.py
│
├── instance/
│   └── database.db
│
├── main.py
├── README.md
├── requirements.txt
└── vercel.json
```

## Executando o projeto no VS Code

### 1. Clone o repositório

Abra o VS Code e abra o terminal integrado:

```
Terminal → New Terminal
```

Execute:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

Após o download, abra a pasta do projeto no VS Code:

```
File → Open Folder → Selecione a pasta Vortex
```

---

### 2. Criar o ambiente virtual

No terminal do VS Code, execute:

```bash
python -m venv venv
```

### 3. Ativar o ambiente virtual

No terminal integrado do VS Code:

**PowerShell (Windows)**

```bash
.\venv\Scripts\Activate.ps1
```

### 4. Instalar as dependências

Com o ambiente virtual ativo:

```bash
pip install -r requirements.txt
```

O VS Code instalará todas as bibliotecas necessárias para executar o projeto.

---

## ⚠️ Configuração do banco de dados

Este projeto utiliza um banco **PostgreSQL hospedado no Supabase**.

Por questões de segurança, as credenciais do banco de dados **não estão incluídas no repositório**.

Para executar o projeto localmente, crie um arquivo chamado:

```
.env
```

Adicione suas próprias credenciais:

```env
DATABASE_URL=sua_url_postgresql
SECRET_KEY=sua_secret_key
```

Você pode utilizar:

- Supabase
- PostgreSQL local
- Docker com PostgreSQL

---

### 5. Executar a aplicação

Com o ambiente virtual ativo, execute:

```bash
python app.py
```

disponível no VS Code.

A aplicação estará disponível em:

```
http://localhost:5000
```

---

## 📈 Próximas melhorias

- Sistema de cupons
- Favoritos
- Avaliação de produtos
- Dashboard administrativo
- Histórico de pedidos
- Integração com gateway de pagamento
- Recuperação de senha

---

## 👨‍💻 Autor

Pedro Luiz

LinkedIn:
https://www.linkedin.com/in/pedroluiz02/

GitHub:
https://github.com/PedroLuiz02