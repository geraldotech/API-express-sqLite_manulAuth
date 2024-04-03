//import { openDb } from './configDB.js'
//import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from './Controler/Pessoa.js'
import express from 'express'
import router from './router.js'
import fs from 'fs'
import https from 'https'
import cors from 'cors'
import basicAuth from 'express-basic-auth'

const port = 4000
const app = express()
app.use(express.json())
app.use(router)
// Sample way serve static files from the 'public' directory
app.use(express.static('public'))


app.use((req, res, next) => {
  // console.log('acessou o Middware!!')

  // Enable CORS globally for all routes
  app.use(cors())

  // block PostMan
  /*   if (userAgent && userAgent.includes('Postman')) {
    return res.status(403).send('Postman requests are not allowed');
} */

  // allow fetch - all
  res.header('Access-Control-Allow-Origin', '*')

  // allow post browser - all
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // allow methods
  res.header('Access-Control-Allow-Methods', ['GET', 'DELETE', 'PUT', 'POST'])

  next()
})

/* === Middwares === */
/* 
//👉 using express-basic-auth + logout router
//only works router acima

app.use(basicAuth)

// Define your credentials
const users = {
  'geraldo': '12@'
};

// Middleware for basic authentication
const authMiddleware = basicAuth({
  users: users,
  challenge: true // Respond with 401 authentication challenge
});

app.use('/admin', authMiddleware) */



/* ==== 👉 manual auth  ====  */
// only works if router vim depois
// protect but no offer a prompt
// send a get in post

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
 //  console.log(req.headers) 
 console.log(`authMiddleware`,req.headers)

 if (auth && auth.startsWith('Basic ')) {
  const encodedCredentials = auth.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  const [username, password] = decodedCredentials.split(':');

  // Now you have the username and password
  console.log('username:', username);
  console.log('Password:', password);
 
  if ( username === 'geraldo' && password === '123') {
  return next()
  } else {
    res.status(401).send('Unauthorized');
  }
}  else {
  res.status(401)
  res.send('Access forbidden')
}
 
}
//app.get('/admin', authMiddleware);
// Middleware to require authentication only for the /post route

// Middleware to require authentication in all routers
//app.use(authMiddleware)
app.use('/admin', authMiddleware)
//app.use('/pessoas', authMiddleware)





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
