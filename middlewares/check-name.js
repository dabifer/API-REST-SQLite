const { response } = require('express');

const checkName = (req, res=response, next) =>{
    // El campo "name" es requerido
    if(req.body.name === "" || req.body.name === undefined){
        return res.status(400).json({
            ok: false,
            msg: "'name' es requerido"
        });
    };

    // En este punto no hay errores. Se prosigue
    next();
}

module.exports = checkName;