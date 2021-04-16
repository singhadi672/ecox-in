const express = require("express");
const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.json({ test: true });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
