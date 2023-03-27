import { h } from "../lib/h";
import { computed, createSignal } from "../lib/signals";
import { Counter } from "./Counter";
import Test from "./Test";

const App = () => {
	const data = createSignal("Hello");

	const changeData = () => {
		data.value = "not hello";
	};

	const data2 = computed(() => {
		return `${data.value} ${data.value}`;
	});

	const classes = computed(() => ({
		dataIsHello: data.value === "Hello",
	}));

	return (
		<div class={classes} data-test={data2}>
			{data} there
			{data2}
			<button onClick={changeData}>Change data</button>
			<Test />
			<Counter />
		</div>
	);
};
export default App;
