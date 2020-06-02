import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPage } from './checkout.component';

let wrapper;
beforeEach(() => {
    const mockProps = {
        cartItems: [],
        total: 20
    };

    wrapper = shallow(<CheckoutPage {...mockProps} />)
});

it('should render CheckoutPage component', () => {
    expect(wrapper).toMatchSnapshot();
});