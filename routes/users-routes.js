/*
    Ruta: api/users
*/

const { Router } = require('express');
const { getUsers, postUser, deleteUserById, putUser, getUserById } = require('../controllers/users-controllers');
const checkName = require('../middlewares/check-name');

const router = Router();

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por id
router.get('/:id', getUserById);

// Crear un usuario
// checkName: middleware creado para verificar que al menos el campo "name" llegue con información
router.post('/', checkName, postUser);

// Actualizar un usuario por id. En este caso, con el middleware corroboramos que al menos venga el nombre
router.put('/:id', checkName, putUser);

// Eliminar un usuario por id
router.delete('/:id', deleteUserById);



module.exports = router;