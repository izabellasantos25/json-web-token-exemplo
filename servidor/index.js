
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
const corsOpcoes = {
  //Cliente que fará o acesso
  origin: "http://localhost:3000", 
  //Metodos que o cliente pode executar
  methods: "GET,PUT,POST,DELETE",

  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}


const crypto = require('./crypto');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cors(corsOpcoes))

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('usuarios/cadastrar');
  
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async function(req, res) {
  try {
    const { usuario: username, senha } = req.body;
    const user = await usuario.findOne({ where: { nome: username } });

    if (user && crypto.decrypt(user.senha) === senha) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 3000
      });

      res.cookie('token', token, { httpOnly: true }).json({
        nome: user.nome,
        token: token,
      });
      /*return res.json({
        usuario: user.nome, 
        token: token
      });*/
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao realizar login." });
  }
});

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({
    deslogado:true
  })


})

app.post('/usuarios/cadastrar', async function(req, res){
  try {
    const email = {
      nome: req.body.nome,
      senha: crypto.encrypt(req.body.senha)
    }
    if(req.body.senha == req.body.senhadois){
     const novousu = await usuario.create(email);
      res.redirect('/usuarios/listar')
  } 
}   catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
  }
})

app.get('/usuarios/listar', async function(req, res){
  try {
   var novousu = await usuario.findAll();
   res.json( novousu );
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
 }
 })

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});