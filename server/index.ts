import { fastify } from "./app";

fastify.listen({ port: 1403 }, (err, address) => {
  console.error(`server listening  on specified port`);
});
  