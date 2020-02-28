import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

interface Result {
  hooked: Record<string, any>;
  mounted: Nullable<
    ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
  >;
}

const mountHook = (hook: (...args: any) => any, ...hookArgs: any): Result => {
  const Component = ({ children }: { children: React.FunctionComponent }) =>
    children(hook(...hookArgs));
  let hooked: Record<string, any> = {};
  let mounted: Nullable<ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >> = null;

  act(() => {
    mounted = shallow(
      <Component>
        {hookValues => {
          Object.assign(hooked, hookValues);
          return null;
        }}
      </Component>,
    );
  });

  return { hooked, mounted };
};

export { mountHook };
