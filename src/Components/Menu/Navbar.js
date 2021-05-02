import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import Cookies from 'universal-cookie';

const url = "https://spa-445.herokuapp.com/inicio";
const cookies = new Cookies();

class Navbar extends Component {

    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('usuario', { path: "/" });
        cookies.remove('contra', { path: "/" });
        window.location.href = './'
    }

    componentDidMount() {
        if (!cookies.get('usuario')) {
            window.location.href = './'
        }
    }
    render() {
        return (
            <>
                <nav id="encabezado" class="navbar navbar-expand-lg">
                    <div id="encabezado" class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page">
                                        <Link to='/home' className='navbar-logo' id="enlaces">
                                            Inicio
                                    </Link></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/usuarios' className='nav-links' id="enlaces" >
                                            Usuarios
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/servicios' className='nav-links' id="enlaces" >
                                            Servicios
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/productos' className='nav-links' id="enlaces" >
                                            Productos
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/inventarios' className='nav-links' id="enlaces" >
                                            Inventario
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/empleados' className='nav-links' id="enlaces" >
                                            Empleados
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/distribuidores' className='nav-links' id="enlaces" >
                                            Distribuidores
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/reservas' className='nav-links' id="enlaces" >
                                            Reservas
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/pqr' className='nav-links' id="enlaces" >
                                            PQR
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/compras' className='nav-links' id="enlaces" >
                                            Compras
                                </Link>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link">
                                        <Link to='/comidas' className='nav-links' id="enlaces" >
                                            Comidas
                                </Link>
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <button style={{backgroundColor:'#A874B0'}} className="btn btn-primary" onClick={() => this.cerrarSesion()}>Cerrar sesion</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navbar;