import React , {useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

     //extraer los valores del contexto
     const alertaContext = useContext(AlertaContext)//al importar con mayuscula, utilizo minuscula
     const {alerta, mostrarAlerta} = alertaContext;
 
     const authContext = useContext(AuthContext);
     const { mensaje, autenticado, iniciarSesion } = authContext;
    //En caso que el pass o usuario no exista
     useEffect(() => {
        if(autenticado){ props.history.push('/proyectos'); }
        if(mensaje) { mostrarAlerta( mensaje.msg, mensaje.categoria)}
                 // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [mensaje, autenticado, props.history])


    const [usuario, setUsuario] = useState({    
    email : '',
    password : ''
    })

    //extraer de usuario
    const {email, password} = usuario;


const onChange = e =>{
    setUsuario({
        ...usuario,
        [e.target.name]:e.target.value
    })
}

//Iniciar sesion:
const onSubmit = e => {
    e.preventDefault();
    //Validacion que no haya campos vacios
    if(email.trim() === '' || password.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
    }
    //Pasarlo al action
    iniciarSesion({email, password})
}

return ( 
    <div className="form-usuario">
            {alerta ? (<div className ={`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}

        <div className="contenedor-form sombra-dark">
            <h1>Iniciar sesión</h1>
            <form
            onSubmit = {onSubmit}>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                    id="email" 
                    name="email" 
                    placeholder="Tu Email" 
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
                <input type="submit" value="Iniciar Sesión" className="btn btn-primario btn-block"/>
            </div>

        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener Cuenta</Link>
    </div>
</div>

        );
}
 
export default Login;