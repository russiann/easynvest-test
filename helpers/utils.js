export const generateHash = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const render = (query, html) => {
  const el = document.querySelector(query);
  el.outerHTML = html;
  return el;
};