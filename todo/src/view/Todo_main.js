import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TodoaddForm } from "./Todo_addForm";
import { Todolist } from "./Todo_list";
import { Link } from "react-router-dom";

export const Todomain = () => {

	const [tasks, setTasks] = useState([]);

	// getTasks first render
	useEffect(() => {
		const fetchtasks = async () => {
			const calltasks = await getTasks();
			setTasks(calltasks);
		};
		
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

	const [mode, setMode] = useState("main");
	const controlLink = (e) => {
		if (mode === "About") {
			e.target.textContent = "";
			setMode("main");
		}
		else if (mode === "main") {
			e.target.textContent = "About";
			setMode("About");
		}
	};

	return (
		<div className="todo_main">
			<TodoaddForm addTask={addTask}/>
			<Todolist tasks={tasks} deleteTask={deleteTask}/>
			<Link to={"/About"}><span onClick={controlLink}>About</span></Link>
		</div>
	);
};

Todomain.propTypes = {
	tasks: PropTypes.array,
	addTask: PropTypes.func,
	deleteTask: PropTypes.func
};