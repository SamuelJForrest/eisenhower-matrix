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
			// @TODO: Set up editing task functionality
			if (task.id === currentID) {
				console.log(task);
			}
		});

		toggleModal();
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();

		// @TODO: Add form validation logic (for text input)

		tasks.push({
			id: uuid(),
			title: taskNameInput.current.value,
			urgent: urgentInput.current.checked,
			important: importantInput.current.checked,
		});

		setModal(false);
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
							nameRef={taskNameInput}
							urgentRef={urgentInput}
							importantRef={importantInput}
						/>
					</Modal>,
					document.getElementById("overlay")
				)}
		</Fragment>
	);
}

export default App;
