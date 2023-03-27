import { ReactiveEffect } from "./effect";
import { h } from "./h";
import { DomNode, updateElement } from "./vdom";

class _App {
	constructor(mountElement: Element, appComponent: () => ReturnType<typeof h>) {
		this._appComponent = appComponent;
		this._mountElement = mountElement;
		this._reactiveEffectRender = new ReactiveEffect(() => {
			if (!(this._mountElement && this._appComponent))
				throw Error("App is not mounted");
			const oldVDom = this._vDom;
			this._vDom = this._appComponent();
			updateElement(this._mountElement!, this._vDom, oldVDom);
		});
	}
	_mountElement?: Element;
	_appComponent?: () => ReturnType<typeof h>;
	_vDom?: DomNode;
	_reactiveEffectRender?: ReactiveEffect;
	render() {
		this._reactiveEffectRender?.run();
	}
}

let app: _App;

export const createApp = (
	appComponent: () => ReturnType<typeof h>,
	mountPoint: string,
) => {
	const mountElement = document.querySelector(mountPoint);
	if (!mountElement) return;
	app = new _App(mountElement, appComponent);
	return app;
};
