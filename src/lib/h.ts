import { Signal, createEffect, isSignal } from "./signals";

type DomNode =
	| {
			tag: string;
			props: Record<string, string | (() => void) | number | boolean> | null;
			children: DomNode[];
	  }
	| string;

export const h = (
	tag: TTag,
	props: TProps,
	...children: DomNode[]
): DomNode => {
	if (typeof tag === "function") return tag({ ...props }, children);

	return {
		tag,
		props: props || null,
		children: children || [],
	};
};

export function createElement(
	node: DomNode | string | Signal<string | number>,
) {
	if (typeof node === "string") {
		return document.createTextNode(node);
	}
	if (isSignal(node)) {
		const textEl = document.createTextNode(String(node.value));
		createEffect(() => {
			textEl.textContent = String(node.value);
		});
		return textEl;
	}
	const el = document.createElement(node.tag);
	if (node.props) {
		Object.entries(node.props).forEach(([key, val]) => {
			// console.log(`${key}: ${val}`);
			if ((key === "class" || key === "className") && typeof val === "string") {
				el.classList.add(...val.trim().split(" "));
			} else if (/^on\w+/.test(key) && typeof val === "function") {
				el.addEventListener(key.toLowerCase().substring(2), val, false);
			} else if (typeof val === "string" || typeof val === "number") {
				el.setAttribute(key, String(val));
			} else if (typeof val === "boolean") {
				el.setAttribute(key, "");
			}
		});
	}
	node.children.map(createElement).forEach(el.appendChild.bind(el));

	return el;
}

export const Fragment = () => null;
