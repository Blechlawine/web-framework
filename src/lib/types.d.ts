declare namespace JSX {
	interface IntrinsicElements {
		div: any;
		button: any;
	}
	interface Element extends Node {}
}

type TTag = string | ((props: TProps, children: TChildren) => DomNode);

type TProps = Record<string, string | (() => any) | number | boolean> | null;
