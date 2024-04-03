import { openDb } from "../configDB.js";





export async function createTable(){
  openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome, TEXT, idade INTEGER)')
  })
}

export function Home(req, res){
  res.send("Home Page")
}


export function dashboardAdmin(req, res) {
  //res.render('index.html')
  res.sendFile('admin.html', { root: './public' });
}


export async function insertPessoa(req, res){
  let pessoa = req.body
  console.log(pessoa)
  openDb()
  .then(db => {
    db.run('INSERT INTO Pessoa (nome, idade) VALUES (?, ?)', [pessoa.nome, pessoa.idade])
  });
  res.json({
    "statusCode": 200,
  })
}

export async function updatePessoa(pessoa){
  openDb()
  .then(db => {
    db.run('UPDATE Pessoa SET nome=?, idade=?, text=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.text, pessoa.id])
  });
}

export async function selectPessoas(req, res){
   openDb().then(db => {
     db.all('SELECT * FROM Pessoa')
    .then(pessoas => res.json(pessoas))
  });
}

export async function selectPessoa(req, res){
  let id = req.body.id
   openDb()
  .then(db => {
     db.get('SELECT * FROM Pessoa WHERE id=?',[id])
    .then(pessoa => res.json(pessoa))
  });
}

export async function deletePessoa(req, res){
   openDb()
  .then(db => {
     db.get('DELETE FROM Pessoa WHERE id=?',[req.body.id])
    .then(res => res)
  });
  res.json({
    "statusCode": 200,
    "message": 'deleted'
  })
}

