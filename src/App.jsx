import { Fragment, useState } from "react";
import TaskGrid from "./components/Tasks/TaskGrid";
import Header from "./components/UI/Header";

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

	return (
		<Fragment>
			<Header />
			<main>
				<TaskGrid taskList={tasks} />
			</main>
		</Fragment>
	);
}

export default App;
