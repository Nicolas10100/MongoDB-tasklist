const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    completed : Boolean,
});

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;