import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {


//Extraer si un proyecto esta activo
const proyectosContext = useContext(proyectoContext);
const {proyectoseleccionado} = proyectosContext;

//obtener la funcion del context de tarea
const tareasContext = useContext(tareaContext)
const {agregarTarea, validarTarea, errortarea, obtenerTareas, tareaseleccionada, actualizarTarea, limpiarTarea} = tareasContext;

//Effect que detecta si se selecciona una tarea

    useEffect(() => {
    
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada) 
            } else {
                guardarTarea({
                    nombre : ''
                })
            }
        }
    , [tareaseleccionada])

//State del formulario
const [tarea, guardarTarea] = useState({
    nombre: ''
})

//extraer nombre del proyecto
const {nombre} = tarea;


//Si no hay proyecto seleccionado
if(!proyectoseleccionado) return null
const [proyectoActual] = proyectoseleccionado;


//Leer los valores del formulario
const handleChange = e => {

    guardarTarea({
     ...tarea,
     [e.target.name] : e.target.value   
    });
}

const onSubmit = e =>{

    e.preventDefault();
    
    //Validar
    if(nombre.trim() === ''){
        validarTarea();
        return
    }

    //Si es edicion o nueva tarea

    if(tareaseleccionada === null){
        //tarea nueva, agregar tarea a state de tareas
        tarea.proyecto = proyectoActual._id;
        agregarTarea(tarea);
    }else {
        actualizarTarea(tarea); //actualiza tarea existente
        //Elimina tarea seleccionada del state
        limpiarTarea();
    }  

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);
    //reiniciar el form
    guardarTarea({
        nombre: ''
    })

}
    return ( 

        <div className="formulario">

            <form onSubmit = {onSubmit}>
                <div className="contenedor-input">
                    <input type="text" 
                    className="input-text"
                    placeholder="Nombre tarea..."
                    name="nombre"
                    value = {nombre}
                    onChange = {handleChange}
                    />
                </div>

   <div className="contenedor-input">
                    <input type="submit" 
                    className="btn btn-primario btn-submit btn-block"
                    value={tareaseleccionada ? 'Editar Tarea' : "Agregar tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>


     );
}
 
export default FormTarea;