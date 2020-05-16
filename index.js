const express = require('express')
const server = express()
const PORT = 5005;

const projectRoutes = require('./projectroutes/projectRoutes')
const actionRoutes = require('./actionroutes/actionroutes')

server.use(express.json())

server.use('/api/projects', projectRoutes)
server.use('/api/projects/:id/actions', actionRoutes)
server.use('/', (req, res) => {
  res.status(200).send('asdasd')
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})