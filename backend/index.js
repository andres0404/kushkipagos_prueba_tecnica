 const express = require('express');
 const app = express();
 const multer = require('multer');
 const path = require('path');
 app.use(express.json()); // poder leer json en el body
 const analisis = require('./src/get_analisis');

app.get('/analisis/:filename', (req, res) => {
   
        const analizado = analisis.get_analisis(req.params.filename);
        analizado.then(result => {

            result ? res.json(JSON.parse(result)) : res.status(404).json({messaje: "No se obtuvo respuesta del modelo"}); 
        }).catch (err => {
            res.status(404).json({error: err})
        }) 
    
});
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,file.originalname.replace(/^.*\./g, `${uniqueSuffix}.`));
    },
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,"img"));
    }
});
const subir = multer({
    storage: storage,

    limits: { fileSize: 5 *1024 *1024}, // 5MB
    fileFilter: (req, file, cb) => {
        const permitidos = ["image/png","image/jpg", "image/jpeg","image/gif", "image/webp"];
        if(!permitidos.includes(file.mimetype)) {
            return cb(new Error("Tipo de archivo no permitido"));
        }
        cb(null, true);
    }
});
app.post('/upload', (req, res) => {
    subir.single("file")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // error por los criterios establecidos
            return res.status(400).json({error: `Error al subir archivo: ${err.messaje}`});
        } else if (err){ // error general
            return res.status(500).json({error: err.messaje});
        }
        if(!req.file) {
            return res.status(400).json({error: "No se envió archivo"});
        }
        res.status(201).json({
            messaje: "Archivo subido correctamente",
            filename: req.file.originalname,
            size: req.file
        });
    });
})

app.listen(3000, () => console.log("API en http://localhost:3000"));