import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {


    //Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyectoseleccionado, eliminarProyecto} = proyectosContext;

    //Obtener Tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //Si no hay proyecto seleccionado
    if(!proyectoseleccionado) return <h2>Selecciona un proyecto</h2>

    //Array destructuring para extraer proyecto actual
    const [proyectoActual] = proyectoseleccionado;

    //ELiminar proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id);

    }
    return ( 
            <Fragment>
                     <h2>Proyecto: {proyectoActual.nombre}</h2>

                     <ul className="listado-tareas">
                         {tareasproyecto.length  === 0
                          ? (<li className="tarea"><p>No hay tareas</p></li>)
                          : 
                          <TransitionGroup>
                            {  (tareasproyecto.map(tarea => (
                             <CSSTransition 
                             key = {tarea._id} 
                             timeout={200} 
                             classNames="tarea">
                                  <Tarea tarea = {tarea} />
                             </CSSTransition>
                          )))}
                          </TransitionGroup>
                          }
                     </ul>
                          <button 
                          type="button"
                          className="btn btn-eliminar"
                          onClick = {onClickEliminar}>Eliminar proyecto &times;</button>

            </Fragment>

     );
}
 
export default ListadoTareas;