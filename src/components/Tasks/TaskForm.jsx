import { Fragment, useRef } from "react";
import uuid from "react-uuid";

import styles from "./TaskForm.module.css";
import Input from "../UI/Input";

const TaskForm = (props) => {
	const taskNameInput = useRef(null);
	const urgentInput = useRef(null);
	const importantInput = useRef(null);

	const {
		currentlyEditing,
		setCurrentlyEditing,
		setTasks,
		setTaskValues,
		setModal,
		taskNameError,
		taskNameErrorUpdater,
		taskValues,
		updateForm,
		tasks,
	} = props;

	const resetAllStates = () => {
		setModal(false);
		setCurrentlyEditing(false);
		setTaskValues({
			id: "",
			title: "",
			urgent: false,
			important: false,
		});
	};

	const deleteTask = () => {
		const itemIndex = tasks.findIndex(
			(task) => task.id === currentlyEditing
		);
		tasks.splice(itemIndex, 1);
		resetAllStates();
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!taskNameInput.current.value.trim()) {
			taskNameErrorUpdater(true);
			return;
		}

		if (currentlyEditing) {
			const itemIndex = tasks.findIndex(
				(task) => task.id === currentlyEditing
			);
			tasks[itemIndex] = {
				id: currentlyEditing,
				title: taskNameInput.current.value,
				urgent: urgentInput.current.checked,
				important: importantInput.current.checked,
			};
		} else {
			setTasks((prevTasks) => {
				return [
					...prevTasks,
					{
						id: uuid(),
						title: taskNameInput.current.value,
						urgent: urgentInput.current.checked,
						important: importantInput.current.checked,
					},
				];
			});
		}

		resetAllStates();
	};

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
			<form className={styles["task-form"]} onSubmit={formSubmitHandler}>
				<Input
					label="Name"
					name="taskName"
					inputType="text"
					valueRef={taskNameInput}
					errorMessageHandler={updateFormState}
					value={taskValues.title}
					updateForm={updateForm}
				/>
				{taskNameError && (
					<p className={styles["task-form-error"]}>
						Task name cannot be empty.
					</p>
				)}
				<Input
					label="Urgent"
					name="Urgent"
					inputType="checkbox"
					valueRef={urgentInput}
					isChecked={taskValues.urgent}
					errorMessageHandler={updateFormState}
					updateForm={updateForm}
				/>
				<Input
					label="Important"
					name="Important"
					inputType="checkbox"
					valueRef={importantInput}
					isChecked={taskValues.important}
					errorMessageHandler={updateFormState}
					updateForm={updateForm}
				/>
				<div className={styles["task-form-buttons"]}>
					<button className={styles["task-form-submit"]}>
						{currentlyEditing ? "Update" : "Submit"}
					</button>
					{currentlyEditing && (
						<button
							type="button"
							className={styles["task-form-delete"]}
							onClick={deleteTask}
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
