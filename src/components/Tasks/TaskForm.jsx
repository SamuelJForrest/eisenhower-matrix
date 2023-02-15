import { Fragment } from "react";

import styles from "./TaskForm.module.css";
import Input from "../UI/Input";

const TaskForm = (props) => {
	return (
		<Fragment>
			<h2 className={styles["task-form-title"]}>New task</h2>
			<form
				className={styles["task-form"]}
				onSubmit={props.submitHandler}
			>
				<Input
					name="Task name"
					inputType="text"
					valueRef={props.nameRef}
				/>
				<Input
					name="Urgent"
					inputType="checkbox"
					valueRef={props.urgentRef}
				/>
				<Input
					name="Important"
					inputType="checkbox"
					valueRef={props.importantRef}
				/>
				<button className={styles["task-form-submit"]}>Submit</button>
			</form>
		</Fragment>
	);
};

export default TaskForm;
