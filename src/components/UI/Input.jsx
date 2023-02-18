import { Fragment } from "react";

import styles from "./Input.module.css";

const Input = (props) => {
	return (
		<Fragment>
			<label className={styles["form-label"]} htmlFor={props.name}>
				{props.name}
			</label>
			<input
				onChange={props.errorMessageHandler}
				ref={props.valueRef}
				className={styles["form-input"]}
				type={props.inputType}
				name={props.name}
				id={props.name}
				value={props.value}
				checked={props.isChecked}
			/>
		</Fragment>
	);
};

export default Input;
