import styles from "./TaskContainer.module.css";

import TaskContainerTitle from "./TaskContainerTitle";

const TaskContainer = (props) => {
	const taskContainerClasses = `${styles["task-container"]} ${
		styles[props.color]
	}`;
	return (
		<div className={taskContainerClasses}>
			<TaskContainerTitle title={props.title} color={props.color} />
		</div>
	);
};

export default TaskContainer;
