import express from 'express'
import router from './src/router.js'
import fs from 'fs'
import cors from 'cors'
import { config } from 'dotenv'

const port = 4005
const app = express()
app.use(express.json())
config()

const { NOME } = process.env
console.log(`process.env`, process.env.NOME)

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

/* ==== 👉 manual auth  ====  */
// only works if router vim depois
// protect but no offer a prompt
// send a get in post

function authMiddleware(req, res, next) {
  //console.log(`authMiddleware response`,req.headers)
  const auth = req.headers.authorization
  //console.log(req)

  if (auth && auth.startsWith('Basic ')) {
    const encodedCredentials = auth.split(' ')[1]
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
    const [username, password] = decodedCredentials.split(':')

    if (username === 'geraldo' && password === '123') {
      console.log(`logado`)
      //  res.setHeader(`Basic test`); // Add custom header
      req.isAuthenticated = true
      return next()
    } else {
      console.log(`Não autorizado!`)
      res.status(401).send('Unauthorized')

    }
  } else {
    res.status(401)
    console.log('Access forbidden')
    res.send('Access forbidden')
  }
}

function isAuth(req, res, next) {
  console.log(`reply from middle isAuth`)

  const auth = req.headers.authorization
if(!auth){
  res.redirect('/login')
}
  if (true) {
    req.isAuthenticated = true
    next() // Move to the next middleware/route handler
  }
}

const helloMiddleware = () => {
  return (req, res, next) => {
    console.log('Hello from custom middleware!')
    next() // Call next to move to the next middleware or route handler
  }
}

/* === protected routers === */

//app.use('/pessoas', authMiddleware)

// POST
app.use('/pessoa', authMiddleware)


// GET
app.use('/pessoa', authMiddleware)

// admin - in test! send /login to /admin
// monitor who receice authe
app.use('/admin', isAuth)
//app.use('/login', authMiddleware)

app.use(router)
// Sample way serve static files from the 'public' directory
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
