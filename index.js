const express = require("express");

const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "ocean_bancodados_18_01_2022";

async function main() {
  // Conecta com o banco de dados
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("herois");

  // Aplicação express
  const app = express();

  // JSON
  app.use(express.json());

  // CSS
  app.use(express.static("public"));

  // Endpoint "/"
  app.get("/", (req, res) => {
    res.send(
      '<link rel="stylesheet" type="text/css" href="/style.css"><main><h1>Hell World</h1></main>'
    );
  });

  // Endpoint "/oi"
  app.get("/oi", (req, res) => {
    res.send("Olá, mundo!");
  });

  // [GET] "/herois" - Lista todos os herois
  app.get("/herois", async (req, res) => {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  // [GET] "/herois/:id" - Lista um heroi
  app.get("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  });

  // [POST] "/herois" - Insere um heroi
  app.post("/herois", async (req, res) => {
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });

  // [PUT] "/herois/:id" - Altera um heroi
  app.put("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: item });
    res.send(item);
  });

  // [DELETE] "/herois/:id" - Deleta um heroi
  app.delete("/herois/:id", async (req, res) => {
    const id = req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.send(`Heroi ${id} deletado!`);
  });

  // [LISTEN]
  app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000.");
    console.log("Acesse: http://localhost:3000");
    console.log("Acesse: http://localhost:3000/oi");
    console.log("Acesse: http://localhost:3000/herois");
  });
}

main();
