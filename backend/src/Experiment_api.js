const express = require('express');
const app = express();
app.use(express.json()); // poder leer json en el body

let users = [
    {id:1, name:"Juan"},
    {id:2, name: "Maria"}
];
// GET listar usuarios
app.get('/users', (req, res) => {
    res.json(users);
});
// GEt un usuario
app.get('/users/:id', (req, res) => {
    const user = users.find(usu => usu.id == req.params.id);
    user ? res.json(user) : res.status(404).json({messaje: "Usuario no encontrado"});
});

// POST crear usuario
app.post ('/user', (req, res) => {
    const newUser = {id: Date.now(), ...req.body};
    users.push(newUser);
    res.status(201).json(newUser);
})

module.exports = {
    app
}