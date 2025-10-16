import { useEffect, useState } from 'react';
import axios from 'axios';
import './Preview.css';
import Tag from './Tag.jsx';
function Preview({ filename }) {
    const [tags, setTags] = useState([]);
    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        (async () => {
            if(typeof filename == "string"){
                setSpinner(true);
                setTags([]);
                const res = await axios.get(`http://localhost:3000/analisis/${filename}`);
                setSpinner(false);
                setTags(res.data.tags);
                console.log("tags",tags);
            }
        })()
    },[filename]);// Ejecuta cuando se actualice filename
    return (
        <>
        <div className="col-lg-7">
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Vista previa</h5>
          <div className="preview-card mb-3">
            <img id="previewImage" className="img-preview" src={typeof filename == "string" ? `http://localhost:3000/file/${filename}` : null} alt="Vista previa"  style={{display: filename ? "block" : "none"}} />
            <div id="placeholder" style={{display: !filename ? "block" : "none"}} className="text-center p-3 text-muted">
              <div className='donita'>🍩</div>
              <div className="mt-2">Aquí veras la imagen que subiras</div>
            </div>
          </div>

          <h6>Tags descriptivos</h6>
          <div id="tagsArea" className="mb-3">
            <div class="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status" style={{display: spinner ? "inline-flex": "none"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            { 
                tags.map((ele) => (
                    <Tag key={ele.label} text={`${ele.label} 👉  ${ele.confidence}`} />
                ))
            }
          </div>
        </div>
      </div>
        </>
    );
}

export default Preview;