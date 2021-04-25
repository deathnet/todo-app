import React from "react";
import PropTypes from "prop-types";
import {Task} from "./Task";

export const Todolist = ({tasks, deleteTask}) => {
	return (
		<div className="todo_list">
			{tasks.map((task, index) => (
				<Task task={task} key={index} deleteTask={deleteTask} />
			))}
		</div>
	);
};

Todolist.propTypes = {
	tasks: PropTypes.array,
	deleteTask: PropTypes.func
};