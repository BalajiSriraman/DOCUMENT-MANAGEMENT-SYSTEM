import { fastify } from "./app";

// fastify.get('/post', async(request, return) => {
//     return { work: 100 }
// })

export fastify.get('/', async (request, reply) => {

    return ({
        status: 'ok',
    })

})
