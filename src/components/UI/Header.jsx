import styles from "./Header.module.css";

const Header = (props) => {
	return (
		<header>
			<h1>
				The Eisenhower <br /> Matrix
			</h1>
			<div className={styles["header-buttons"]}>
				{props.taskList.length > 0 && (
					<button
						className={styles["header-clear-tasks"]}
						onClick={props.clearTasks}
					>
						Clear all tasks
					</button>
				)}
				<button
					className={styles["header-add-task"]}
					onClick={props.modalToggle}
				>
					Add task +
				</button>
			</div>
		</header>
	);
};

export default Header;
