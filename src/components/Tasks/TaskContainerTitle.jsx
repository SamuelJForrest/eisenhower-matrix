import styles from "./TaskContainerTitle.module.css";

const TaskContainerTitle = (props) => {
	const titleWrapClasses = `${styles["task-container-titlewrap"]} ${
		styles[props.color]
	}`;

	return (
		<div className={titleWrapClasses}>
			<h2 className={styles["task-container-title"]}>{props.title}</h2>
		</div>
	);
};

export default TaskContainerTitle;
