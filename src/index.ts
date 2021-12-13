import restify from "restify";
import RouterManager from "./routes";
import { Router } from "restify-router";
import corsMiddleware from "restify-cors-middleware2";
import logger from "morgan";

const router = new Router();

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["*"],
  allowHeaders: ["API-Token", "Authorization"],
  exposeHeaders: ["API-Token-Expiry"],
});

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);

server.use(logger("dev"));
server.use(restify.plugins.queryParser());
server.use(
  restify.plugins.bodyParser({
    maxBodySize: 10000,
  })
);

router.add("/api", RouterManager);
router.applyRoutes(server);

server.listen(process.env.PORT, () => {
  console.log(
    `${process.env.APPLICATION_NAME} listening at http://localhost:${process.env.PORT}`
  );
});
