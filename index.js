const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { oas } = require("koa-oas3");
const cors = require('koa2-cors');
const Static = require('koa-static');



const app = new Koa();
const router = require('./src/routers/router');
app.use(Static("./front-end/my-weather-app/build"));



app.use(
  oas({
    file: `${__dirname}/openapi.yaml`,
    endpoint: "/openapi.json",
    uiEndpoint: "/",
    validatePaths: ["/else"],
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", // 指定origin为前端地址
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE", "PUT"],
    maxAge: 86400,
  })
);

app.use(bodyParser());
app.use(router.routes());

app.listen(8080, () => {
  console.log("the server is listening on 8080");
});
