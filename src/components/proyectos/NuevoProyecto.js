import React, {Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';//state del proyecto



const NuevoProyecto = () => {

    //Obtener state del formulario
    const proyectosContext = useContext(proyectoContext)
    const {formulario, 
        errorformulario, 
        mostrarFormulario, 
        agregarProyecto, 
        mostrarError} = proyectosContext;

    //State proyecto
    const [proyecto, setProyecto] = useState({
        nombre : ''
    });

    //Destructuring
    const {nombre } = proyecto;

    //contenidos input
    const onChangeProyecto = e => {

        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    //Al enviar un proyectoç

    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar proyecto
        if(nombre === '') {
            mostrarError();
            return }
        //Agregar el state
        agregarProyecto(proyecto);
         // Reiniciar el form
         setProyecto({
            nombre: ''
        })
    }

   //Mostrar formulario
    const onClickFormulario = () =>{
            mostrarFormulario();
        }


return ( 
        <Fragment>
            <button type="button" 
            className="btn btn-block btn-primario"
            onClick = {onClickFormulario}>Nuevo Proyecto</button>

            { formulario ?            
                ( 
                    <form className="formulario-nuevo-proyecto" onSubmit = {onSubmitProyecto}>

                        <input type="text" className="input-text" placeholder="Nombre Proyecto" 
                            name = "nombre" value = {nombre} onChange={onChangeProyecto} />

                        <input type="submit" className="btn btn-primario btn-block"
                            value="Agregar proyecto" />
                    </form>
                ) : null }

            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}     
        </Fragment>
     );
}
 
export default NuevoProyecto;