const openai = require('openai');
const fs = require('fs');
const path = require('path');

const openainst = new openai();

// crear binario del archivo
async function crearArchivo (fileName) {
    const imagenPath = path.join(__dirname,'../img',fileName)
    const contenidoArchivo = fs.createReadStream(imagenPath);
    const result = await openainst.files.create({
        file: contenidoArchivo,
        purpose: "vision"
    });
    return result.id;
}

module.exports = {
    crearArchivo
}
