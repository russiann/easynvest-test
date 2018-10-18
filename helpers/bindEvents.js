const bindEvents = (query, handlers, triggers) => {
  triggers.forEach(({triggerName, event}) => {
    const parentElement = document.querySelector(query);
    const elements = parentElement.querySelectorAll(`[${triggerName}]`);
    elements.forEach(el => {
      Array
        .from(el.attributes)
        .filter(attr => attr.name === triggerName)
        .forEach(attr => {
          if (handlers[attr.value]) {
            el.addEventListener(event, (ev) => handlers[attr.value](ev, el));
          }
        })
    });
  });
}

export default bindEvents;
