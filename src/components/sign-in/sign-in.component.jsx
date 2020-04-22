import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordError: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try{
            // check email & password
            await auth.signInWithEmailAndPassword(email, password);
            // if success > clear our form
            this.setState({ email: '', password: '', passwordError: '' })
        }catch(err){
            const errCode = err.code;
            if(errCode === 'auth/wrong-password'){
                this.setState({passwordError: 'Invalid email or password'})
            }else if(errCode === 'auth/user-not-found'){
                this.setState({passwordError: 'Invalid email or password'})
            }
            console.log(err)
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render(){
        const { email, password, passwordError } = this.state;
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        id='email'
                        type='email' 
                        name='email'   /* event.target.name */
                        value={email}  /* event.target.value */
                        required 
                        handleChange={this.handleChange}
                        label='email'
                    />
                    <FormInput
                        id='password'
                        type='password' 
                        name='password' 
                        value={password} 
                        required 
                        handleChange={this.handleChange}
                        label='password'
                    />
                    {passwordError && <p className='error'>{passwordError}</p>}
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