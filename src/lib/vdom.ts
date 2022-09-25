export function createElement(node: DomNode) {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    const el = document.createElement(node.tag);

    if (node.props) {
        Object.entries(node.props).forEach(([key, val]) => {
            console.log(`${key}: ${val}`);
            if (key == "className" && typeof val === "string") {
                el.classList.add(...val.trim().split(" "));
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

export class DomNode {
    tag;
    props;
    children;
    constructor(tag: string, props: TProps, children: DomNode[]) {
        this.children = children;
        this.props = props;
        this.tag = tag;
        console.log(this);
    }
}
