import * as React from 'react';

// name for a finite state, can be a unique string or number value
type FiniteStateName = string | number;

interface Transition {
  // trigger for transition to occur
  trigger: (...args: any[]) => boolean;
  // next state to return
  next: FiniteStateName;
}

interface FiniteState {
  // unique name for state
  name: FiniteStateName;
  // component to return during state
  component: React.ReactNode;
  // transitions available at this state
  transitions?: Transition[];
}

const isValidName = (name: FiniteStateName): boolean => {
  // a state name is valid if it is a truthy string or
  // any number inclusive of 0.
  return !!name || name === 0;
};

interface FSMArgs {
  initialState: FiniteStateName;
  states: FiniteState[];
}

interface FSMResult {
  component: React.ReactNode;
  currentState: FiniteStateName;
}

const useFSM = (args: FSMArgs): FSMResult => {
  if (!args) {
    throw new Error('missing arguments');
  }
  const { initialState, states } = args;

  // initialState must be a valid string or number. The number can
  // be 0 so we cannot simply look for a falsy value here.
  if (!isValidName(initialState)) {
    throw new Error('invalid initialState argument');
  }
  if (!states || !states.length) {
    throw new Error('invalid states argument');
  }

  const [currentState, setCurrentState] = React.useState(initialState);

  for (const state of states) {
    const { name } = state;

    if (!isValidName(name)) {
      throw new Error('invalid state in states argument');
    }
  }

  return { currentState, component: states[currentState].component };
};

export { FiniteState };
export default useFSM;
