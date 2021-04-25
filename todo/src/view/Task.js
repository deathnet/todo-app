import React from "react";
import PropTypes from "prop-types";
import { Deletebtn } from "../controller/Deletebtn";

export const Task = ({ task, deleteTask }) => {
	return (
		<div className="task">
			<h3>{task.title}</h3>
			<p>{task.desc}</p>
			<Deletebtn deleteTask={deleteTask} task={task}/>
		</div>
	);
};

Task.propTypes = {
	task: PropTypes.object,
	deleteTask: PropTypes.func
};