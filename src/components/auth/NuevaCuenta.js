import React , {useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';//import con mayuscula
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los valores del contexto
    const alertaContext = useContext(AlertaContext)//al importar con mayuscula, utilizo minuscula
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso que el usuario se haya autenticado o registrado (registro duplicado)
    useEffect(() => {
      if(autenticado){ props.history.push('/proyectos'); }
      if(mensaje) { mostrarAlerta( mensaje.msg, mensaje.categoria)}
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history])

    const [usuario, setUsuario] = useState({
    
        nombre : '',
        email : '',
        password : '',
        confirmar: ''
    })

    //extraer de usuario
    const {nombre, email, password, confirmar} = usuario;


const onChange = e =>{
    setUsuario({
        ...usuario,
    [e.target.name] : e.target.value
    })
}

//Iniciar sesion:
const onSubmit = e => {
    e.preventDefault();

    //Validacion
    if(nombre.trim() === '' || 
        email.trim() === '' ||
        password.trim() === '' ||
        confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
    //Password minimo 6 caracteres
    if(password.length < 6){
        mostrarAlerta('El password debe tener al menos 6 caracteres', 'alerta-error');
            return;
    }
    //Password/Confirmación iguales
       if(password !== confirmar){
        mostrarAlerta('Los password no son iguales', 'alerta-error');
            return;
    }
    //Pasarlo al action
    registrarUsuario({nombre,email,password});
}

    return ( 
<div className="form-usuario">
    {alerta ? (<div className ={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}
    <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>
        <form
        onSubmit = {onSubmit}>
            <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input type="text"
                id="nombre" 
                name="nombre" 
                placeholder="Tu Nombre" 
                onChange ={onChange} 
                value={nombre}/>
            </div>

   <div className="campo-form">
                <label htmlFor="email">Email</label>
                <input type="text"
                id="email" 
                name="email" 
                placeholder="Tu Correo" 
                onChange ={onChange} 
                value={email}/>
            </div>

            <div className="campo-form">
                <label htmlFor="password">Password</label>
                <input type="password"
                id="password"
                 name="password"
                  placeholder="Tu Password" 
                  onChange ={onChange} 
                  value = {password}
                  />
            </div>


            <div className="campo-form">
                <label htmlFor="confirmar">Confirmar Password</label>
                <input type="password"
                id="confirmar"
                 name="confirmar"
                  placeholder="RepiteTu Password" 
                  onChange ={onChange} 
                  value = {confirmar}
                  />
            </div>



            <div className="campo-form">
                <input type="submit" value="Registrarme" className="btn btn-primario btn-block"/>
            </div>

        </form>
        <Link to={'/'} className="enlace-cuenta">Volver a iniciar sesión</Link>

    </div>
</div>

        );
}
 
export default NuevaCuenta;