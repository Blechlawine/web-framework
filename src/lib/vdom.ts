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
    }
}

export function updateElement(parent: ChildNode, newNode: DomNode, oldNode?: DomNode, index = 0) {
    console.log(newNode, oldNode);
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        parent.removeChild(parent.childNodes[index]);
    } else if (diff(oldNode, newNode)) {
        parent.replaceChild(createElement(newNode), parent.childNodes[index]);
    } else if (newNode.tag) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

function diff(oldNode: DomNode, newNode: DomNode) {
    return (
        typeof oldNode !== typeof newNode ||
        (typeof oldNode === "string" && oldNode !== newNode) ||
        oldNode.tag !== newNode.tag
    );
}
