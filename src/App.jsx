import { Fragment } from "react";
import TaskGrid from "./components/Tasks/TaskGrid";
import Header from "./components/UI/Header";

function App() {
	return (
		<Fragment>
			<Header />
			<main>
				<TaskGrid />
			</main>
		</Fragment>
	);
}

export default App;
