import { Todomain } from "./view/Todo_main";
import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { About } from "./pages";
import { BrowserRouter } from "react-router-dom";
import { Weather } from "./pages/Weather";
import "./App.css";

// const axios = require("axios");

function App() {
	const [tasks, setTasks] = useState([]);

	// getTasks for first render
	useEffect(() => {
		const fetchtasks = async () => {
			const calltasks = await getTasks();
			setTasks(calltasks);
		};
		// const geo = navigator.geolocation;
		// const loc = geo.getCurrentPosition((pos) => {
		// 	const crd = pos.coords;
		// 	console.log(crd);
		// });
		// console.log(loc);
		
		fetchtasks();
	}, []);

	// GET tasks
	const getTasks = async () => {
		try {
			const res = await fetch("http://localhost:3001/todos");
			const data = await res.json();
			return (data);
		} catch (error) {
			console.log(error);
		}
	};

	// POST task
	const addTask = async (title, desc) => {
		const todoobj = {title: title, desc: desc};
		const res = await fetch("http://localhost:3001/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todoobj)
		});
		
		const data = await res.json();
	
		setTasks([...tasks, data]);
	};

	// DELETE task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:3001/todos/${id}`, {
			method: "DELETE",
		});

		setTasks(tasks.filter((task) => task.id !== id));
	};

  return (
		<BrowserRouter>
			<div className="App">
				<Todomain tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
				<Route path="/About" component={About} />
				<Weather />
			</div>
		</BrowserRouter>
  );
}

export default App;
