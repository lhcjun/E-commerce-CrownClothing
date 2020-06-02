import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from './sign-in.component';

describe('SignIn component', () => {
    let wrapper;
    let mockGoogleSignInStart;
    let mockEmailSignInStart;

    beforeEach(() => {
        mockGoogleSignInStart = jest.fn();
        mockEmailSignInStart = jest.fn();

        const mockProps = {
            signInErrorMsg: 'error',
            googleSignInStart: mockGoogleSignInStart,
            emailSignInStart: mockEmailSignInStart
        }

        wrapper = shallow(<SignIn {...mockProps} />)
    });

    it('should render SignIn component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});