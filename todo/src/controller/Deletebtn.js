import React from 'react'

export const Deletebtn = ({task, deleteTask}) => {
	return (
		<button onClick={() => deleteTask(task.id)}>
			X
		</button>
	)
}
