import styles from "./TaskList.module.css";

const TaskList = (props) => {
	const taskListClasses = `${styles["task-list"]} ${styles[props.color]}`;

	const filteredTaskLists = props.list.filter((task) => {
		return (
			task.urgent === props.urgentFilter &&
			task.important === props.importantFilter
		);
	});

	const listOfTasks = filteredTaskLists.map((task) => {
		return <button key={task.id}>{task.title}</button>;
	});

	return <div className={taskListClasses}>{listOfTasks}</div>;
};

export default TaskList;
