import React, { Component, useState, useEffect } from 'react'
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Titulo from '../Menu/Titulo';
import './Servicio.css'


const url = "https://spa-445.herokuapp.com/servicios/"
class Servicios extends Component{
state={
    data:[],
    modalInsertar: false,
    modalElmininar: false , 
    form:{
        idServicio:'',
        servicio:'',
        descripcion:'',
        precio:'',
        tipoModal: ''
    }
}
peticionGet= async ()=>{
    await Axios.get(url).then(response=>{
    this.setState({data: response.data});
    }).catch(error=>{
    console.log(error.mesage)
    })
}
peticionPost=async ()=>{
    delete this.state.form.idServicio;
    await Axios.post(url, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.mesage)
    })
  }

peticionPut=async ()=>{
        await Axios.put(url+this.state.form.idServicio, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    })
}

peticionDelete=async ()=>{
   await Axios.delete(url+this.state.form.idServicio).then(response=>{
        this.setState({modalElmininar: false});
        this.peticionGet();

    })
}

seleccionarServicio=(val)=>{
    this.setState({
        tipoModal: 'actualizar',
        form: {
            idServicio: val.idServicio,
            servicio: val.servicio,
            descripcion: val.descripcion,
            precio: val.precio,
        }
    })
}
modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
}
      
handleChange=async e=>{
e.persist();
await this.setState({
    form:{
    ...this.state.form,
    [e.target.name]: e.target.value
    }
});
console.log(this.state.form);
}
componentDidMount() {
    this.peticionGet();
}
  render(){
    const {form}=this.state;
    return (
        <>
        <Titulo title="Servicios"></Titulo>
        <button id='boton' style={{backgroundColor:'#A874B0'}} className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Servicio</button>
        <div style={{margin: '20px'}}> 
            <br>
            </br>
            <table style={{backgroundColor:'#A874B0'}} className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Servicio</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Accion</th>
                       
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((val) =>{
                    return(
                        <tr>
                        <td>{val.idServicio}</td>
                        <td>{val.servicio}</td>
                        <td>{val.descripcion}</td>
                        <td>{val.precio}</td>
                        <td>

                            <button className="btn btn-primary" onClick={()=>{this.seleccionarServicio(val); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                            {" "}
                            <button className="btn btn-danger" onClick={()=>{this.seleccionarServicio(val); this.setState({modalElmininar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>    
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody style={{backgroundColor:'#A874B0'}}>
                  <div className="form-group">
                    <label>ID</label>
                    <input className="form-control" type="text" name="idServicio" id="idServicio" readOnly onChange={this.handleChange} value={form?form.idServicio: this.state.data.length+1}/>
                    <br />
                    <label>Servicio</label>
                    <input className="form-control" type="text" name="servicio" id="servicio" onChange={this.handleChange} value={form?form.servicio: ''} />
                    <br />
                    <label>Descripcion</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''} />
                    <br/>                  
                    <label>Precio</label>
                    <input className="form-control" type="text" name="precio" id="precio" onChange={this.handleChange} value={form?form.precio: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                    {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                    </button>:<button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                    </button>
                    }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalElmininar}>
              <ModalBody style={{backgroundColor:'#A874B0'}}>
                  estas seguro que deseas eliminar el servicio {form && form.servicio}
              </ModalBody>
              <ModalFooter>
                  <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>SI</button>
                  <button className="btn btn-secundary" onClick={()=>this.setState({modalElmininar: false})}>NO</button>
              </ModalFooter>
          </Modal>    
        </div>
        </>   
    )
 }    
}
export default Servicios;