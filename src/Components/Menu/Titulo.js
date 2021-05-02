import react from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

const Titulo = ({title}) =>{
    return (
        <>
        <div>
            <h3 id="titulo">{title}</h3>
        </div>
        </>
    )
}

export default Titulo