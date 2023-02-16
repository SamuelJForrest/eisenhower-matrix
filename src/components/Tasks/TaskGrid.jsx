import React from "react";
import styles from "./TaskGrid.module.css";

import TaskContainer from "./TaskContainer";

const TaskGrid = (props) => {
	const gridContainerInfo = [
		{
			id: 0,
			title: "Do",
			color: "green",
			urgent: true,
			important: true,
		},
		{
			id: 1,
			title: "Decide",
			color: "blue",
			urgent: false,
			important: true,
		},
		{
			id: 2,
			title: "Delegate",
			color: "orange",
			urgent: true,
			important: false,
		},
		{
			id: 3,
			title: "Delete",
			color: "red",
			urgent: false,
			important: false,
		},
	];

	const taskContainers = gridContainerInfo.map((container) => {
		return (
			<TaskContainer
				key={container.id}
				color={container.color}
				title={container.title}
				urgentFilter={container.urgent}
				importantFilter={container.important}
				list={props.taskList}
				editingMode={props.editingMode}
			/>
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
