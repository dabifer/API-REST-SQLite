const { response } = require('express');
const userModel = require('../models/user-model');


// Obtener todos los usuarios
const getUsers = async(req, res=response) =>{

    const users = await userModel.findAll();

    res.status(200).json({
        ok: true,
        users
    });
}

// Obtener usuario por id
const getUserById = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const user = await userModel.findByPk(id);
        if(!user){
            res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }else{
            res.status(200).json({
                ok: true,
                user
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


// Crear un usuario
const postUser = async(req, res=response) =>{
    
    try {
        
        // Nuevo usuario
        const newUser = await userModel.create(req.body);

        res.status(200).json({
            ok: true,
            newUser
        });        

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Ver logs...'
        });
    }
}


// Actualizar un usuario
const putUser = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const user = await userModel.findByPk(id);
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }

        // Proceso de actualización
        const actulizedUser = await userModel.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            ok: true,
            actulizedUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en la base de datos. Ver logs"
        });
    }
}


// Eliminar un usuario
const deleteUserById = async(req, res=response) =>{

    const id = req.params.id;
    
    try {

        const user = await userModel.findByPk(id);

        if(!user){
            return res.status(404).json({
                ok:false,
                msg: 'No existe usuario con ese id'
            });
        }

        await userModel.destroy({
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
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
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUserById
}