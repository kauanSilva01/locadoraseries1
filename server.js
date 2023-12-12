import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/locadora', (request, reply) => {
   const {nome, diretor, neps, nhoras } = request.body
    database.create({
        nome: nome,
        diretor: diretor,
        neps: neps,
        nhoras: nhoras
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/locadora', (request) => {
    const search = request.query.search

    console.log(search)
    
    const locadoras = database.list(search)
   
    return locadoras
})

server.put('/locadora/:id', (request, reply) => {

    const locadoraId = request.params.id
    const {nome, diretor, neps, nhoras} = request.body
    const locadora = database.update(locadoraId, {
        nome,
        diretor,
        neps,
        nhoras,
    })
    return reply.status(204).send()
})

server.delete('/locadora/:id', (request, reply) => {
    const locadoraId = request.params.id

    database.delete(locadoraId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})