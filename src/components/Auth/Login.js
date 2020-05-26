import React, { Component } from "react";
import { validate } from '../../utils/helpers/formValidation';
import { history } from "../../history"
import { connect } from "react-redux";
import { loginHandler } from "../../redux/actions/auth"
import { Alert, Spinner } from 'reactstrap'

function validateAuth(errors) {
    let valid = true;
    Object.values(errors).forEach(error => error && error.length && (valid=false))
    return valid;
}

class Login extends Component {

    state = {
        accountId: "",
        password: "",
        remember: false,
        errors:{},
        visible:false,
        loggingIn:false
    }

    componentWillReceiveProps(props) {
        const { user } = props;
        console.log(props);
        if(user.errors && user.errors.length) {
            this.setState({visible:true})
            this.setState({loggingIn: false})
        }
        if(user.errors && user.errors.status == 403) {
            this.setState({visible:true})
            this.setState({loggingIn: false})
        }
        this.setState({loggingIn: false})
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
        let checkValidation = validate(name, value);
       
        Object.keys(checkValidation).forEach(key => {
            errors[key] = checkValidation[key];
        })
        this.setState({errors,[name]:value})
    }

    handleLogin = e => {
        e.preventDefault();
        this.setState({loggingIn:true})
        const {accountId, password} = this.state;
        if(accountId && password) {
          //Check for Validating before Login
          if(validateAuth(this.state.errors)) {
              this.props.loginHandler({accountId:this.state.accountId, password:this.state.password})
          }
        }
      }

    render() {
        const { accountId, password, errors } = this.state
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleLogin}>
                        <h3>Log In</h3>

                        {
                            this.state.visible ?
                            (
                            <div className="m-2">
                                <Alert
                                color="danger"
                                isOpen={this.state.visible}
                                toggle={() => this.setState({visible:false})}
                                >
                                Login failed! Invalid Crendentials
                                </Alert>
                            </div>
                            )
                            : 
                            null
                      }
                        <div className="form-group">
                            <label>Account Id</label>
                            <input 
                                type="text" 
                                name="accountId"
                                className="form-control"  
                                onChange={this.handleChange} 
                                value={this.state.accountId}
                                placeholder="Enter Account Id" />
                                { 
                                    errors.accountId && errors.accountId.length > 0 && <span className="text-danger">{errors.accountId}</span>
                                }
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password"
                                className="form-control" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                placeholder="Enter password" />
                                { 
                                    errors.password &&   errors.password.length > 0 && <span className="text-danger">{errors.password}</span>
                                }
                        </div>

                        {/* <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" name="remember" value={this.state.remember} />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}

                        {
                            this.state.loggingIn ?
                                <div className="w-100 text-center">
                                    <Spinner 
                                        color="success"
                                    />
                                </div>
                            :
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-block"
                                    disabled={(errors.accountId && errors.accountId.length || errors.password && errors.password.length) || (!accountId || !password) ? true : false}
                                >
                                    Submit
                                </button>
                        }
                       
                        <p className="forgot-password text-right">
                            Not having an account ? <a href="#"
                            onClick={() => {
                                history.push('/register')
                            }}>Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user:state.auth.login
    }
}

export default connect(mapStateToProps, { loginHandler })(Login)