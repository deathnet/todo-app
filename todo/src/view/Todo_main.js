import React from 'react'
// import axios from 'axios'
import { TodoaddForm } from './Todo_addForm'
import { Todolist } from './Todo_list'
import { Link } from 'react-router-dom'

export const Todomain = (props) => {
	return (
		<div className="todo_main">
			<TodoaddForm addTask={props.addTask}/>
			<Todolist tasks={props.tasks} deleteTask={props.deleteTask}/>
			<Link to="/About">About</Link>
		</div>
	)
}