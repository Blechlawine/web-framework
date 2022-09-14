
class _App {
    constructor(mountElement: Element, appComponent: () => JSX.Element) {
        this._appComponent = appComponent;
        this._mountElement = mountElement;
    }
    _mountElement: Element | undefined = undefined;
    _appComponent: (() => JSX.Element | string) | undefined = undefined;
    render() {
        console.debug(this);
        if (!this._mountElement || !this._appComponent) throw Error("App is not mounted");
        this._mountElement!.replaceChildren(this._appComponent());
    }
}

let _app: _App;

export const createApp = (appComponent: () => JSX.Element, mountPoint: string) => {
    const mountElement = document.querySelector(mountPoint);
    if (!mountElement) return;
    _app = new _App(mountElement, appComponent);
    return _app;
};
