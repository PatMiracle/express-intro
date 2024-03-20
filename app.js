const express = require("express");
const path = require("path");
const employees = require("./employees");
// middleware
const authorize = require("./authorize");
const logger = require("./logger");

const app = express();

// Serve static files -- express.static()
app.use(express.static(path.join(__dirname, "public")));

// setup global middleware
app.use(logger);

// API -- res.json()
app.get("/api/employees", (req, res) => {
  const { limit } = req.query;
  const newEmployeesList = employees.slice(0, Number(limit));
  if (limit) {
    res.status(200).json(newEmployeesList);
  } else res.status(200).json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.filter((product) => product.id === parseInt(id));

  if (!employee.length) {
    res.status(404).send("data cannot be found");
  } else res.status(200).json(employee);
});

// using middleware on single app instance
app.get("/api/employees/:id/secret", authorize, (req, res) => {
  res.status(200).send("John is the youngest!");
});

app.get("*", (req, res) => {
  res.status(404).send("404 page not found!");
});

app.listen(3000, () => console.log("server running at port 3000"));
