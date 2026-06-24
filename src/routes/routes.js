const userRouter = require("./user/user.route");

const routes = (app) => {
  app.use("/api", userRouter);
};

module.exports = routes;
