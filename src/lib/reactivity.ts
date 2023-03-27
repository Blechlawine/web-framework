import { Dep, ReactiveEffect, activeEffect } from "./effect";

class _Ref<T> {
	private _value: T;

	public dep?: Dep;

	public readonly __isRef = true;
	constructor(value: T) {
		this._value = value;
	}

	get value() {
		if (!this.dep) this.dep = new Set<ReactiveEffect>();
		if (activeEffect) this.dep.add(activeEffect);
		console.log("get value", this.dep, this._value);
		return this._value; // TODO: this returns the old result, if value just got changed
	}

	set value(newValue: T) {
		if (hasChanged(newValue, this._value)) {
			this._value = newValue;
			console.log("set value", newValue, this._value);
			this.dep?.forEach((effect) => {
				effect.run();
			});
		}
	}
}

export function ref<T>(value?: T) {
	return new _Ref(value);
}

const hasChanged = <T>(value: T, oldValue: T) => !Object.is(value, oldValue);
