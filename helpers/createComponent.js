import { render as renderElement } from './utils';
import bindClickEvents from './bindClickEvents'

const createComponent = (setup) => {

  let localState;

  const setState = (reducer) => {
    localState = reducer(localState)
    renderElement(el, render(localState));
    bindClickEvents(el, events);
  };

  const { el, state, events = {}, render } = setup(setState);
  localState = state;

  renderElement(el, render(localState));
  bindClickEvents(el, events);
}

export default createComponent;
