import React, { useState } from "react";
import PropTypes from "prop-types";

export const TodoaddForm = ({ addTask }) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const submit = (e) => {
		e.preventDefault();

		if (!title) {
			alert("Please add a Todo");
			return;
		}

		addTask(title, desc);
		
		setTitle("");
		setDesc("");
	};

	return (
		<form className="todo_addForm" onSubmit={submit}>
			<input id="todo_title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
			<input id="todo_description" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></input>
			<button type="submit">Add</button>
		</form>
	);
};

TodoaddForm.propTypes = {
	addTask: PropTypes.func
};