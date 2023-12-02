const express = require("express");
require("dotenv").config();
const TaskModel = require("./src/models/TaskModel");
const connectDB = require("./src/db.js");


const port = 3030;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    await connectDB();
    try {
        const taskList = await TaskModel.find();
        res.status(200).json(taskList);
    } catch (error) {
        res.status(500).send("Algo salio mal.", error);
    };
});

app.post("/", async (req, res) => {
    await connectDB();
    const description = req.body.description;
    try {
        const newUser = await TaskModel.create({
            description,
            completed: false
        });
        newUser ? res.status(201).send(newUser) : res.status(500).send("Ocurrió un error creando la tarea");
    } catch (error) {
        res.status(500).send("Ocurrió un error al crear la tarea");
    }
});

app.put("/:id", async (req, res) => {
    const id = req.params.id;
    await connectDB();
    try {
        const modifiedUser = await TaskModel.updateOne({_id : id}, {$set : {completed: true}});
        modifiedUser.modifiedCount > 0 ? res.status(200).send(modifiedUser) : res.status(500).send("No se pudo actualizar la tarea");
    } catch (error) {
        res.status(500).send("Ocurrió un error al actualizar la tarea");
    }
});

app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await connectDB();
    try {
        const deletedUser = await TaskModel.deleteOne({ _id : id});

        console.log(deletedUser);
        deletedUser.deletedCount > 0 ? res.status(200).send("Tarea eliminada") : res.status(500).send("No se pudo eliminar la tarea");
    } catch (error) {
        res.status(500).send("Ocurrió un error", error);
    };
});

app.listen(port, () => {
    console.log("Server runnning on port", port);
})