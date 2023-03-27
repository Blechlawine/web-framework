export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect {
	deps: Dep[] = [];
	fn: Function;

	constructor(fn: Function) {
		this.fn = fn;
	}

	run() {
		activeEffect = this;
		const stuff = this.fn();
		activeEffect = undefined;
		return stuff;
	}
}

export type Dep = Set<ReactiveEffect>;
