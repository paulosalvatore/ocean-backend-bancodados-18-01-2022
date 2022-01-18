const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
// const url = "mongodb+srv://admin:hd2rV5duoPrrIi3t@cluster0.jup2c.mongodb.net/";

const dbName = "ocean_bancodados_18_01_2022";

async function main() {
    // Conexão com o Banco de Dados

    const client = await MongoClient.connect(url);

    const db = client.db(dbName);

    const collection = db.collection("herois");

    // Aplicação em Express

    const app = express();

    // Sinalizo para o Express que o body das requisições
    // estará sempre estruturado em JSON
    app.use(express.json());

    // Endpoint "/"
    app.get("/", function (req, res) {
        res.send("Hello, World!");
    });

    // Endpoint "/oi"
    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!");
    });

    const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
    //              0                   1                2

    // [GET] "/herois" - Read All (Ler todos os registros)
    app.get("/herois", function (req, res) {
        res.send(lista.filter(Boolean));
    });

    // [GET] "/herois/:id" - Read Single (by Id) (Ler um registro pelo ID)
    app.get("/herois/:id", function (req, res) {
        const id = req.params.id - 1;

        const item = lista[id];

        res.send(item);
    });

    // [POST] "/herois" - Create (Criar um registro)
    app.post("/herois", function (req, res) {
        const item = req.body;

        lista.push(item.nome);

        res.send("Item adicionado com sucesso.");
    });

    // [PUT] "/herois/:id" - Update (Atualizar um registro)
    app.put("/herois/:id", function (req, res) {
        const id = req.params.id - 1;

        const item = req.body;

        lista[id] = item.nome;

        res.send("Item atualizado com sucesso.");
    });

    // [DELETE] "/herois/:id" - Delete (Remover um registro)
    app.delete("/herois/:id", function (req, res) {
        const id = req.params.id - 1;

        delete lista[id];

        res.send("Item removido com sucesso.");
    });

    app.listen(3000);
}

main();
