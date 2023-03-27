import { h } from "../lib/h";
import { computed, createSignal } from "../lib/signals";

export function Counter() {
	const count = createSignal(0);
	const double = computed(() => count.value * 2);

	return (
		<div>
			{count}
			<button onClick={() => count.value++}>Increment</button>
			{double}
		</div>
	);
}
