const { response } = require('express');
const roleModel = require('../models/role-model');


// Obtener todos los roles
const getRoles = async(req, res=response) =>{

    const roles = await roleModel.findAll();

    res.status(200).json({
        ok: true,
        roles
    });
}

// Obtener role por id
const getRoleById = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const role = await roleModel.findByPk(id);
        if(!role){
            res.status(404).json({
                ok: false,
                msg: "No existe un role con ese id"
            });
        }else{
            res.status(200).json({
                ok: true,
                role
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


// Crear un role
const postRole = async(req, res=response) =>{
    
    try {
        
        // Nuevo role
        const newRole = await roleModel.create(req.body);

        res.status(200).json({
            ok: true,
            newRole
        });        

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Ver logs...'
        });
    }
}


// Actualizar un role
const putRole = async(req, res=response) =>{

    const id = req.params.id;
    try {
        const role = await roleModel.findByPk(id);
        if(!role){
            return res.status(404).json({
                ok: false,
                msg: "No existe un role con ese id"
            });
        }

        // Proceso de actualización
        const actulizedRole = await roleModel.update(req.body, {
            where: {
                id: id
            }
        });
        res.status(200).json({
            ok: true,
            actulizedRole
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error en la base de datos. Ver logs"
        });
    }
}


// Eliminar un role
const deleteRoleById = async(req, res=response) =>{

    const id = req.params.id;
    
    try {

        const role = await roleModel.findByPk(id);

        if(!role){
            return res.status(404).json({
                ok:false,
                msg: 'No existe role con ese id'
            });
        }

        await roleModel.destroy({
            where: {
                id: id
            }
        });

        res.json({
            ok: true,
            msg: 'Role eliminado'
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
    getRoles,
    getRoleById,
    postRole,
    putRole,
    deleteRoleById
}