import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


const URL = () => {

    const assignment_id = {
        docx: 1211,
        pptx: 1212,
        xlsx: 1213
    };


    const resource_id = {
        translator: 1,
        proofReader: 2,
    };

    const pageStyle={
        width: "100vw",
        height: "100vh",
        backgroundColor: "lightgray",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }



    return (
        <div style={pageStyle}>
            <button style={{ marginRight:'10px', backgroundColor:'Blue' }} type="button" className="" >
                <Link style={{ color:'white' }} to={`/login/${assignment_id.docx}/${resource_id.translator}`}>DOCX</Link>
            </button>
            <button style={{ marginRight:'10px' , backgroundColor:'Blue' }} type="button" className="default btn-primary" >
                <Link style={{ color:'white' }} to={`/login/${assignment_id.pptx}/${resource_id.translator}`}>PPTX</Link>
            </button>
        </div>
    )
}

export default URL