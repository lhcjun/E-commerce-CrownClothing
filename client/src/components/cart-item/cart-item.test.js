import React from 'react';
import { shallow } from 'enzyme';
import CartItem from './cart-item.component';

it('should render CartItem component', () => {
    const mockItems = {
        imageUrl: 'www.testImg.com', 
        price: 100, 
        name: 'hats', 
        quantity: 1
    };

    expect(shallow(<CartItem item={mockItems} />)).toMatchSnapshot();
});