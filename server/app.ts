import Fastify, { FastifyInstance } from 'fastify';
export const fastify: FastifyInstance = Fastify({})

fastify.get('/', async (request, reply) => {

    return ({
        status: 'ok',
    })

})

fastify.post('/files', async (request, reply) => {

    return (request.body)
})

