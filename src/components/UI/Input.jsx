import { Fragment } from "react";

import styles from "./Input.module.css";

const Input = (props) => {
	return (
		<Fragment>
			<label className={styles["form-label"]} htmlFor={props.name}>
				{props.name}
			</label>
			<input
				ref={props.valueRef}
				className={styles["form-input"]}
				type={props.inputType}
				name={props.name}
				id={props.name}
			/>
		</Fragment>
	);
};

export default Input;
