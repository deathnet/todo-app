import React from 'react'
import {Task} from './Task'

export const Todolist = ({tasks, deleteTask}) => {
	return (
		<div className="todo_list">
			{tasks.map((task, index) => (
				<Task task={task} key={index} deleteTask={deleteTask} />
			))}
		</div>
	)
}
