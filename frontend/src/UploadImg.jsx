
import { useState } from 'react';
import axios from 'axios';

import './UploadImg.css';
function UploadImg({ uploadDone }) {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('Disponible...');

    const handlerForm = async (e) => {
        e.preventDefault();
        if(!file) {
            alert("Selecciona un archivo");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: { "Content-Type": "multipart/form-data"},
                onUploadProgress: (e) => {
                    const porcentaje = Math.round((e.loaded * 100) / e.total);
                    setUploadProgress(porcentaje);
                    setStatusMessage("Subiendo...");
                }
            });
            setStatusMessage(`✅ Subida imagen correctamente`);
            uploadDone(res.data.filename); // actuliza estado en el padre
        }catch (err) {
            setStatusMessage(`⛔ Error al subir archivo. ${err.response.data.error}`);
            console.error(err.response.data.error);
        }
    }
    return (
        <>
        <div className="col-lg-5 left-gap">
            <div className="card p-3 shadow-sm">
            <h5 className="mb-2">Subir imagen</h5>
            <form id="form" onSubmit={handlerForm}>
                <div className="mb-3">
                <input className="form-control" id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" required />
                <div className="form-text">PNG, JPG, GIF. Tamaño máximo: 5 MB.</div>
                </div>

                <div className="mb-3 d-grid gap-2 d-sm-flex">
                <button id="analyzeBtn" className="btn btn-primary flex-grow-1" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear me-2" viewBox="0 0 16 16"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-.63.606l-.316.074c-1.64.383-1.64 2.72 0 3.103l.316.074c.277.065.47.286.53.56l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 .63-.606l.316-.074c1.64-.383 1.64-2.72 0-3.103l-.316-.074a.873.873 0 0 1-.53-.56l-.094-.319zM6.283 0h3.434l.082.312c.2.77.766 1.389 1.5 1.63l.288.093-.21.202c-.608.585-.63 1.59-.048 2.198l.21.202-.288.093a2.56 2.56 0 0 0-1.5 1.63L9.717 9H6.283l-.082-.312a2.56 2.56 0 0 0-1.5-1.63l-.288-.093.21-.202c.608-.585.63-1.59.048-2.198L3.9 4.535l.288-.093A2.56 2.56 0 0 0 5.688 2.81L5.77 2.5z"/></svg>
                    Analizar
                </button>
                <button id="resetBtn" className="btn btn-outline-secondary" onClick={() => window.location.reload()} type="button">Limpiar</button>
                </div>

                <div className="mb-3">
                <label className="form-label">Progreso</label>
                <div className="progress" style={{height:"18px"}}>
                    <div id="progressBar" className="progress-bar progress-bar-striped" role="progressbar" style={{width: `${uploadProgress}%`}}>{uploadProgress}%</div>
                </div>
                <div id="statusText" className="small mt-1 text-muted">{statusMessage}</div>
                </div>

            </form>
            </div>
        </div>
        </>
    );
}

export default UploadImg;