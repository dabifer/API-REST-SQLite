const { response } = require('express');
const taskModel = require('../models/task-model');


// Obtener todos los tasks
const getTasks = async(req, res=response) =>{

    const tasks = await taskModel.findAll();

    res.status(200).json({
        ok: true,
        tasks
    });
}

// Obtener task por id
const getTaskById = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const task = await taskModel.findByPk(id);
        if(!task){
            res.status(404).json({
                ok: false,
                msg: "No existe un task con ese id"
            });
        }else{
            res.status(200).json({
                ok: true,
                task
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en la base de datos. Ver logs"
        });
    }
}


// Crear un task
const postTask = async(req, res=response) =>{
    
    try {
        
        // Nuevo task
        const newTask = await taskModel.create(req.body);

        res.status(200).json({
            ok: true,
            newTask
        });        

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Ver logs...'
        });
    }
}


// Actualizar un task
const putTask = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const task = await taskModel.findByPk(id);
        if(!task){
            return res.status(404).json({
                ok: false,
                msg: "No existe un task con ese id"
            });
        }

        // Proceso de actualización
        const actulizedTask = await taskModel.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            ok: true,
            actulizedTask
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en la base de datos. Ver logs"
        });
    }
}


// Eliminar un task
const deleteTaskById = async(req, res=response) =>{

    const id = req.params.id;
    
    try {

        const task = await taskModel.findByPk(id);

        if(!task){
            return res.status(404).json({
                ok:false,
                msg: 'No existe task con ese id'
            });
        }

        await taskModel.destroy({
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: 'Task eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en la base de datos. Ver logs"
        });        
    }
}




module.exports = {
    getTasks,
    getTaskById,
    postTask,
    putTask,
    deleteTaskById
}