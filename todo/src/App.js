import {Todomain} from './view/Todo_main'
import {useState, useEffect} from 'react'

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const fetchtasks = async () => {
			const calltasks = await getTasks();
			setTasks(calltasks);
		};

		fetchtasks();

	}, []);

	const getTasks = async () => {
		try {
			const res = await fetch('http://localhost:3001/todos');
			const data = await res.json();
			return (data);
		} catch (error) {
			console.log(error);
		}
	};

	const addTask = async (title, desc) => {
		const todoobj = {title: title, desc: desc};
		const res = await fetch(`http://localhost:3001/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todoobj)
		});
		
		const data = await res.json();
	
		setTasks([...tasks, data]);
	}

	const deleteTask = async (id) => {
		await fetch(`http://localhost:3001/todos/${id}`, {
			method: 'DELETE',
		});

		setTasks(tasks.filter((task) => task.id !== id));
	}

  return (
    <div className="App">
      <Todomain tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
