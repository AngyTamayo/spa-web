import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import Axios from 'axios';
import Cookies from 'universal-cookie';
import Titulo from '../Components/Menu/Titulo'

const url = "https://spa-445.herokuapp.com/inicio"; 
const cookies = new Cookies();

class Inicio extends Component {
    state={
        form:{
            usuario: '',
            contra: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await Axios.get(url, {params: {usuario: this.state.form.usuario, contra: this.state.form.contra}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('usuario', respuesta.usuario, {path: "/"});
                cookies.set('contra', respuesta.contra, {path: "/"});
                alert(`Bienvenido ${respuesta.usuario}`);
                window.location.href="./home";
            }else{
                alert('Los datos ingresados son incorrectos...')
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    componentDidMount() {
        if(cookies.get('usuario')){
            window.location.href='./';
        }
    }
    
    

    render(){
        return(
          <>
          <Titulo id="titulo" title="ADMINISTRADOR"></Titulo>
            <div className="containerPrincipal" >
                <div className="containerSecudnario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br></br>
                        <input type="text" className="form-control" name="usuario"
                            onChange={this.handleChange}></input>
                        <br></br>
                        <label>Contraseña</label>
                        <br></br>
                        <input type="password" className="form-control" name="contra"
                            onChange={this.handleChange}></input>
                        <br></br>
                        <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>iniciar sesion</button>
                    </div>
                </div>
            </div>
</>
        )
    }
}

export default Inicio;
