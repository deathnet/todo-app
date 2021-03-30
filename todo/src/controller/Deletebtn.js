import React from 'react'

export const Deletebtn = ({task, deleteTask}) => {
	return (
		<button className="delbtn" onClick={() => deleteTask(task.id)}>
			X
		</button>
	)
}
