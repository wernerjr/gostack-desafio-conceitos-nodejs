const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repositorie);

  return response.status(200).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex <= 0)
    return response.status(400).json({message: "Repositorie does not exists"});

  const likes = repositories[repositorieIndex].likes;

  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs,
    likes
  }
  return response.status(200).json(repositories[repositorieIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0)
    return response.status(400).json({message: "Repositorie does not exists"});

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0)
    return response.status(400).json({message: "Repositorie does not exists"});

  const repositorie = repositories[repositorieIndex];
  repositorie.likes++;

  repositories[repositorieIndex] = repositorie;
  return response.status(200).json(repositorie);
});

module.exports = app;
