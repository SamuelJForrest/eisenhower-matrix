import { Fragment } from "react";

import styles from "./TaskForm.module.css";
import Input from "../UI/Input";

const TaskForm = (props) => {
	const {
		currentlyEditing,
		importantRef,
		nameRef,
		setTaskValues,
		submitHandler,
		taskNameError,
		taskValues,
		updateForm,
		urgentRef,
	} = props;

	const updateFormState = (event) => {
		if (event.target.value) {
			props.taskNameErrorUpdater(false);
		}

		switch (event.target.id) {
			case "taskName":
				setTaskValues((prev) => {
					return {
						...prev,
						title: event.target.value,
					};
				});
				break;
			case "Urgent":
				setTaskValues((prev) => {
					return {
						...prev,
						urgent: event.target.checked,
					};
				});
				break;
			case "Important":
				setTaskValues((prev) => {
					return {
						...prev,
						important: event.target.checked,
					};
				});
		}
	};

	return (
		<Fragment>
			<h2 className={styles["task-form-title"]}>New task</h2>
			<form className={styles["task-form"]} onSubmit={submitHandler}>
				<Input
					name="taskName"
					inputType="text"
					valueRef={nameRef}
					errorMessageHandler={updateFormState}
					value={taskValues.title}
					updateForm={updateForm}
				/>
				{taskNameError && (
					<p className={styles["task-form-error"]}>
						Fill out this field, doofus.
					</p>
				)}
				<Input
					name="Urgent"
					inputType="checkbox"
					valueRef={urgentRef}
					isChecked={taskValues.urgent}
					errorMessageHandler={updateFormState}
					updateForm={updateForm}
				/>
				<Input
					name="Important"
					inputType="checkbox"
					valueRef={importantRef}
					isChecked={taskValues.important}
					errorMessageHandler={updateFormState}
					updateForm={updateForm}
				/>
				<div className={styles["task-form-buttons"]}>
					<button className={styles["task-form-submit"]}>
						Submit
					</button>
					{currentlyEditing && (
						<button
							type="button"
							className={styles["task-form-delete"]}
							onClick={props.deleteTask}
						>
							Delete
						</button>
					)}
				</div>
			</form>
		</Fragment>
	);
};

export default TaskForm;
