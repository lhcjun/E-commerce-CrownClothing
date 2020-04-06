import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        id='email'
                        type='email' 
                        name='email'  // event.target.name
                        value={this.state.email}  // event.target.value
                        required 
                        handleChange={this.handleChange}
                        label='email'
                    />
                    <FormInput
                        id='password'
                        type='password' 
                        name='password' 
                        value={this.state.password} 
                        required 
                        handleChange={this.handleChange}
                        label='password'
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} type='button' isGoogleSignIn >
                            Sign In With Google 
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
};

export default SignIn;