import Fastify, { FastifyInstance } from 'fastify';
import express from 'express'
// import cors from '@fastify/cors'
import cors from 'cors'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { Request } from "express";
const app = express()
app.use(cors<Request>());

export const fastify: FastifyInstance = Fastify({})     

// fastify.register(cors, {
//     // put your options here
// })

fastify.get('/', async (request, reply) => {

    return ({
        status: 'ok',
    })

})

// Endpoint to handle file uploads
app.post('/files', (request, reply) => {
    const form = formidable({ multiples: true });
    console.log(form)

    // // Parse the incoming form data
    // form.parse(request.raw, (err, fields, files) => {
    //   if (err) {
    //     console.error('Error parsing form data', err);
    //     reply.code(500).send({ error: 'Failed to process the uploaded file(s).' });
    //     return;
    //   }

    //   // Move the uploaded file(s) to the desired folder
    //   const folder = fields.folder || 'default';
    //   const uploadDir = path.join(__dirname, 'uploads', 'folder');

    //   fs.mkdirSync(uploadDir, { recursive: true });

    //   // Move each file to the upload directory
    // //   Object.values(files).forEach((file) => {
    // //     const oldPath = file.path;
    // //     const newPath = path.join(uploadDir, file.name);

    // //     fs.renameSync(oldPath, newPath);
    // //   });

    reply.send({ message: 'File(s) uploaded successfully.' });
    // });
});

app.listen(1403, () => {
    console.log('Server listening on http://localhost:1403 ...');
})