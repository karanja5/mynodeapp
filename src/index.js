const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON payloads
app.use(bodyParser.json());

// In-memory 'database' for the items
let items = [
  { id: 1, name: "Cup" },
  { id: 2, name: "Glass" },
  { id: 3, name: "Spoon" },
  { id: 4, name: "Fork" },
  { id: 5, name: "Knife" },
];

// ROOT endpoint sending a welcome message
app.get("/", (req, res) => res.send("Welcome to the Node Docker API!"));

// GET endpoint to list all items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST endpoint to create a new item
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT endpoint to update an existing item
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) res.status(404).send("The item with the given ID was not found.");

  item.name = req.body.name;
  res.json(item);
});

// DELETE endpoint to delete an item
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex < 0)
    res.status(404).send("The item with the given ID was not found.");

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
