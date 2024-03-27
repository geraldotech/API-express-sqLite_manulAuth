//import { openDb } from './configDB.js'
//import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from './Controler/Pessoa.js'
import express from 'express'
import router from './router.js'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

const port = 4000
const app = express()

app.use(express.json())
app.use(router)
app.use(cors())

/* 
createTable()

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/pessoas', async (req, res) => {
  let pessoas = await selectPessoas()
  res.json(pessoas)
})
app.get('/pessoa', async (req, res) => {
  let pessoa = await selectPessoa(req.body.id)
  res.json(pessoa)
})

app.post('/pessoa', (req, res) => {
  //console.log(req.body)
  insertPessoa(req.body)
  res.json({
    statusCode: 200,
  })
})

app.put('/pessoa', (req, res) => {
  if (req.body && !req.body.id) {
    return res.json({
      statusCode: '400',
      msg: 'Precisa de um id',
    })
  }

  updatePessoa(req.body)
  res.json({
    statusCode: 200,
  })
})

app.delete('/pessoa', async (req, res) => {
  let pessoa = await deletePessoa(req.body.id)
  res.json(pessoa)
}) */

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

https.createServer({
  cert: fs.readFileSync('./src/SSL/code.crt'),
  key: fs.readFileSync('./src/SSL/code.key'),
}, app).listen(4001, () => console.log(`App running on ssl https`))