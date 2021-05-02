import React from 'react'
import Navbar from '../Components/Menu/Navbar';
import Logo from '../fotos/logo.png'
import  './Home.css'

export default function Home (){
    return (
        <>
        <Navbar/>
            <img id="logo" class="card-img-top" src={Logo} ></img>
            
        </>
    )
}
