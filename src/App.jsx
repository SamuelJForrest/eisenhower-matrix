import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import TaskGrid from "./components/Tasks/TaskGrid";
import Header from "./components/UI/Header";
import Modal from "./components/UI/Modal";
import TaskForm from "./components/Tasks/TaskForm";

const DUMMY_DATA = [
	{
		id: 1,
		title: "Test task",
		urgent: true,
		important: true,
	},
	{
		id: 2,
		title: "Another task",
		urgent: false,
		important: true,
	},
	{
		id: 3,
		title: "A third task",
		urgent: false,
		important: false,
	},
	{
		id: 4,
		title: "A final task",
		urgent: true,
		important: false,
	},
];

function App() {
	const [tasks, setTasks] = useState([]);
	const [modal, setModal] = useState(false);

	const toggleModal = () => {
		setModal((prevState) => {
			return !prevState;
		});
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
						<TaskForm />
					</Modal>,
					document.getElementById("overlay")
				)}
		</Fragment>
	);
}

export default App;
