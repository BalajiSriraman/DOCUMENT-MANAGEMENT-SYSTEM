import Fastify, { FastifyInstance } from 'fastify';
export const fastify: FastifyInstance = Fastify({})
fastify.get('/', async (request, reply) => {

    return ({
        status: 'ok',
    })

})

