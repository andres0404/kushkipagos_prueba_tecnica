const openai = require('openai');
const imagen = require('./get_image.js'); 

async function get_analisis(fileName) {
    const openainst = new openai();
    const fileId = await imagen.crearArchivo(fileName);
    const response = await openainst.responses.create({
        model: "gpt-4.1-mini",
        input: [
            {
                role: "user",
                content: [
                    { type: "input_text", text: `Muestra una lista de etiquetas que describan la imagen asignando a cada una la probabilidad de que ésta sea la descripción más precisa en un rango de 0 a 1. Formato de salida JSON: { "tags": [ { "label": "Perro", "confidence": 0.98 }, { "label": "Golden Retriever", "confidence": 0.95 }, { "label": "Parque", "confidence": 0.91 }, { "label": "Césped", "confidence": 0.88 }` },
                    {
                        type: "input_image",
                        file_id: fileId,
                    },
                ],
            },
        ],
    });
    return response.output_text;
}


module.exports = {
    get_analisis
}