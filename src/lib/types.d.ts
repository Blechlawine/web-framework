declare namespace JSX {
	interface IntrinsicElements {
		div: any;
		button: any;
		[key: string]: any;
	}
	interface Element extends Node {}
}

type TTag = string | ((props: TProps, children: TChildren) => DomNode);

type TProps = Record<string, string | (() => void) | number | boolean> | null;
