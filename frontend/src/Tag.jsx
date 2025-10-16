
function Tag ({ text }) {
    const colortag = ["primary","secondary","success","danger","warning","info","dark"][Math.floor(Math.random()*7)];
    return (
        <>
        <span className={`badge text-bg-${colortag}`}>{text}</span>
        </>
    );
}

export default Tag;