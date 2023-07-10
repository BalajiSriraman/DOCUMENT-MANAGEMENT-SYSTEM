import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const fastify: FastifyInstance = Fastify({})
 fastify.register(cors, {
    // put your options here
})

fastify.get('/', async (request, reply) => {

    return ({
        status: 'ok',
    })

})

// Endpoint to handle file uploads
fastify.post('/files', (request, reply) => {
    console.log('request')
    const form = formidable({ multiples: true });
  
    // Parse the incoming form data
    form.parse(request.raw, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data', err);
        reply.code(500).send({ error: 'Failed to process the uploaded file(s).' });
        return;
      }
  
      // Move the uploaded file(s) to the desired folder
      const folder = fields.folder || 'default';
      const uploadDir = path.join(__dirname, 'uploads', 'folder');
  
      fs.mkdirSync(uploadDir, { recursive: true });
  
      // Move each file to the upload directory
    //   Object.values(files).forEach((file) => {
    //     const oldPath = file.path;
    //     const newPath = path.join(uploadDir, file.name);
  
    //     fs.renameSync(oldPath, newPath);
    //   });
  
      reply.send({ message: 'File(s) uploaded successfully.' });
    });
  });
  
