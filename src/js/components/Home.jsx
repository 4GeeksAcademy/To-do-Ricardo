import React from "react";
import { useState } from "react";
import Tarea from "./Tarea";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	let [tasks, setTasks] = useState([
		"Instalar el entorno de desarrollo (VSCode, Git)",
		"Crear estructura HTML básica para el proyecto",
		"Aplicar estilos con CSS (colores, fuentes, márgenes)",
		"Escribir funciones en JavaScript para interactividad",
		"Conectar el proyecto con una API usando fetch"
	])

	const [newTask, setNewTask] = useState()
	
	let addTask = (key)=> {
		if (key === "Enter"){
			setTasks( [...tasks, newTask.trim()] )
		}

	}

	let deleteTask = (index) =>{
		setTasks(tasks.filter((item, i)=> index != i ))
	}

	return (
		<div className="text-center">

			<div>
				<h1>To do List!</h1>
				<input onChange={e => { setNewTask(e.target.value) }} type="text" value={newTask || " "}
					onKeyUp={e => { addTask(e.key) }}
				/>
			</div>

			{tasks.map((task, index) => {
				return(<Tarea key={index} descripcion={task} onDelete={() => deleteTask(index)} />)
			
			})

			}
			{tasks.length == 0 && <p> No hay tareas, añadir tareas </p> }
		</div>
	);
};

export default Home;