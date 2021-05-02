import React, { Component, useState, useEffect } from 'react'
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';


const url = "https://spa-445.herokuapp.com/roles/"
class Roles extends Component{
state={
    data:[]
}
peticionGet= async ()=>{
    await Axios.get(url).then(response=>{
    this.setState({data: response.data});
    }).catch(error=>{
    console.log(error.mesage)
    })
}
componentDidMount() {
    this.peticionGet();
}
  render(){
    return (
        <>
        <div style={{margin: '40px'}}> 
            <br>
            </br>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rol</th>
                        <th>Nombre</th>
                        
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((val) =>{
                    return(
                        <tr>
                        <td>{val.id}</td>
                        <td>{val.rol}</td>
                        <td>{val.nombre}</td>
                       
                        </tr>
                    );
                    })}
                </tbody>
            </table>        
        </div>
        </>   
    )
 }    
}
export default Roles;