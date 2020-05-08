import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        const { emailSignInStart } = this.props;
            
        emailSignInStart(email, password);
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render(){
        const { email, password } = this.state;
        const { googleSignInStart, errorMessage } = this.props;
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
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In </CustomButton>
                        <CustomButton onClick={googleSignInStart} type='button' isGoogleSignIn >
                            Sign In With Google 
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
};

const mapStateToProps = ({ user: { errorMessage } }) => ({
    errorMessage
});

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);