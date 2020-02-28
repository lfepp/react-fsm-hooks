import * as React from 'react';
import { mount } from 'enzyme';

import { mountHook } from 'tests/hooks';

import useFSM, { FiniteState } from '.';

const Init = () => <div>initial state</div>;
const First = () => <div>first transition</div>;
const Second = () => <div>second trnsition</div>;
const Final = () => <div>final transition -- dead end</div>;

enum TestUseFSMStates {
  Init,
  First,
  Second,
  Final,
}

describe('useFSM()', () => {
  let states: FiniteState[];
  let trigger: number;

  beforeEach(() => {
    states = [
      {
        name: TestUseFSMStates.Init,
        component: Init,
        transitions: [
          {
            trigger: () => trigger === 1,
            next: TestUseFSMStates.First,
          },
        ],
      },
      {
        name: TestUseFSMStates.First,
        component: First,
        transitions: [
          {
            trigger: () => trigger === 2,
            next: TestUseFSMStates.Second,
          },
          {
            trigger: () => trigger === 20,
            next: TestUseFSMStates.Second,
          },
        ],
      },
      {
        name: TestUseFSMStates.Second,
        component: Second,
        transitions: [
          {
            trigger: () => trigger === 1,
            next: TestUseFSMStates.First,
          },
          {
            trigger: () => trigger === 3,
            next: TestUseFSMStates.Final,
          },
        ],
      },
      {
        name: TestUseFSMStates.Final,
        component: Final,
        transitions: [],
      },
    ];
    trigger = 0;
  });

  it('should require correct args', () => {
    const missingArgsErr = 'missing arguments';
    const initialStateErr = 'invalid initialState argument';
    const statesErr = 'invalid states argument';
    const specificStateErr = 'invalid state in states argument';

    expect(() => mountHook(useFSM)).toThrowError(missingArgsErr);
    expect(() =>
      mountHook(() => useFSM({ initialState: '', states: [] })),
    ).toThrowError(initialStateErr);
    expect(() =>
      mountHook(() => useFSM({ initialState: 'valid arg', states: [] })),
    ).toThrowError(statesErr);
    expect(() =>
      mountHook(() => useFSM({ initialState: 0, states: [] })),
    ).toThrowError(statesErr);
    expect(() =>
      mountHook(() => useFSM({ initialState: -10, states: [] })),
    ).toThrowError(statesErr);
    expect(() =>
      mountHook(() => useFSM({ initialState: 742, states: [] })),
    ).toThrowError(statesErr);
    expect(() =>
      mountHook(() =>
        useFSM({
          initialState: 2,
          states: [
            {
              name: '',
              component: Init,
              transitions: [],
            },
          ],
        }),
      ),
    ).toThrowError(specificStateErr);
    expect(() =>
      mountHook(() =>
        useFSM({
          initialState: 2,
          states: [
            {
              name: 'init',
              component: Init,
              transitions: [],
            },
            {
              name: '',
              component: First,
              transitions: [],
            },
          ],
        }),
      ),
    ).toThrowError(specificStateErr);
  });

  it('should return the initial state component by default', () => {
    const { hooked, mounted } = mountHook(() =>
      useFSM({
        states,
        initialState: TestUseFSMStates.Init,
      }),
    );
    const Component = hooked.component;
    const wrapper = mount(<Component />);

    expect(hooked.currentState).toBe(TestUseFSMStates.Init);
    expect(wrapper.text()).toBe('initial state');
  });

  // it('should allow transition from init to first');

  // it('should not allow transition from init to second');

  // it('should not allow transition from init to final');

  // it('should allow transition from first to second');

  // it('should allow additional trigger from first to second');

  // it('should not allow transition from first to init');

  // it('should not allow transition from first to final');

  // it('should allow transition from second to final');

  // it('should allow transition from second to first');

  // it('should not allow transition from second to init');

  // it('should not allow transitions off final');
});
