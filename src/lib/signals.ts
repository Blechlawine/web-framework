type ReactiveEffect = {
	run: () => void;
	dependencies: Set<Set<ReactiveEffect>>;
};

type InternalSignal<T> = {
	value: T;
	subscribers: Set<ReactiveEffect>;
};

export type Signal<T> = {
	__signal__: true,
	value: T;
};

// Here we store all effects which are currently running.
const context: ReactiveEffect[] = [];

function subscribe(effect: ReactiveEffect, subscribers: Set<ReactiveEffect>) {
	subscribers.add(effect);
	effect.dependencies.add(subscribers);
}

export function createSignal<T>(value: T) {
	const internal: InternalSignal<T> = {
		value,
		subscribers: new Set(),
	};

	const signal: Signal<T> = {
		__signal__: true,
		get value() {
			const running = context[context.length - 1]; // get the last ran effect
			if (running) {
				// if there is a currently running effect
				// subscribe to it / add it to this signals subscribers
				subscribe(running, internal.subscribers);
			}
			return internal.value;
		},
		set value(newValue: T) {
			internal.value = newValue;

			// run all subscribers, but clone the list, so new subscribers don't affect this run
			[...internal.subscribers].forEach((effect) => {
				effect.run();
			});
		},
	};

	return signal;
}

function cleanup(effect: ReactiveEffect) {
	// Here we delete the effect from all its dependencies' subscribers, before running it. This is important because running an effect adds it to the subscribers of all its dependencies.
	effect.dependencies.forEach((dep) => {
		dep.delete(effect);
	});
	effect.dependencies.clear();
}

export function createEffect(fn: () => void) {
	const run = () => {
		cleanup(running);
		// set the active effect to this effect / push this effect to the context
		context.push(running);
		try {
			// run the effect function
			fn();
		} finally {
			// remove this effect from the context
			context.pop();
		}
	};

	const running: ReactiveEffect = {
		run,
		dependencies: new Set(),
	};

	run();
}

export function computed<T>(fn: () => T) {
	const internalSignal = createSignal(fn());
	createEffect(() => {
		internalSignal.value = fn();
	});
	return internalSignal;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export  function isSignal<T>(obj: any): obj is Signal<T> {
	return obj?.__signal__;
}