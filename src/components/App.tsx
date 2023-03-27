import { h } from "../lib/h";
import { createSignal } from "../lib/signals";
import Test from "./Test";

const App = () => {
	const data = createSignal("Hello");

	const changeData = () => {
		data.value = "not hello";
	};

	return (
		<div class="Hellothere">
			{data} there
			<button onClick={changeData}>Change data</button>
			<Test />
		</div>
	);
};
export default App;
