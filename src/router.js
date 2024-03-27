// arquivo router.js melhor escabalidade, manutencao do code

// openDb
//import { openDb } from './configDB.js'
import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa, Home } from './Controler/Pessoa.js'
import express, { Router } from 'express'

const router = Router()


router.get('/', Home)
router.get('/status', (req, res) => {
  res.json({
    "status": 200,
    "message": "API running"
  })
})
router.get('/pessoas', selectPessoas)
router.get('/pessoa', selectPessoa)
router.post('/pessoa', insertPessoa)
router.delete('/pessoa', deletePessoa)
// previous way to study
router.put('/pessoa', (req, res) => {
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





/* createTable()

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


export default router