import { render as renderElement } from './utils';
import bindEvents from './bindEvents'

const triggers = [
  { triggerName: 'bindclick',  event: 'click' },
  { triggerName: 'bindinput',  event: 'input' },
  { triggerName: 'bindchange', event: 'change' },
];

const createComponent = (setup) => {

  let localState;

  const setState = (reducer) => {
    localState = reducer(localState)
    renderElement(el, render(localState));
    bindEvents(el, events, triggers);
  };

  const { el, state, events = {}, render } = setup(setState);
  localState = state;

  renderElement(el, render(localState));
  bindEvents(el, events, triggers);
}

export default createComponent;
