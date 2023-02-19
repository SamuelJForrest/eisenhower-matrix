import { Fragment, useState } from "react";
import { createPortal } from "react-dom";

import TaskGrid from "./components/Tasks/TaskGrid";
import Header from "./components/UI/Header";
import Modal from "./components/UI/Modal";
import TaskForm from "./components/Tasks/TaskForm";

function App() {
	const [tasks, setTasks] = useState([]);
	const [modal, setModal] = useState(false);
	const [taskNameHasError, setTaskNameHasError] = useState(false);
	const [taskValues, setTaskValues] = useState({
		id: "",
		title: "",
		urgent: false,
		important: false,
	});
	const [currentlyEditing, setCurrentlyEditing] = useState();

	const toggleModal = () => {
		setModal((prevState) => {
			if (taskValues.title || taskValues.urgent || taskValues.important) {
				setTaskValues({
					id: "",
					title: "",
					urgent: false,
					important: false,
				});
			}

			if (currentlyEditing) {
				setCurrentlyEditing(false);
			}

			return !prevState;
		});
	};

	const clearTasks = () => {
		setTasks([]);
	};

	const editingMode = (e) => {
		const currentTask = e.target;
		const currentID = currentTask.getAttribute("id");

		setCurrentlyEditing(currentID);

		const itemIndex = tasks.findIndex((task) => task.id === currentID);
		let { title, urgent, important } = tasks[itemIndex];
		setTaskValues({
			id: currentID,
			title: title,
			urgent: urgent,
			important: important,
		});

		toggleModal();
	};

	return (
		<Fragment>
			<Header
				modalToggle={toggleModal}
				clearTasks={clearTasks}
				taskList={tasks}
			/>
			<main>
				<TaskGrid taskList={tasks} editingMode={editingMode} />
			</main>
			{modal &&
				createPortal(
					<Modal modalToggle={toggleModal}>
						<TaskForm
							currentlyEditing={currentlyEditing}
							setCurrentlyEditing={setCurrentlyEditing}
							setTasks={setTasks}
							setTaskValues={setTaskValues}
							tasks={tasks}
							taskNameError={taskNameHasError}
							taskNameErrorUpdater={setTaskNameHasError}
							taskValues={taskValues}
							setModal={setModal}
						/>
					</Modal>,
					document.getElementById("overlay")
				)}
		</Fragment>
	);
}

export default App;
