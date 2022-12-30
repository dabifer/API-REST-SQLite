const express = require('express');
const db = require('./models');

// Base de datos
db.sync().then(() => {
    console.log('Conectado a SQLite')
}).catch(() => {
    console.log('Hubo un error al conectarse a SQLite')
})


//const cors = require('cors');


// Servidor Express
const app = express();

// Configurar CORS
//app.use(cors());

// Lectura y parseo del body
app.use(express.json());



// Rutas
// Users
app.use('/api/users', require('./routes/users-routes'));

// Tasks
app.use('/api/tasks', require('./routes/tasks-routes'));

// Roles
app.use('/api/roles', require('./routes/roles-routes'));





app.listen(3000, () =>{
    console.log('Servidor corriendo en puerto: ' + 3000);
});