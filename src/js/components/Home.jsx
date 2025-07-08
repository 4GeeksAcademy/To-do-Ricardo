import React from "react";
import { useState, useEffect } from "react";
import Tarea from "./Tarea";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {



	let [tasks, setTasks] = useState([])

	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		const apiURL = "https://playground.4geeks.com/todo/users/ricardo"
		fetch(apiURL)
			.then(response => {
				return response.json()
			})
			.then(datos => {
				setTasks(datos.todos)
			})
	}
		, [])


	let addTask = (key) => {
		if (key === "Enter") {

			fetch('https://playground.4geeks.com/todo/todos/ricardo', {
				method: "POST",
				body: JSON.stringify({
					"label": newTask,
					"is_done": false,
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					if (resp.ok) {
						setNewTask()
					}
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
					setTasks([...tasks, data])
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});


			/*setTasks([...tasks, newTask.trim()])*/
		}

	}

	let deleteTask = (id, index) => {
		/*setTasks(tasks.filter((id i) => index != i)) */
		fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: "DELETE",
		})
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				if (resp.ok) {
					setTasks(tasks.filter((item,i) => index != i)) 
				}
				console.log(resp.status); // El código de estado 201, 300, 400, etc.
				 // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}

	return (
		<div className="text-center ">

			<div className="mt-5" >
				<h1 className="fs-1 fst-italic text-success-emphasis" >To do List!</h1>
				<input onChange={e => { setNewTask(e.target.value) }} type="text" value={newTask || " "}
					onKeyUp={e => { addTask(e.key) }}
				/>
			</div>
			<div className=" m-auto border border-top-0  w-25">
				{tasks.map((task, index) => {
					return (<Tarea key={index} descripcion={task.label} onDelete={() => deleteTask(task.id, index)} />)

				})

				}
				{tasks.length == 0 && <p> No hay tareas, añadir tareas </p>}
			</div>
			<span className="fst-italic">{tasks.length} Items Left</span>
		</div>
	);
};

export default Home;