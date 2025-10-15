 const express = require('express');
 const app = express();
 app.use(express.json()); // poder leer json en el body
 const analisis = require('./src/get_analisis');

app.get('/analisis/:filename', (req, res) => {
   
        const analizado = analisis.get_analisis(req.params.filename);
        analizado.then(result => {

            result ? res.json(JSON.parse(result)) : res.status(404).json({mensaje: "No se obtuvo respuesta del modelo"}); 
        }).catch (err => {

            res.status(404).json({error: err})
        }) 
    
});

app.listen(3000, () => console.log("API en http://localhost:3000"));