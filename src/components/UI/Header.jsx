import "./Header.module.css";

const Header = (props) => {
	return (
		<header>
			<h1>
				The Eisenhower <br /> Matrix
			</h1>
			<button onClick={props.modalToggle}>+</button>
		</header>
	);
};

export default Header;
