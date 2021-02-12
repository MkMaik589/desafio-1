const express = require("express");
const cors = require("cors");
const {v4} = require("uuid");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// LISTAR TODOS OS REPOS
app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

// ADD REPO
app.post("/repositories", (req, res) => {
  const {title,url,techs} = req.body;
  const repository = {
    id: v4(),
    title: "Desafio NodeJS",
    url: "https://github.com/MkMaik589/desafio-1",
    techs: ["Node.js","..."],
    likes: 0
  }
  repositories.push(repository);
  return res.status(200).json(repository);
});

// EDIT REPO
app.put("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {title, url, techs} = req.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex<0){
    return res.status(400).json({error:"Repositório Não Encontrado"});
  }

  const repo = {
    id,
    title,
    url,
    techs
  }

  repositories[repoIndex] = repo;

  return res.status(200).json(repo);
});

// DEL REPO
app.delete("/repositories/:id", (req, res) => {
  /* 
    1. Encontrar o id do repositório que quero excluir
    2. Retirar esse repositório de dentro do array com o splice
    3. Retornar a função com o .send
  */
  const {id} = req.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex<0){
    return res.status(400).json({error: "Repositório Não Encontrado"});
  }

  repositories.splice(repoIndex,1);

  return res.status(204).send();

});

// ADD LIKE
app.post("/repositories/:id/like", (req, res) => {
  /* 
    1. Encontrar o id do like 
    2. Fazer verificação se o id existe
    3. Adicionar um incremento na pripriedade like do objeto
    4. Mostrar na tela
  */
  const {id} = req.params;
  const likeIndex = repositories.findIndex(repo => repo.id === id);

  if(likeIndex<0){
    return res.json({error: "Repositório Não Encontrado"});
  }

  // Para incrementar na propriedade de um objeto existente
  repositories[likeIndex].likes++;

  return res.status(200).json(repositories[likeIndex]);
});

module.exports = app;
