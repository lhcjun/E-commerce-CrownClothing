import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('App component', () => {
  let wrapper;
  let mockCheckUserSession;

  beforeEach(() => {
    mockCheckUserSession = jest.fn();
    const mockProps = {
      currentUser: { id: 1 },
      checkUserSession: mockCheckUserSession
    };

    wrapper = shallow(<App {...mockProps} />);
  });

  it('should render App component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});