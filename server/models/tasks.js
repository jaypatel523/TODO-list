const mongoose = require('mongoose');


const Task = new mongoose.Schema({
    userId: {
        type: String,
    },
    tasks: [
        {
            taskid: { type: String },
            task: { type: String }
        }
    ],
});


module.exports = mongoose.model('task', Task);