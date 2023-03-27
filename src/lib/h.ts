import { DomNode } from "./vdom";

export const h = (
	tag: TTag,
	props: TProps,
	...children: DomNode["children"]
): DomNode => {
	if (typeof tag === "function") return tag({ ...props }, children);

	return new DomNode(tag, props, children);
};

export const Fragment = () => null;
