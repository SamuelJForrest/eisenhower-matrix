import { Fragment, useState, useRef } from "react";
import { createPortal } from "react-dom";
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

	const formSubmitHandler = (e) => {
		e.preventDefault();

		tasks.push({
			// @TODO: Update id generating logic
			id: tasks.length + 1,
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
				<TaskGrid taskList={tasks} />
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
