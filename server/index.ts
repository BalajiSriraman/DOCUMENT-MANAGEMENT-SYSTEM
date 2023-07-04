import { fastify } from "./app";

fastify.listen({ port: 3000 }, (err, address) => {
  console.error(`server listening  on specified port`);
});
  