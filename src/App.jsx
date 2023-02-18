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

	const toggleModal = () => {
		setModal((prevState) => {
			return !prevState;
		});
	};

	const editingMode = (e) => {
		const currentTask = e.target;
		const currentID = currentTask.getAttribute("id");

		tasks.forEach((task) => {
			if (task.id === currentID) {
				setCurrentlyEditing(currentID);
			}
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
			tasks.push({
				id: uuid(),
				title: taskNameInput.current.value,
				urgent: urgentInput.current.checked,
				important: importantInput.current.checked,
			});
		}

		setModal(false);
		setCurrentlyEditing(false);
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
						/>
					</Modal>,
					document.getElementById("overlay")
				)}
		</Fragment>
	);
}

export default App;
