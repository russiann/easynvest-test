export const generateHash = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const render = (query, html) => {
  const el = document.querySelector(query);
  el.innerHTML = html;
  return el;
};

export const getParameterByName = (name) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
