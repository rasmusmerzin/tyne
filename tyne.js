const attachProps = (node, props) => {
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

const elem = (type, props, parent) => {
  const node = document.createElement(type);
  if (props) attachProps(node, props);
  if (parent) parent.appendChild(node);
  return node;
};

const text = (content, type = "label", parent) =>
  elem(type, { innerHTML: content }, parent);
const group = (children, type = "div", parent) =>
  elem(type, { children }, parent);
const root = (children) => {
  for (const child of children) document.body.appendChild(child);
};

const keepValue = (node, key, init, prop = "value") => {
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

const saveValue = (node, key, prop = "value") => {
  localStorage.setItem(key, JSON.stringify(node[prop]));
};

const toggleClass = (node, name) => {
  const classes = node.className.split(" ").filter((c) => c);
  const index = classes.indexOf(name);
  if (index !== -1) classes.splice(index, 1);
  else classes.push(name);
  node.className = classes.join(" ");
};

const toggleStyle = (node, propName, value1, value2 = "initial") => {
  node.style[propName] = node.style[propName] === value1 ? value2 : value1;
};

module.exports = {
  attachProps,

  elem,
  root,
  text,
  group,

  keepValue,
  saveValue,

  toggleClass,
  toggleStyle,
};
