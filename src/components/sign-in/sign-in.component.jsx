import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart, signInErrorMsg }) => {
    const [ userCredentials, setCredentials ] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }


    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    id='email'
                    type='email' 
                    name='email'   /* event.target.name */
                    value={email}  /* event.target.value */
                    required 
                    handleChange={handleChange}
                    label='email'
                />
                <FormInput
                    id='password'
                    type='password' 
                    name='password' 
                    value={password} 
                    required 
                    handleChange={handleChange}
                    label='password'
                />
                {signInErrorMsg && <p className='error'>{signInErrorMsg}</p>}
                <div className='buttons'>
                    <CustomButton type='submit'> Sign In </CustomButton>
                    <CustomButton onClick={googleSignInStart} type='button' isGoogleSignIn >
                        Sign In With Google 
                    </CustomButton>
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = ({ user: { signInErrorMsg } }) => ({
    signInErrorMsg
});

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);