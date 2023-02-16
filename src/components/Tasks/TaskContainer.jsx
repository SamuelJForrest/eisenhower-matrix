import styles from "./TaskContainer.module.css";

import TaskContainerTitle from "./TaskContainerTitle";
import TaskList from "./TaskList";

const TaskContainer = (props) => {
	const taskContainerClasses = `${styles["task-container"]} ${
		styles[props.color]
	}`;

	return (
		<div className={taskContainerClasses}>
			<TaskContainerTitle title={props.title} color={props.color} />
			<TaskList
				color={props.color}
				list={props.list}
				urgentFilter={props.urgentFilter}
				importantFilter={props.importantFilter}
				editingMode={props.editingMode}
			/>
		</div>
	);
};

export default TaskContainer;
