import React, { useState } from 'react'

export const TodoaddForm = (props) => {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const submit = (e) => {
		e.preventDefault()

		if (!title) {
			alert("Please add a Todo");
			return;
		}

		props.addTask(title, desc);
		
		setTitle("");
		setDesc("");
	}

	return (
		<form className="todo_addForm" onSubmit={submit}>
			<input id="todo_title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
			<input id="todo_description" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}></input>
			<button type="submit">Add</button>
		</form>
	)
}
