import { Fragment } from "react";

import styles from "./TaskForm.module.css";
import Input from "../UI/Input";

const TaskForm = () => {
	return (
		<Fragment>
			<h2 className={styles["task-form-title"]}>New task</h2>
			<form className={styles["task-form"]} action="">
				<Input name="Task name" inputType="text" />
				<Input name="Urgent" inputType="checkbox" />
				<Input name="Important" inputType="checkbox" />
				<button className={styles["task-form-submit"]}>Submit</button>
			</form>
		</Fragment>
	);
};

export default TaskForm;
