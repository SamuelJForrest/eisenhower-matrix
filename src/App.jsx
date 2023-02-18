import { Fragment, useState, useRef } from "react";
import { createPortal } from "react-dom";
import uuid from "react-uuid";

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

	const taskNameInput = useRef(null);
	const urgentInput = useRef(null);
	const importantInput = useRef(null);

	const resetAllStates = () => {
		setModal(false);
		setCurrentlyEditing(false);
		setTaskValues({
			id: "",
			title: "",
			urgent: false,
			important: false,
		});
	};

	const toggleModal = () => {
		setModal((prevState) => {
			if (taskValues.title) {
				setTaskValues({
					id: "",
					title: "",
					urgent: false,
					important: false,
				});
			}
			return !prevState;
		});
	};

	const deleteTask = () => {
		const itemIndex = tasks.findIndex(
			(task) => task.id === currentlyEditing
		);
		tasks.splice(itemIndex, 1);
		resetAllStates();
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

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!taskNameInput.current.value) {
			setTaskNameHasError(true);
			return;
		}

		if (currentlyEditing) {
			const itemIndex = tasks.findIndex(
				(task) => task.id === currentlyEditing
			);
			tasks[itemIndex] = {
				id: currentlyEditing,
				title: taskNameInput.current.value,
				urgent: urgentInput.current.checked,
				important: importantInput.current.checked,
			};
		} else {
			setTasks((prevTasks) => {
				return [
					...prevTasks,
					{
						id: uuid(),
						title: taskNameInput.current.value,
						urgent: urgentInput.current.checked,
						important: importantInput.current.checked,
					},
				];
			});
		}

		resetAllStates();
	};

	return (
		<Fragment>
			<Header modalToggle={toggleModal} />
			<main>
				<TaskGrid taskList={tasks} editingMode={editingMode} />
			</main>
			{modal &&
				createPortal(
					<Modal modalToggle={toggleModal}>
						<TaskForm
							submitHandler={formSubmitHandler}
							taskValues={taskValues}
							setTaskValues={setTaskValues}
							nameRef={taskNameInput}
							urgentRef={urgentInput}
							importantRef={importantInput}
							taskNameError={taskNameHasError}
							taskNameErrorUpdater={setTaskNameHasError}
							currentlyEditing={currentlyEditing}
							deleteTask={deleteTask}
						/>
					</Modal>,
					document.getElementById("overlay")
				)}
		</Fragment>
	);
}

export default App;
