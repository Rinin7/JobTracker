const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

let applications = [
  {
    id: "5dbb3dd8-49d8-4c3b-93d9-59230836b2f1",
    company: "Google",
    title: "Web Dev",
    description: "new job 1",
    applied: "3/18/2021",
    rejected: false,
  },
  {
    id: "594daba3-e1e4-4a5f-89ae-372dfb95a16d",
    company: "Amazon",
    title: "UX",
    description: "new job 2",
    applied: "3/18/2021",
    rejected: false,
  },
  {
    id: "9c05b68b-e51b-42ce-8b89-10f8aa32db2b",
    company: "Robert Half",
    title: "Web Dev",
    description: "new job 3",
    applied: "3/18/2021",
    rejected: false,
  },
];

app.get("/applications", (req, res) => {
  res.json(applications);
});

app.post("/applications", (req, res) => {
  const { company, title, description, applied } = req.body;

  applications.push({
    id: uuidv4(),
    company,
    title,
    description,
    applied,
  });

  res.json(applications);
});

app.delete("/applications/:id", (req, res) => {
  for (let i = 0; i < applications.length; i++) {
    let currentApplications = applications[i];
    if (currentApplications.id == req.params.id) {
      applications.splice(i, 1);

      return res.json(applications);
    }
  }
});

app.listen(8080, () => {
  console.log("The server is running");
});
