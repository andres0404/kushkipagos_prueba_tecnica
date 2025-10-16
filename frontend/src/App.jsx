import { useState } from 'react'
import MainTitle from './MainTitle.jsx';
import UploadImg from './UploadImg.jsx';
import Preview from './Preview.jsx';

import './App.css'

function App() {
  const [filenameAnalize, setFilenameAnalize] = useState(null);
  const handleUploadDone = (filename) => setFilenameAnalize(filename); // agrega nombre del archivo y dispara el analisis

  return (
    <>
    <MainTitle />
    <div className="row g-3">
      
        <UploadImg uploadDone={handleUploadDone} />
        <Preview filename={filenameAnalize} />
   
    </div>
    </>
  );
}

export default App
