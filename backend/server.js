require("dotenv").config();
const express = require("express");
const app = require("./app");

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening to port ${port} ...`)
);

process.on("unhandledRejection", (err) => {
  console.log("Unhandeled Rejection 💀💀 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
