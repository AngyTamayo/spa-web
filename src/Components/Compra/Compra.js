import React, { Component, useState, useEffect } from 'react'
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Titulo from '../Menu/Titulo';


const url = "https://spa-445.herokuapp.com/compras/"
class Compras extends Component{
state={
    data:[],
    modalInsertar: false,
    modalElmininar: false , 
    form:{
        idCompra:'',
        barrio:'',
        dirección:'',
        telefono:'',
       
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
    delete this.state.form.idCompra;
    await Axios.post(url, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.mesage)
    })
  }

peticionPut=async ()=>{
        await Axios.put(url+this.state.form.idCompra, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    })
}

peticionDelete=async ()=>{
   await Axios.delete(url+this.state.form.idCompra).then(response=>{
        this.setState({modalElmininar: false});
        this.peticionGet();

    })
}

seleccionarEmpleado=(val)=>{
    this.setState({
        tipoModal: 'actualizar',
        form: {
            idCompra: val.idCompra,
            barrio: val.barrio,
            dirección: val.direccion,
            telefono: val.telefono
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
        <Titulo title="Compras"></Titulo>
        <button style={{backgroundColor:'#A874B0',transform:'translate(500%, 0%)'}} className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Compra</button>
        <div style={{margin: '20px'}}> 
            <br>
            </br>
            <table style={{backgroundColor:'#A874B0'}} className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Barrio</th>
                        <th>Direccion</th>
                        <th>Telefono</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.data.map((val) =>{
                    return(
                        <tr>
                        <td>{val.idCompra}</td>
                        <td>{val.barrio}</td>
                        <td>{val.dirección}</td>
                        <td>{val.telefono}</td>
                        <td>

                            <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpleado(val); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                            {" "}
                            <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpleado(val); this.setState({modalElmininar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
                    <input className="form-control" type="text" name="idCompra" id="idCompra" readOnly onChange={this.handleChange} value={form?form.idCompra: this.state.data.length+1}/>
                    <br />
                    <label>Barrio</label>
                    <input className="form-control" type="text" name="barrio" id="barrio" onChange={this.handleChange} value={form?form.barrio: ''} />
                    <br />
                    <label>Direccion</label>
                    <input className="form-control" type="text" name="dirección" id="dirección" onChange={this.handleChange} value={form?form.dirección: ''} />
                    <br/>  
                    <label>Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''} />
                    <br/>                  
                  </div>
                </ModalBody>

                <ModalFooter>
                    {this.state.tipoModal=='insertar'?
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
                  estas seguro que deseas eliminar la compra {form && form.barrio}
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

export default Compras;