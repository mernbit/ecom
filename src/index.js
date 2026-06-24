const app = require("./app/app");
const connectDB = require("./db/db");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

connectDB();

app.get("/", (req, res) => {
  return res.send("Server is online!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
