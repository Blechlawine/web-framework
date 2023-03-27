import { h } from "../lib/h";
import { ref } from "../lib/reactivity";
import Test from "./Test";

const App = () => {
	const data = ref("Hello");

	const changeData = () => {
		data.value = "not hello";
	};

	return (
		<div className="Hellothere">
			{data.value} there
			<button onClick={changeData}>Change data</button>
			<Test />
		</div>
	);
};
export default App;
