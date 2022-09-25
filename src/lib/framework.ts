import { h } from "./h";
import { DomNode, updateElement } from "./vdom";

class _App {
    constructor(mountElement: Element, appComponent: () => ReturnType<typeof h>) {
        this._appComponent = appComponent;
        this._mountElement = mountElement;
    }
    _mountElement?: Element;
    _appComponent?: () => ReturnType<typeof h>;
    _vDom?: DomNode;
    render() {
        if (!this._mountElement || !this._appComponent) throw Error("App is not mounted");
        
        const oldVDom = this._vDom;
        this._vDom = this._appComponent();
        updateElement(this._mountElement!, this._vDom, oldVDom);
    }
}

let _app: _App;

export const createApp = (appComponent: () => ReturnType<typeof h>, mountPoint: string) => {
    const mountElement = document.querySelector(mountPoint);
    if (!mountElement) return;
    _app = new _App(mountElement, appComponent);
    return _app;
};
