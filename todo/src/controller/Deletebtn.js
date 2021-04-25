import React from "react";
import PropTypes from "prop-types";

export const Deletebtn = ({ task, deleteTask }) => {
	return (
		<button className="delbtn" onClick={() => deleteTask(task.id)}>
			X
		</button>
	);
};

Deletebtn.propTypes = {
	task: PropTypes.object,
	deleteTask: PropTypes.func
};