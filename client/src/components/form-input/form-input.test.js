import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './form-input.component';

describe('FormInput component', () => {
    let wrapper;
    let mockHandleChange;

    beforeEach(() => {
        mockHandleChange = jest.fn();

        const mockProps = {
            label: 'email',
            value: 'test@gmail.com',
            handleChange: mockHandleChange
        };

        wrapper = shallow(<FormInput {...mockProps} />);
    });

    it('should render FormInput component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call handleChange method when input changes', () => {
        wrapper.find('.form-input').simulate('change');
        expect(mockHandleChange).toHaveBeenCalled();
    });

    it('should render label tag if label prop is not empty', () => {
        expect(wrapper.exists('.form-input-label')).toBe(true);
    });

    it('should not render label tag if there is no label', () => {
        const newMockProps = {
            label: '',
            value: 'test@gmail.com',
            handleChange: mockHandleChange
        };
        const newWrapper = shallow(<FormInput {...newMockProps} />);
        expect(newWrapper.exists('.form-input-label')).toBe(false);
    });
});