const userRouter = require("./user/user.route");
const productRouter = require("./products/products.route");

const routes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};

module.exports = routes;
