import { openDb } from '../configDB.js'
import fs from 'fs'
export async function createTable() {
  openDb().then((db) => {
    db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome, TEXT, idade INTEGER)')
  })
}

export function Home(req, res) {
  res.send('Home Page')
}

export function dashboardAdmin(req, res) {
  //console.log(`admin`, process.env.NOME)
  //console.log('dashAdmin', req.headers.authorization)
  //res.render('index.html')
  // console.log(req.isAuthenticated)
  res.sendFile('admin.html', { root: './public' })

  //res.json({statusCode: 201, auth: true})
  //res.json({ message: "login successfully", product: true });
}

export function loginHandler(req, res, next) {
  console.log(`tentando logar`)
  // res.sendFile('login.html', { root: './public' })
  const auth = req.headers.authorization

  console.log(auth)
  console.log(req.isAuthenticated)

  /* if(!auth){
    res.sendFile('login.html', { root: './public' })
  } else {

    
  } */

  if (auth && auth.startsWith('Basic ')) {
    const encodedCredentials = auth.split(' ')[1]
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
    const [username, password] = decodedCredentials.split(':')

    console.log(username === 'geraldo' && password === '123')

    if (username === 'geraldo' && password === '123') {
      console.log(`logado`)
      //  res.setHeader(`Basic test`); // Add custom header
      req.isAuthenticated = true
      //next()
      return res.sendFile('admin.html', { root: './public' })
    } else {
      console.log(`Não autorizado!`)
      res.sendFile('login.html', { root: './public' })
      //  res.status(401).send('Unauthorized')
    }
  } else {
    /*  res.status(401)
    console.log('Access forbidden')
    res.send('Access forbidden') */
    res.sendFile('login.html', { root: './public' })
  }

  // envia o admin!
}

export async function insertPessoa(req, res) {
  let pessoa = req.body
  openDb().then((db) => {
    db.run('INSERT INTO Pessoa (nome, idade) VALUES (?, ?)', [pessoa.nome, pessoa.idade])
  })
  res.json({
    statusCode: 200,
  })
}

export async function updatePessoa(pessoa) {
  openDb().then((db) => {
    db.run('UPDATE Pessoa SET nome=?, idade=?, text=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.text, pessoa.id])
  })
}

export async function selectPessoas(req, res) {
  openDb().then((db) => {
    db.all('SELECT * FROM Pessoa').then((pessoas) => res.json(pessoas))
  })
}

export async function selectPessoa(req, res) {
  let id = req.body.id
  openDb().then((db) => {
    db.get('SELECT * FROM Pessoa WHERE id=?', [id]).then((pessoa) => res.json(pessoa))
  })
}

export async function deletePessoa(req, res) {
  openDb().then((db) => {
    db.get('DELETE FROM Pessoa WHERE id=?', [req.body.id]).then((res) => res)
  })
  res.json({
    statusCode: 200,
    message: 'deleted',
  })
}
