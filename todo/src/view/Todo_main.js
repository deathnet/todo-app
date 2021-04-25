import React, { useState } from "react";
import PropTypes from "prop-types";
import { TodoaddForm } from "./Todo_addForm";
import { Todolist } from "./Todo_list";
import { Link } from "react-router-dom";

export const Todomain = ({ tasks, addTask, deleteTask }) => {
	const [mode, setMode] = useState("main");
	const controlLink = (e) => {
		if (mode === "About") {
			e.target.textContent = "";
			setMode("About");
		}
		else if (mode === "main") {
			e.target.textContent = "About";
			setMode("main");
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