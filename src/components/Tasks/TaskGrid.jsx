import React from "react";
import styles from "./TaskGrid.module.css";

import TaskContainer from "./TaskContainer";

const TaskGrid = (props) => {
	const gridContainerInfo = [
		{ title: "Do", color: "green" },
		{ title: "Decide", color: "blue" },
		{ title: "Delegate", color: "orange" },
		{ title: "Delete", color: "red" },
	];

	const taskContainers = gridContainerInfo.map((container) => {
		return (
			<TaskContainer color={container.color} title={container.title} />
		);
	});

	return (
		<div className={styles["task-grid"]}>
			<h2 className={styles["urgent"]}>Urgent</h2>
			<h2 className={styles["not-urgent"]}>Not urgent</h2>
			<h2 className={styles["important"]}>Important</h2>
			<h2 className={styles["not-important"]}>Not important</h2>

			{taskContainers}
		</div>
	);
};

export default TaskGrid;
