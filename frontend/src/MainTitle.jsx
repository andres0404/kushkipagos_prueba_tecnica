import './MainTitle.css';
function MainTitle() {
    return (
        <>
            <div className="card p-3 mb-4 shadow-sm header">
                <div className="d-flex align-items-center gap-3">
                    <div className="cubo" >
                        AS
                    </div>
                    <div>
                        <div className="brand fs-4">AI Vision · Analizador</div>
                        <div className="hint">Sube una imagen y la IA devolverá tags descriptivos de la imagen.</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainTitle;