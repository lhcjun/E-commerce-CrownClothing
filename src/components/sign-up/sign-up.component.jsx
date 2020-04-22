import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            passwordError: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        // check password
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return; // exit
        }
        try{
            // create new user
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            // Send to firebase for firebase to get user data
            await createUserProfileDocument(user, {displayName});
            // if success > clear our form
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
                passwordError: ''
            })
        }catch(err){
            // fail > err
            const errCode = err.code;
            if(errCode === 'auth/weak-password'){
                this.setState({passwordError: 'Password too short'})
            }else if(errCode === 'auth/email-already-in-use'){
                this.setState({passwordError: 'Email already in use'})
            }else if(errCode === 'auth/invalid-email'){
                this.setState({passwordError: 'The email address is badly formatted'})
            }else if(errCode === 'auth/operation-not-allowed'){
                this.setState({passwordError: 'Email / password accounts are not enabled'})
            }
            console.log(err);
        }
    }

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    render(){
        const { displayName, email, password, confirmPassword, passwordError } = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'   /* event.target.name */
                        value={displayName}  /* event.target.value */
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    {passwordError && <p className='error'>{this.state.passwordError}</p>}
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;