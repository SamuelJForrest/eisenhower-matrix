import { Fragment } from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
	return (
		<Fragment>
			<div className={styles.overlay} onClick={props.modalToggle}></div>
			<div className={styles.modal}>{props.children}</div>
		</Fragment>
	);
};

export default Modal;
