const Task = require('../models/tasks');


const createToDo = async (req, res) => {
    try {
        let dbid = await Task.findOne({ userId: req.body.userId });
        if (dbid) {
            dbid.tasks.push({ taskid: req.body.taskid, task: req.body.name });
            const todo = new Task(dbid);
            await todo.save();
        }
        else {
            const todo = new Task({ userId: req.body.userId, tasks: [{ taskid: req.body.taskid, task: req.body.name }] });
            await todo.save();
        }
        res.send({ msg: req.body });
    } catch (error) {
        res.send({ msg: error })
    }
}


const getAllTodos = async (req, res) => {
    try {
        const dbtasks = await Task.findOne({ userId: req.body._id })
        if (!dbtasks) {
            throw new Error('something went wrong');
        }
        const tasks = dbtasks.tasks;
        res.send(tasks);
    } catch (error) {
        res.send({ msg: error });
    }
}



const deleteTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;
        const deleted = await Task.findOneAndUpdate({ "userId": userId }, { "$pull": { "tasks": { "taskid": taskId } } }, { safe: true }).clone()
        if (!deleted) {
            throw new Error('error while deleting');
        }
        res.send({ msg: 'task deleted' });
    } catch (error) {
        res.send({ msg: error })
    }
}


const editTask = async (req, res) => {
    try {
        // console.log(req.params);
        const userid = req.params.userId;
        const task = JSON.parse(req.params.task)
        // console.log(task);


        const updated = await Task.updateOne({ tasks: { "$elemMatch": { "taskId": task.taskid } } },
            {
                $set: {
                    "tasks.$.taskid": task.taskid,
                    "tasks.$.task": task.task
                }
            }
        )


        res.send({ msg: 'task updated' });
    } catch (error) {
        res.send({ msg: error })
    }
}


module.exports = { createToDo, getAllTodos, deleteTask, editTask };