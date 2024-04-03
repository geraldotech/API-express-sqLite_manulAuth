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

/* === Middware === */

app.use((req, res, next) => {
  // console.log('acessou o Middware!!')

  // Enable CORS globally for all routes
   app.use(cors())

  // block PostMan
  /*   if (userAgent && userAgent.includes('Postman')) {
    return res.status(403).send('Postman requests are not allowed');
} */

  // allow fetch - all
 // res.header('Access-Control-Allow-Origin', 'http://localhost:5501')

  // allow post browser - all
  res.header('Access-Control-Allow-Headers', 'http://143.198.232.51:4000')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // allow methods 
  res.header("Access-Control-Allow-Methods", ['GET', 'DELETE', 'PUT', 'POST'])

  next()
})

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(router)

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

https
  .createServer(
    {
      cert: fs.readFileSync('./src/SSL/code.crt'),
      key: fs.readFileSync('./src/SSL/code.key'),
    },
    app
  )
  .listen(4001, () => console.log(`App running on ssl https`))
