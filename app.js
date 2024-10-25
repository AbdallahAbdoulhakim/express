const express = require("express");
const path = require("path");

const app = express();

const { people } = require("./data");

app.use(express.static("./src"));

app.get("/api/people", (req, res) => {
  const { search, limit } = req.query;
  let orderedPeople = [...people];

  if (search) {
    orderedPeople = orderedPeople.filter(
      (person) =>
        person.clientName.toLowerCase().includes(search) ||
        person.project.toLowerCase().includes(search) ||
        person.country.toLowerCase().includes(search) ||
        person.birthdate.toLowerCase().includes(search)
    );
  }

  if (limit) {
    orderedPeople = orderedPeople.slice(0, Number(limit));
  }

  res.status(200).json({ success: true, data: orderedPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
