type TTag = string | ((props: TProps, children: TChildren) => JSX.Element);

type TProps = Record<string, string | (() => any)> | null;

type TChildren = (JSX.Element | string)[];

export const h = (tag: TTag, props: TProps, ...children: TChildren) => {
    if (typeof tag === "function") return tag({ ...props }, children);

    const el = document.createElement(tag);
    if (props) {
        Object.entries(props).forEach(([key, val]) => {
            if (key === "className") {
                el.classList.add(...((val as string) || "".trim().split(" ")));
                return;
            } else if (/^on\w+/.test(key) && typeof val === "function") {
                el.addEventListener(key.toLowerCase(), val, false);
                return;
            } else if (typeof val === "string") {
                el.setAttribute(key, val);
            }
        });
    }
    children.forEach((child) => {
        el.append(child);
    });
    return el;
};

export const Fragment = () => null;
