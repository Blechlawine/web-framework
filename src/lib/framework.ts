import { h, createElement } from "./h";

export function createApp(appComponent: () => ReturnType<typeof h>) {
	return new App(appComponent);
}

class App {
	private appComponent: () => ReturnType<typeof h>;
	private mountPoint = "";
	constructor(appComponent: () => ReturnType<typeof h>) {
		this.appComponent = appComponent;
	}

	mount(mountPoint: string) {
		this.mountPoint = mountPoint;
		return this;
	}

	render() {
		if (!this.appComponent) throw Error("No app component provided");
		if (!this.mountPoint) throw Error("No mount point provided");
		const mountElement = document.querySelector(this.mountPoint);
		if (!mountElement) throw Error("Mount point not found");
		mountElement.replaceChildren(createElement(this.appComponent()));
	}
}
