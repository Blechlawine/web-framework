declare namespace JSX {
	interface IntrinsicElements {
		// rome-ignore lint/suspicious/noExplicitAny: What should these types be?
		[key: string]: any;
	}
	type Element = DomNode;
}

type TTag = string | ((props: TProps, children: TChildren) => DomNode);

type TProps = Record<string, string | (() => void) | number | boolean> | null;

type ReactiveEffect = {
	run: () => void;
	dependencies: Set<Set<ReactiveEffect>>;
};

type InternalSignal<T> = {
	value: T;
	subscribers: Set<ReactiveEffect>;
};

type Signal<T> = {
	__signal__: true;
	value: T;
};

type DomNode =
	| {
			tag: string;
			props: Record<
				string,
				| string
				| (() => void)
				| number
				| boolean
				| Signal<boolean | string | number | object>
			> | null;
			children: DomNode[];
	  }
	| string;
