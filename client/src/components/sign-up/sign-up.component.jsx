import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import './sign-up.styles.scss';

const SignUp = ({ signUpStart, signUpErrorMsg }) => {
    const [ userCredentials, setCredentials ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;
   

    const handleSubmit = async event => {
        event.preventDefault();
        // check password
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return; // exit
        }
        // dispatch action > Send to firebase for firebase to get user data (create new one if none)
        signUpStart({ displayName, email, password });
    }

    const handleChange = event =>{
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'   /* event.target.name */
                    value={displayName}  /* event.target.value */
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                {signUpErrorMsg && <p className='error'>{signUpErrorMsg}</p>}
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );
};

const mapStateToProps = ({ user: { signUpErrorMsg } }) => ({
    signUpErrorMsg
});

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);