import * as React from 'react';
import { mount } from 'enzyme';

import Loading from '.';

// TODO: add tests for a component with a loading state
describe('<Loading />', () => {
  it('should render', () => {
    const wrapper = mount(<Loading />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  // it('should render loading state initially');

  // it('should render loading state when isLoading');

  // it('should render prompt state when prompt required');

  // it('should render loading state when isLoading again');

  // it('should render final state when done');
});
