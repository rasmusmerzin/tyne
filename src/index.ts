export type Props = {
  [propName: string]: any;
};

export const attachProps = (node: HTMLElement, props: Props) => {
  for (const key in props) {
    const val = props[key];
    if (
      val &&
      key === "children" &&
      typeof val === "object" &&
      val.length !== undefined
    ) {
      for (const child of val) node.appendChild(child);
    } else if (val && typeof val === "object" && val.length === undefined) {
      attachProps(node[key], val);
    } else node[key] = val;
  }
};

export const elem = (type: string, props?: Props, parent?: HTMLElement) => {
  const node = document.createElement(type);
  if (props) attachProps(node, props);
  if (parent) parent.appendChild(node);
  return node;
};

export const text = (content: string, type = "label", parent?: HTMLElement) =>
  elem(type, { innerHTML: content }, parent);

export const group = (
  children: HTMLElement[],
  type = "div",
  parent?: HTMLElement
) => elem(type, { children }, parent);

export const select = (options: string[], props?: Props, parent?: HTMLElement) =>
  elem("select", {
    ...props,
    children: options.map((method) =>
      elem("option", {
        value: method,
        innerHTML: method,
      })
    ),
  });

export const root = (children: HTMLElement[]) => {
  for (const child of children) document.body.appendChild(child);
};

export const keepValue = (
  node: HTMLElement,
  key: string,
  init?: any,
  prop = "value"
) => {
  const initVal = localStorage.getItem(key);
  if (initVal != undefined) {
    node[prop] = JSON.parse(initVal);
  } else if (init != undefined) {
    node[prop] = init;
  }
  node.addEventListener("input", () =>
    localStorage.setItem(key, JSON.stringify(node[prop]))
  );
};

export const saveValue = (node: HTMLElement, key: string, prop = "value") => {
  localStorage.setItem(key, JSON.stringify(node[prop]));
};

export const toggleClass = (node: HTMLElement, name: string) => {
  const classes = node.className.split(" ").filter((c) => c);
  const index = classes.indexOf(name);
  if (index !== -1) classes.splice(index, 1);
  else classes.push(name);
  node.className = classes.join(" ");
};

export const toggleStyle = (
  node: HTMLElement,
  propName: string,
  value1: string | number,
  value2: string | number = "initial"
) => {
  node.style[propName] = node.style[propName] === value1 ? value2 : value1;
};
